import React from 'react'
import './HealthBar.css'

function HealthBar (props) {
    return (
        <div className="health-bar_wrapper">
            <p className="health-bar__name">{props.name}</p>
            <div className="health-bar">
                <span className="health-bar__value">{props.hp}</span>
                <div className="health-bar__inner" style={{
                    width: props.hp + '%',
                    marginLeft: props.reversed ? 'auto' : 0
                }}/>
            </div>
        </div>
    )
}

export { HealthBar }
