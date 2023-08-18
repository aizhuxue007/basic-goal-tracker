import React from 'react'

const PostForm = ({ children }) => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <form className="min-h-content  bg-green-500 p-40 rounded" action="POST">
        { children }
      </form>
    </div>
  )
}

export default PostForm;