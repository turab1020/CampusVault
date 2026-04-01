import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-black',
    dark: 'bg-black text-white',
    outline: 'bg-white text-black',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-heading font-black tracking-wide uppercase border-2 border-black rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'dark', 'outline']),
  className: PropTypes.string,
}

export default Badge
