import React, { Component } from 'react'
import { Button } from './Button'
import './Modal.css'

class Modal extends Component {
    render () {
        return (
            <div className="modal__container">
                <div className="modal">
                    <div className="modal__content">
                        {this.props.onClose && <Button className="btn_close" onClick={this.props.onClose}>x</Button>}
                        <h2 className="modal__heading">{this.props.heading}</h2>
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}

export { Modal }
