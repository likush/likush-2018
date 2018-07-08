import React from 'react'
import './Player.css'
import chicken from '../img/player/chicken.png'

function Player (props) {
    return (
        <div className="player__wrapper">
            <div className="visible-change-hp">{props.hpChange}</div>
            <div className="player">
                <img className="player__img" src={chicken} alt="player"/>
            </div>
        </div>
    )
}

export { Player }
