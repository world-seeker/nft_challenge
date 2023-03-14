import React from 'react'
import Post from '../atoms/Post'

const posts=[{
  id:"123",
  username:"swapnil",
  userImg:"mypic.jpg",
  img:"pp.jpg",
  caption:"yeah this caption!",
},
{
  id:"123",
  username:"swapnil",
  userImg:"mypic.jpg",
  img:"pp.jpg",
  caption:"yeah this caption!",
}
]

function Posts() {
  return (
    <main>
      {posts.map(post => (
         <Post key={post.id}
         id={post.id}
         username={post.username}
         userImg={post.userImg}
         img={post.img}
         caption={post.caption}
         />
      ))}
     
    </main>
  )
}

export default Posts