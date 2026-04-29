import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}






export const Input = /*#__PURE__*/React.forwardRef(
  ({ className, label, error, ...props }, ref) => {
    return (/*#__PURE__*/
      _jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        label && /*#__PURE__*/_jsx("label", { className: "font-display font-bold text-lg uppercase text-black", children: label }), /*#__PURE__*/
        _jsx("input", {
          ref: ref,
          className: cn(
            'w-full px-4 py-3 bg-surface text-black placeholder:text-gray-500 border-brutal border-black rounded-lg shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all',
            error && 'border-primary',
            className
          ), ...
          props }
        ),
        error && /*#__PURE__*/_jsx("span", { className: "text-primary font-bold text-sm", children: error })] }
      ));

  }
);

Input.displayName = 'Input';