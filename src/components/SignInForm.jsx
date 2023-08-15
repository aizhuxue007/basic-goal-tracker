import React from 'react'

const SignInForm = () => {
  return (
    <div className='w-4/5 h-screen my-0 mx-auto'>
      <form className="container flex-row h-1/2 my-10 bg-green-500 p-10" action="POST">
        <label htmlFor="email">Email</label>
        <input id="email" className="text-white" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" className="text-white" type="password" />
        <div className="flex flex-col gap-2">
          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log in
          </button>
          <a href="./register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </a>
        </div>
      </form>
    </div>

  )
}

export default SignInForm