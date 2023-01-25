import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function MasterLayOut({userData,logout}) {
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <Outlet />
    </>
  )
}
