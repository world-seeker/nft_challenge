import React, { useEffect,useState } from 'react'
import createRandomUser from '../faker';


function Suggestions() {

    const [suggestions, setSuggestions] = useState([{}]);
    useEffect(() => {
      const suggestions = [...Array(5)].map((_,i) => createRandomUser());
      setSuggestions(suggestions);
  }, []);

  return (
    <div className='mt-4 ml-10'>
      <div className="flex text-sm mb-5 justify-between ">
        <h1 className='text-gray-400 text-sm font-bold'>Suggestins to you</h1>
        <button className='text-gray-400 font-semibold'
        >See All</button>
      </div>
      {
        suggestions.map(profile =>([
         <div key={createRandomUser().id} className='flex
         items-center justify-between mt-3'>
            <img 
             className='w-10 h-10 rounded-full border p-[2px] '
            src={createRandomUser().avatar}
             alt="avs"/>
             <div className='flex-1 ml-4'>
                <h2 className='text-sm font-semibold '>
                    {createRandomUser().username}
                </h2>
                <h3 className='text-xs text-gray-400'>
                 Works at {createRandomUser().company}
                </h3>
             </div>
             <button className='text-blue-400 text-xs font-bold'>Follow</button>
         </div>
        ]))
      }
    </div>
  )
}

export default Suggestions