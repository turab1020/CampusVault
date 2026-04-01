import React from 'react';
import PropTypes from 'prop-types';

const BrutalButton = ({
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-heading uppercase tracking-wide border-4 border-black rounded-brutal transition-all duration-150 focus:outline-none px-6 py-3 text-base';

  return (
    <button
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

BrutalButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default BrutalButton;
