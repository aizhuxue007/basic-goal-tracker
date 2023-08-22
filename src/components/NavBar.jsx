import React from 'react'
import Welcome from './Welcome'
import AppTitle from './AppTitle'
import {useState} from 'react'

const NavBar = () => {
  const [user, setUser] = useState('Aizhu')
  return (
    <nav className='bg-green-700 p-5 sticky w-full text-white flex item-center justify-between'>
        <a href="/" className='bg-green-700 flex items-center'>
          <AppTitle />
        </a>
        <Welcome user={user}/>
        <div className="link flex items-center">
          <a className="align-middle" href="">Logout</a>
        
        </div>
        
    </nav>
  )
}

export default NavBar