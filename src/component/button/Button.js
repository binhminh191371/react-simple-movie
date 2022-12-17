import React from "react";


const Button = ({onClick, className,type="button",bgColor="primary", children}) => {
    let bgClassName ='bg-primary'
    switch (bgColor) {
        case 'primary':
            bgClassName = 'bg-primary'
            break;
            case 'secondary':
                bgClassName = 'bg-secondary'
                break;
        default:
            break;
    }
  return (
    <button
    type={type}
      onClick={onClick}
      className={`mt-auto w-full  py-4 px-6 rounded-lg capitalize ${bgClassName}  text-white font-medium flex items-center gap-x-2 justify-center ${className}`}
    >
      {children}
      
    </button>
  );
};

export default Button;
