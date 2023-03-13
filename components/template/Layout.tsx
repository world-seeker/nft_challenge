import Head from "next/head";
import React from 'react'

function Layout(children:any) {
  return (
    <div>   
        <Head>     
        <title>CloneApp</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
  )
}

export default Layout