import React from 'react';
import PropTypes from 'prop-types';

const BrutalButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider rounded-brutal border-4 shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-hover disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-black hover:bg-red-600 border-black',
    secondary: 'bg-secondary text-black hover:bg-yellow-400 border-black',
    outline: 'bg-transparent border-black text-black hover:bg-gray-100',
    ghost: 'bg-transparent border-transparent shadow-none text-black hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

BrutalButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default BrutalButton;
