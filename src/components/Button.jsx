import React from "react";

const Button = ({ className, content, onClick, children }) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {content}
        {children}
      </button>
    </>
  );
};

export default Button;
