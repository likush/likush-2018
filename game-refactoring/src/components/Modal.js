import React from 'react'
import { Button } from './Button'
import './Modal.css'

function Modal (props) {
    return (
        <div className="modal__container">
            <div className="modal">
                <div className="modal__content">
                    {props.onClose && <Button className="btn_close" onClick={props.onClose}>x</Button>}
                    <h2 className="modal__heading">{props.heading}</h2>
                    {props.children}
                </div>
                {props.extra}
            </div>
        </div>
    )
}

export { Modal }
