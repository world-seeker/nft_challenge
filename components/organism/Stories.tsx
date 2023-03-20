import createRandomUser from '../faker';
import { useEffect, useState } from "react"
import Story from "../atoms/Story"
import { useSession } from 'next-auth/react';
import faker from "../faker"


function Stories(){

  const [suggestions, setSuggestions] = useState<any[]>([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map(() => createRandomUser());
    setSuggestions(suggestions);
    
},[]);
   const {data:session} = useSession();
  return (
    <div className="flex space-x-2 p-6 mt-8 bg-white
     border-gray-200 border  overflow-x-scroll rounded-sm
       scrollbar-thin scrollbar-thumb-black ">
      {session && (
        <Story img={session?.user?.image}
         user={session?.user?.username}/>
      )}
      {suggestions.map(() =>(
        <Story key = {createRandomUser().id}
        img={createRandomUser().avatar}
         user={createRandomUser().username}/>
      ))}
         {/** Storie */}
         {/** Storie */}
         {/** Storie */}
         {/** Storie */}

    </div>
  )}
export default Stories
