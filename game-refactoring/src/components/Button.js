import React, { Component } from 'react'
import cn from 'classnames'
import './Button.css'

class Button extends Component {
    render () {
        return (
            <button className={cn('btn', this.props.className)}>
                {this.props.children}
            </button>
        )
    }
}

export { Button }