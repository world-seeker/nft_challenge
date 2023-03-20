import React from 'react'
import { signOut, useSession } from 'next-auth/react'

function MiniProfile() {
 
   
   const {data:session} = useSession();


  return (
    <div className="flex items-center justify-between
          mt-14 ml-10">
        <img
        className='rounded-full border  
        p-[2px] w-16 h-16'
        src={session?.user?.image}
        alt=""/>
       
       <div className='flex-1 mx-4' >
        <h1 className="font-bold">{session?.user?.username}</h1>
        <h2 className="text-sm
         text-gray-400">Welcome to instagram</h2>
       </div>
       <button className="font-semibold 
       text-sm text-blue-400" 
       onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default MiniProfile