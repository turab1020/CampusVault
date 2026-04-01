import React from 'react';
import PropTypes from 'prop-types';

const BrutalButton = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-heading uppercase tracking-wide border-4 border-black rounded-brutal transition-all duration-150 focus:outline-none px-6 py-3 text-base';

  const variants = {
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-black',
    outline: 'bg-white text-black hover:bg-surface',
    ghost: 'border-transparent bg-transparent hover:border-black text-black',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default BrutalButton;
