import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../lib/utils'

const Button = React.forwardRef(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-white hover:bg-red-600 border-bg-main',
            secondary: 'bg-secondary text-black hover:bg-yellow-400 border-black',
            outline: 'bg-transparent border-black text-black hover:bg-gray-100',
            ghost: 'bg-transparent border-transparent shadow-none text-black hover:bg-gray-100',
        }

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-display font-bold uppercase tracking-wider rounded-brutal border-brutal shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-hover disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

Button.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
}

export default Button
