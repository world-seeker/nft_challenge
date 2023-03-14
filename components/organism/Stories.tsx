import createRandomUser from '../faker';
import { useEffect, useState } from "react"
import Story from "../atoms/Story"


function Stories(){

  const [suggestions, setSuggestions] = useState([{}]);
  useEffect(() => {
    const suggestions = [...Array(30)].map((_,i) => createRandomUser());
    setSuggestions(suggestions);
}, []);

  return (
    <div className="flex space-x-2 p-6 mt-8 bg-white
     border-gray-200 border  overflow-x-scroll rounded-sm
       scrollbar-thin scrollbar-thumb-black ">
      
      {suggestions.map(profile =>(
        <Story key = {createRandomUser().id}
        img={createRandomUser().avatar}
        username={createRandomUser().username}
        />
      ))}
         {/** Storie */}
         {/** Storie */}
         {/** Storie */}
         {/** Storie */}

    </div>
  )}
export default Stories
