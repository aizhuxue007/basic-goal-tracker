import React from 'react'

const SignInForm = () => {
  return (
    <div>
      <form action="POST">
        <input type="email" placeholder='Enter email..'/>
        <input type="password" placeholder='Enter password..'/>
      </form>
    </div>
  )
}

export default SignInForm