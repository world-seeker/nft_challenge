import React, { useEffect, useState } from 'react'
import Post from '../atoms/Post'
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';



function Posts() {

const [posts,setPosts]:any = useState([]);
useEffect(() => 
 onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')), snapshot =>{
   setPosts(snapshot.docs);
   }
  ), 
  [db]);


  return (
    <main>
      {posts.map((post: { id: any; data: () => { (): any; new(): any; username: any; profileimg: any; image: any; caption: any; }; }) => (
         <Post key={post.id}
         id={post.id}
         username={post.data().username}
         userImg={post.data().profileimg}
         img={post.data().image}
         caption={post.data().caption}
         />
      ))}
     
    </main>
  )
}

export default Posts