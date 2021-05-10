import React from 'react'
import './button.scss'

const Button = ({children, ...otherProps}) => {
    return (
        <div>
            <button className="btn" {...otherProps}>
                {children}
            </button>
        </div>
    )
}

export default Button
