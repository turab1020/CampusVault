import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';import { jsx as _jsx } from "react/jsx-runtime";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}





export const Card = /*#__PURE__*/React.forwardRef(
  ({ className, hoverEffect = false, ...props }, ref) => {
    return (/*#__PURE__*/
      _jsx("div", {
        ref: ref,
        className: cn(
          'bg-white text-black border-brutal border-black rounded-brutal shadow-brutal p-6',
          hoverEffect && 'hover:-translate-y-1 hover:shadow-brutal-hover transition-all duration-200 cursor-pointer',
          className
        ), ...
        props }
      ));

  }
);

Card.displayName = 'Card';