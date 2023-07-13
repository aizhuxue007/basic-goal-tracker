import React from "react";

const GridItem = ({ title, gridProps, input, children }) => {
    let tailWindClasses = `grid-item p-2 ${gridProps}`
    return (
        <>
            <div className={`${tailWindClasses}`}>
                <div className={`item-container w-full h-full rounded-3xl bg-green-500 p-3 text-white`}>
                    <h1 className="text-2xl font-bold text-center">{title} </h1>
                    <h2 className="mt-5 text-1xl font-light text-center">{input}</h2>
                    {children}
                </div>
            </div>
        </>
    )
        
    
}

export default GridItem;