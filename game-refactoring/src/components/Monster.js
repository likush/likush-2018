import React from 'react'
import './Monster.css'

function Monster (props) {
    return (
        <div className="monster__wrapper">
            <div className="visible-change-hp">{props.hpChange}</div>
            <div className="monster">
                <img className="monster__body" src={props.parts[0]} alt="body"/>
                <img className="monster__legs" src={props.parts[1]} alt="legs"/>
                <img className="monster__weapon" src={props.parts[2]} alt="weapon"/>
            </div>
        </div>
    )
}

export { Monster }