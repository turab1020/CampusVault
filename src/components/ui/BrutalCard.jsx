import React from 'react'
import PropTypes from 'prop-types'

const BrutalCard = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface border-4 border-black rounded-brutal shadow-brutal overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

BrutalCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default BrutalCard
