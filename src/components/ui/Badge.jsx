import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../lib/utils'

const Badge = ({ className = '', variant = 'primary', children, ...props }) => {
    const variants = {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-black',
        outline: 'bg-transparent border-2 border-black text-black',
        success: 'bg-accent-teal text-white',
        warning: 'bg-warning text-black',
    }

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border-2 border-black shadow-[2px_2px_0px_0px_#000]',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}

Badge.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'success', 'warning']),
    className: PropTypes.string,
}

export default Badge
