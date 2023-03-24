import React from 'react'
import Layout from '../../component/template/Layout'
import { useAddress,useDisconnect,useMetamask } from '@thirdweb-dev/react'
import { GetServerSideProps, } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typing';
import collection from '../../sanity/schemas/collection';
import Link from 'next/link';

interface Props{
  collection:Collection
}



function NFTDropPage({collection}:Props) {
      
     //Auth
     const connectWithMetamask = useMetamask();
     const address = useAddress();
     const disconnect = useDisconnect();
     //--
  

  return (
    <Layout>
    <div className='flex min-h-screen flex-col lg:grid
     lg:grid-cols-10'>

     {/** Left  */}
     <div className='bg-gradient-to-br
      from-cyan-800 to-rose-500 lg:col-span-4'>
         <div className="flex flex-col items-center
          justify-center py-2 lg:min-h-screen">
          <div className='bg-gradient-to-br
          from-yellow-400 to-purple-600 p-2 rounded-xl'>
          <img
          className='w-44 rounded-xl
           object-cover lg:h-96 lg:w-72'
          src={urlFor(collection.previewImage).url()}
          alt=""/>
          </div>
          <div className='text-center p-5 space-y-'>
            <h1 className='text-xl font-bold
             text-white'>
           {collection.nftCollectionName}
            </h1>
            <h2 className='text-xl text-gray-300'>
            {collection.description}
            </h2>
          </div>
        </div>
     </div>

     {/** Right */}
      
      <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
     {/** Header */}
      <header className='flex items-center justify-between'>
        <Link href={'/'}>
        <h1
         className='w-52 cursor-pointer text-xl
         font-extralight sm:w-80'>
        The{' '}
        <span className='  font-extrabold
        decoration-pink-600/50 underline'>
         ****** 
        </span>{' '}
        NFT Market Place
        </h1>
        </Link>
       <button onClick={() => address ? disconnect(): connectWithMetamask()} className="rounded-full bg-rose-400 text-white
        px-4 py-2 font-bold text-sm lg:px-5 lg:py-3 lg:text-base">
      {address ? 'Sign  Out':'Sign In'}
        </button>
      </header>
 <hr className='my-2 border'/>
      {address ? (
        <p className='text-center text-sm  text-rose-400'>You'r logged In wallet {address.substring(0,5)}...{address.substring(address.length - 5)}</p>
      ):(<></>)}
     {/** Content */}
    <div className='mt-10 flex flex-1 flex-col
    space-y-6 lg:justify-center items-center text-center  lg:space-y-0'>
      <img 
       className='w-80  object-cover pb-10 lg:h-40'
       src={urlFor(collection.mainImage).url()}
       alt="p"/>
       <h1 className='text-3xl
       font-bold lg:text-4xl lg:font-extrabold'>
      {collection.title}
      </h1>
      <p className='text-green-500 pt-2 tet-xl'>
        13/21 NFT's claimed
      </p>
    </div>
     
     {/** Mint Button */}
     <button className='h-16 w-full 
     bg-red-600 text-white rounded-full mt-10 font-bold'>
      Mint NFT (0.01MATIC)
     </button>

      </div>
    </div>
    </Layout>
  )
}

export default NFTDropPage

export const getServerSideProps:GetServerSideProps = async ({params})=>{
  const query =`*[_type == "collection" && slug.current == $id][0]{
    _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage{
      asset
      },
      previewImage{
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
  const collection = await sanityClient.fetch(query,{
    id:params?.id
  })
  
  if (!collection){
    return{
      notFound:true
    }
  }
  return{
    props:{
      collection
    }
  }
 
}