import React from 'react'
import cn from 'classnames'
import './Shirt.css'

function Shirt (props) {
    return (
        <div className={cn('shirt', props.className)} onClick={props.onClick}/>
    )
}

export { Shirt }