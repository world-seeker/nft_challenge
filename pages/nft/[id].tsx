import React, { useEffect, useState } from 'react'
import Layout from '../../component/template/Layout'
import { useAddress, useContract, useDisconnect, useMetamask, useNFTDrop } from '@thirdweb-dev/react';
import { GetServerSideProps, } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typing';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast,{Toaster} from 'react-hot-toast'

interface Props{
  collection:Collection
}



function NFTDropPage({collection}:Props) {
  const [claimedSupply,setClaimeedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const nftDrop = useNFTDrop(collection.address);
  const [loading,setLoading] = useState<boolean>(true);
  const [priceInMatic,setPriceInMatic] = useState<string>()
  


     //Auth
     const connectWithMetamask = useMetamask();
     const address = useAddress();
     const disconnect = useDisconnect();
     //--
  
 useEffect(() => {
    if(!nftDrop) return;
    const fetchNFTDropData =  async ()=>{
      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();
      setClaimeedSupply(claimed.length);
      setTotalSupply(total);

      setLoading(false);
    }
    fetchNFTDropData();
 }, [nftDrop])

 useEffect(()=>{
  if(!nftDrop)return;
const fetchPrice= async()=>{
const claimedCondition = await nftDrop.claimConditions.getAll();
setPriceInMatic(claimedCondition?.[0].currencyMetadata.displayValue)
} 
fetchPrice();
 },[nftDrop])
 

 const mintNft = ()=>{
  if(!nftDrop || !address) return;  
  const quantity = 1;
  setLoading(true);
    
   const notification = toast.loading('Minting...',{
    style:{
      background:'white',
      color:'green',
      fontWeight:'bolder',
      fontSize:'17px',
      padding:'20px',
    }
   })


  nftDrop.claimTo(address,quantity).then(async(tx)=>{
    const receipt = tx[0].receipt
    const claimedTokenId = tx[0].id 
    const claimedNFT = await tx[0].data()
      toast('HOORAYY..You Succesfully Minted',{
        duration:8000,
        style:{
          background:'white',
          color:'green',
          fontWeight:'bolder',
          fontSize:'17px',
          padding:'20px',
        }
      })
    console.log(receipt)
    console.log(claimedTokenId)
    console.log(claimedNFT)
  }).catch(err =>{
    console.log(err)
    toast('Whoops..Something Went Wrong!',{
      style:{
        background:'red',
        color:'white',
        padding:'20px',
      }
    })
  }).finally(()=>{
  setLoading(false)
  toast.dismiss(notification)
  })
 }

  return (
    <Layout>
    <div className='flex min-h-screen flex-col lg:grid
     lg:grid-cols-10'>
    <Toaster position="bottom-center"/>
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
      <div>

      {loading ? (
        <p className='pt-2 text-xl  text-green-500 animate-bounce'>
          Loading Supply Count...
        </p>
      ):(
      <p className='text-green-500 pt-2 tet-xl'>
        {claimedSupply}/{totalSupply?.toString()} NFT's claimed
      </p> 
      )}
      {loading && (
        <img src="https://giphy.com/gifs/loop-loading-loader-xTk9ZvMnbIiIew7IpW" alt=""/>
      )}
      </div>
    </div>
     
     {/** Mint Button */}
     <button onClick={mintNft} disabled={loading || claimedSupply === totalSupply?.toNumber()} className='h-16 w-full 
     bg-red-600 text-white rounded-full mt-10 font-bold disabled:bg-gray-400'>
     {loading ? (
      <>Loading</>
     ):claimedSupply === totalSupply?.toNumber() ? (
      <>Sold Out</>
          ):!address ?(
            <>Sign in to Mint</>
          ):(
            <span className='font-bold '>
               
      Mint NFT ({priceInMatic}MATIC)
            </span>
          )}
 
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