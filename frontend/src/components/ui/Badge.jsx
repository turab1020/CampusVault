import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';import { jsx as _jsx } from "react/jsx-runtime";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}





export const Badge = ({ className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-black',
    outline: 'bg-transparent border-2 border-black text-black',
    success: 'bg-accent-teal text-white',
    warning: 'bg-warning text-black'
  };

  return (/*#__PURE__*/
    _jsx("span", {
      className: cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border-2 border-black shadow-[2px_2px_0px_0px_#000]',
        variants[variant],
        className
      ), ...
      props }
    ));

};