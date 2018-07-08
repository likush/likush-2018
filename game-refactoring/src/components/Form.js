import React from 'react'
import cn from 'classnames'
import './Form.css'

function Form (props) {
    return (
        <form className={cn('form', props.className)} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

export { Form }
