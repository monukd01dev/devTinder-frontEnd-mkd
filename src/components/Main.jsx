import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router'

function Main() {
  return (
    // 1. Grandpa: min-h-screen
    <div className='flex flex-col relative overflow-x-clip bg-base-100 text-base-content'>
      <Navbar />
      
      {/* 2. Papa: flex-1 (Take remaining height) aur max-w-1200px (Boundary) */}
      <div className="flex-1 w-full min-h-screen max-w-[1200px] mx-auto flex flex-col px-4 md:px-8 pt-[5.5rem] md:pt-[7rem] pb-8">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  )
}

export default Main