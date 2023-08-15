import React from 'react'

const RegisterForm = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <form className="min-h-content  bg-green-500 p-40 rounded" action="POST">
        <h1 className='text-white text-center text-2xl font-semibold mb-10'>Register</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className='text-white'>Email</label>
          <input id="email" className="text-white bg-green-700 rounded p-2" type="email" />
          <label htmlFor="password" className='text-white'>Password</label>
          <input id="password" className="text-white bg-green-700 rounded p-2" type="password" />
          <label htmlFor="password" className='text-white'>Verify Password</label>
          <input id="password" className="text-white bg-green-700 rounded mb-10 p-2" type="password" />
        </div>
        
        <div className="w-full flex flex-row space-x-4">
          <button type='submit' className="bg-green-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
            Sign up
          </button>
          <a href="./login" className="bg-green-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
            Log in
          </a>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm