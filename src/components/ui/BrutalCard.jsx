import React from 'react'
import PropTypes from 'prop-types'

const BrutalCard = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div className={`bg-surface border-4 border-black rounded-brutal shadow-brutal overflow-hidden ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-brutal-hover transition-all duration-200 cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}

BrutalCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool,
}

export default BrutalCard
