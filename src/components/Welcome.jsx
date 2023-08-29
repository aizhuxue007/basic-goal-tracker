import React from 'react'

const Welcome = ({ user }) => {
  return (
    <div className="flex items-center mr-5">Welcome back {user}!</div>
  )
}

export default Welcome;