import React from 'react'
import './form.scss'

const Form = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input required className="formInput" onChange={handleChange} {...otherProps}/>
        </div>
    )
}

export default Form
