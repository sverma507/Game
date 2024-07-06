import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default RootLayout

