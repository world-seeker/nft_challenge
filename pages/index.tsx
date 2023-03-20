import type { NextPage } from 'next'
import Layout from '../components/template/Layout';
import Header from '../components/atoms/Header';
import Feed from '../components/organism/Feed';
import Modal from '../components/organism/Modal';

const Home: NextPage = () => {
  return (
    <main className="bg-gray-50 overflow-y-scroll
    scrollbar-hide h-screen">
    <Layout/>
    <Header/>
    <Feed/>
    <Modal/>


    </main>
  
  )
}

export default Home
