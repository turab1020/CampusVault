import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../lib/utils'

const Input = React.forwardRef(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2 w-full">
                {label && <label className="font-display font-bold text-lg uppercase text-black">{label}</label>}
                <input
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 bg-surface text-black placeholder:text-gray-500 border-brutal border-black rounded-lg shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all',
                        error && 'border-primary',
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-primary font-bold text-sm">{error}</span>}
            </div>
        )
    }
)

Input.displayName = 'Input'

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
}

export default Input
