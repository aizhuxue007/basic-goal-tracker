import React from 'react'
import AppTitle from "./AppTitle";

const MainGrid = ({ children }) => {
  return (
    <div className="main-grid-item lg:col-start-auto lg:col-span-auto lg:row-start-auto lg:row-span-auto sm:col-start-2 sm:col-span-2 sm:row-start-1 sm:row-span-4 ">
          <div className="item-container h-full w-full rounded-3xl">
            
            {children}
          </div>
        </div>
  )
}

export default MainGrid