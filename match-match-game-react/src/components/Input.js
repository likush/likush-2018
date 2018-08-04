import React from 'react'
import './Input.css'

function Input (props) {
    return (
        <label className="form__label">
            {props.label}
            <input className="form__input"
                   type={props.type}
                   name={props.name}
                   value={props.value}
                   placeholder={props.placeholder}
                   onChange={props.onChange}
                   required/>

        </label>
    )
}

export { Input }