import React from 'react'
import { Card } from './Card'
import './CardsField.css'

class CardsField extends React.Component {
    constructor (props) {
        super(props)
        this.matchedCards = 0
        this.state = {
            hiddenIds: [],
            flippedIds: [],
        }
    }

    handleFlip (index, image) {
        if (!this.openedCard) {
            this.openedCard = {index: index, image: image}
            this.setState({flippedIds: [index]})
        } else {
            const nextState = {flippedIds: [index, this.openedCard.index]}
            if (this.openedCard.image === image && this.openedCard.index !== index) {
                nextState.hiddenIds = this.state.hiddenIds.concat(index, this.openedCard.index)
                this.matchedCards = this.matchedCards + 2
                this.checkResult(this.matchedCards, this.props.difficulty)
            }
            this.openedCard = null
            this.setState(nextState)

            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.setState({flippedIds: []})
            }, 1331)
        }
    }

    checkResult (matchedCards, difficulty) {
        if (matchedCards === difficulty) {
            this.props.onAllCardsMatched()
        }
    }

    render () {
        return (
            <div className='cards'>
                {this.props.cardsData.map((card, i) =>
                    <Card className={this.props.shirt}
                          hidden={this.state.hiddenIds.includes(i)}
                          flipped={this.state.flippedIds.includes(i)}
                          src={card.file} key={i}
                          onClick={() => this.handleFlip(i, card.file)}/>
                )}
            </div>
        )
    }
}

export { CardsField }
