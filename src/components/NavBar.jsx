import React from 'react'
import Welcome from './Welcome'
import AppTitle from './AppTitle'
import {useState} from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [user, setUser] = useState('Aizhu')
  return (
    <nav className='bg-green-700 p-3 sticky w-full text-white flex item-center justify-between'>
        <a href="/" className='bg-green-700 flex items-center'>
          <AppTitle />
        </a>
        <Welcome user={user}/>
        <div className="link flex items-center">
          <Link className="align-middle mr-3" to="/login">Logout</Link>
        
        </div>
    </nav>
  )
}

export default NavBar