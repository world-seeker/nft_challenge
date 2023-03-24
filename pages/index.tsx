import type { NextPage } from 'next'
import Layout from '../component/template/Layout'
import Link from 'next/link'
import {sanityClient,  urlFor} from '../sanity'
import { GetServerSideProps } from "next";
import { Collection } from '../typing';
import collection from '../sanity/schemas/collection';

interface Props {
  collections:Collection[];
}


const Home = ({collections}:Props) => {
  return (
    <div className='max-w-7xl mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px0'>
    <Layout>
      <h1
         className='mb-10 text-4xl font-extralight'> 
        The{' '}
        <span className='  font-extrabold
        decoration-pink-600/50 underline'>
         ****** 
        </span>{' '}
        NFT Market Place
        </h1>
     <main className='mt-5 bg-slate-100 p-10 shadow-xl shadow-rose-400'>
      <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4' >
        {collections.map((collection)=>(
          <Link href={`/nft/${collection.slug.current}`}>
          <div className='flex flex-col  items-center
          transition-all duration-200 hover:scale-105 cursor-pointer'>
            <img 
            className='h-96 w-60 rounded-2xl object-cover'
            src={urlFor(collection.mainImage).url()}
             alt=''/>
              <div className="p-5">
                <h2 className='text-3xl'>{collection.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{collection.description}</p>
              </div>
            </div>
     
          </Link>
        ))}
      </div>
     </main>
 
    </Layout>
    </div>
  )
}

export default Home


export const getServerSideProps:GetServerSideProps = async ()=> {
  const query =`*[_type == 'collection']{
    _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage{
      asset
      },
    slug{
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug{
        current
      },
    },
  }`
  const collections = await sanityClient.fetch(query)


  return{
    props:{
      collections
    }
  }
 
  }