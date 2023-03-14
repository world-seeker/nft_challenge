import React from 'react'

function MiniProfile() {
  return (
    <div className="flex items-center justify-between
          mt-14 ml-10">
        <img
        className='rounded-full border  
        p-[2px] w-16 h-16'
        src="mypic.jpg" 
        alt=""/>
       
       <div className='flex-1 mx-4' >
        <h1 className="font-bold">swapnil</h1>
        <h2 className="text-sm
         text-gray-400">Welcome to instagram</h2>
       </div>
       <button className="font-semibold 
       text-sm text-blue-400">Sign Out</button>
    </div>
  )
}

export default MiniProfile