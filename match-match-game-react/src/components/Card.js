import React from 'react'
import cn from 'classnames'
import './Card.css'

class Card extends React.Component {
    render () {
        return (
            <div className={cn('card card__item', {'hidden': this.props.hidden})}>
                <div className={cn('card__flipper', {'flipped': this.props.flipped})} onClick={this.props.onClick}>
                    <div className={cn('card__front', this.props.className)}/>
                    <div className="card__back">
                        <img className="card__back-img" src={this.props.src} alt='card'/>
                    </div>
                </div>
            </div>
        )
    }
}

export { Card }