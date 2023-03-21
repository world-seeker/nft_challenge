import Head from 'next/head'


function Layout({children}:any) {
  return (
    <>
    <Head>
    <title>NFT-Challenge</title>
    <link rel="icon" href="/favicon.ico"/>
    </Head>
  {children}
    </>
  )
}

export default Layout