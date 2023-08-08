import React from 'react'
import AppTitle from "./AppTitle";

const MainGrid = ({ children }) => {
  return (
    <div className="main-grid-item col-start-2 col-span-2 row-start-1 row-span-4 sm:col-start-auto sm:col-span-auto sm:row-start-auto sm:row-span-auto">
          <div className="item-container h-full w-full rounded-3xl">
            <AppTitle />
            {children}
          </div>
        </div>
  )
}

export default MainGrid