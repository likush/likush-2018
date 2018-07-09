import React from 'react'
import cn from 'classnames'
import './Input.css'

function Input (props) {
    return (
        <input className={cn('form__input', props.className)}
               type="text"
               name={props.name}
               onChange={props.onChange}
               autoFocus
               required/>
    )
}

export { Input }
