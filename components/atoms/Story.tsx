import React from 'react'
import createRandomUser from '../faker';
import Image from 'next/image';


function Story({}) {


  return (
    <div className="relative w-14 h-14">
      <Image 
      priority
       className="h-14 w-14 object-contain
        rounded-full p-[1.5px] cursor-pointer
         border-red-500 border-2 hover:scale-110 
         transition transform duration-200 ease-out"
       src={createRandomUser().avatar}
       fill
       sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
       alt="pic"/>

      <p className=" text-sm w-14 text-center relative top-14 truncate">{createRandomUser().username}</p>
    </div>
  )
}

export default Story