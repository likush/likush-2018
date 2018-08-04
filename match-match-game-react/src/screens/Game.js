import React from 'react'
import { Button } from '../components/Button'
import { CardsField } from '../components/CardsField'
import { Timer } from '../components/Timer'
import './Game.css'

class Game extends React.Component {
    render () {
        return (
            <main className="game">
                <div className="game__options">
                    <Button className='btn_new-game' onClick={this.props.onNewGame}>New game</Button>
                    <Timer/>
                </div>

                <CardsField shirt={this.props.shirt} cardsData={this.props.cardsData} difficulty={this.props.difficulty}/>

                <p className="copyright">
                    Drawings by
                    <a className="copyright__link"
                       rel="noopener noreferrer"
                       target="_blank"
                       href="https://dribbble.com/Necklaceee">
                        NOZ Creative
                    </a>
                </p>
            </main>
        )
    }
}

export { Game }