import type { NextPage } from 'next'
import Layout from '../components/template/Layout';
import Header from '../components/atoms/Header';
import Feed from '../components/organism/Feed';

const Home: NextPage = () => {
  return (
    <main className="bg-gray-50 overflow-y-scroll
    scrollbar-hide h-screen">
    <Layout/>
    <Header/>
    <Feed/>
    </main>
  
  )
}

export default Home
