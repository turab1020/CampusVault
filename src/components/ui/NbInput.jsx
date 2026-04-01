import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const NbInput = forwardRef(({ label, className = '', error, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <label className="font-heading text-sm uppercase tracking-wide text-neutral-gray">{label}</label>}
      <input 
        ref={ref}
        className="w-full px-4 py-3 bg-white border-4 border-black font-sans text-black placeholder-neutral-gray outline-none transition-all duration-150"
        {...props}
      />
    </div>
  )
})

NbInput.displayName = 'NbInput'

NbInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
}

export default NbInput
