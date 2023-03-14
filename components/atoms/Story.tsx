import React from 'react'
import{ faker,} from "@faker-js/faker"
import Image from 'next/image';

function Story({img,username}:any) {
  return (
    <main className="">
      <img 
       className="h-14 w-14 object-contain
        rounded-full p-[1.5px] cursor-pointer
         border-red-500 border-2 hover:scale-110 
         transition transform duration-200 ease-out"
       src={img}
       alt="pic"/>


      <p className=" text-sm w-14 text-center
       truncate">{username}</p>
    </main>
  )
}

export default Story