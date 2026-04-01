import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const NbInput = forwardRef(({ label, className = '', error, ...props }, ref) => {
  const baseClasses = 'w-full px-4 py-3 bg-white border-4 border-black font-sans text-black placeholder-neutral-gray outline-none transition-all duration-150 rounded-none'
  const focusClasses = 'focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-brutal-hover'
  const errorClasses = error ? 'border-primary shadow-brutal ring-inset ring-2 ring-primary' : 'shadow-brutal'

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <label className="font-heading text-sm uppercase tracking-wide text-neutral-gray">{label}</label>}
      <input 
        ref={ref}
        className={`${baseClasses} ${focusClasses} ${errorClasses}`}
        {...props}
      />
      {error && <span className="font-sans text-xs font-bold text-primary">{error}</span>}
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
