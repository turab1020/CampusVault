import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../lib/utils'

const Card = React.forwardRef(
    ({ className = '', hoverEffect = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-white text-black border-brutal border-black rounded-brutal shadow-brutal p-6',
                    hoverEffect && 'hover:-translate-y-1 hover:shadow-brutal-hover transition-all duration-200 cursor-pointer',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

Card.displayName = 'Card'

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    hoverEffect: PropTypes.bool,
}

export default Card
