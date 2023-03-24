import { ThirdwebProvider } from "@thirdweb-dev/react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'



function MyApp({ Component, pageProps}:AppProps) {
  return (
  <ThirdwebProvider activeChain="mumbai">
    <Component {...pageProps}/>
  </ThirdwebProvider>
  
  ) 
  }
 
export default MyApp

