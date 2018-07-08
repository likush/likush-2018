import React from 'react'
import cn from 'classnames'
import './Input.css'

function Input (props) {
    return (
        <label>
            {props.heading}
            <input className={cn('form__input', props.className)}
                   type="text"
                   name={props.name}
                   onChange={props.onChange}
                   autoFocus
                   required/>
        </label>
    )
}

export { Input }
