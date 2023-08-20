import React from 'react'
import Welcome from './Welcome'

const NavBar = () => {
  return (
    <nav className='bg-green-700 p-5 sticky w-full text-white flex item-center justify-between'>
        <h1><a href="/">LOGO</a></h1>
        <Welcome />
        <ul className=''>
            <li><a href="">Profile</a></li>
            <li><a href="">Logout</a></li>
        </ul>
    </nav>
  )
}

export default NavBar