import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header className='max-w-[1400px] m-auto'>
        
      </header>
      <main className='max-w-[1400px] m-auto'>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout