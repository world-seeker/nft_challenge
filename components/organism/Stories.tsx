import createRandomUser from '../faker';
import { useEffect, useState } from "react"
import Story from "../atoms/Story"


function Stories(){

  const [suggestions, setSuggestions] = useState<any[]>([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map(() => createRandomUser());
    setSuggestions(suggestions);
    
},[]);

  return (
    <div className="flex space-x-2 p-6 mt-8 bg-white
     border-gray-200 border  overflow-x-scroll rounded-sm
       scrollbar-thin scrollbar-thumb-black ">
      
      {suggestions.map(() =>(
        <Story key = {createRandomUser().id}/>
      ))}
         {/** Storie */}
         {/** Storie */}
         {/** Storie */}
         {/** Storie */}

    </div>
  )}
export default Stories
