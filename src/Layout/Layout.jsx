import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-160">
            {/* Header */}
            <Header/>
            {/* Main content */}
            <Outlet/>
            {/* Footer */}
            <Footer />
    </div>
  )
}

export default Layout
