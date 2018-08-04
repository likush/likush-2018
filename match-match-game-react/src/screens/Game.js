import React from 'react'
import { Button } from '../components/Button'
import { CardsField } from '../components/CardsField'
import { Timer } from '../components/Timer'
import './Game.css'
import { ResultsTable } from '../components/ResultsTable'

class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            records: []
        }
    }

    handleTimeChange = (score) => this.currentScore = score

    handleAllCardsMatched = () => {
        const currentResult = {
            username: this.props.name,
            email: this.props.email,
            score: this.currentScore
        }

        window.fetch('http://mmg-score.herokuapp.com', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(currentResult)
        })

        window.fetch('http://mmg-score.herokuapp.com')
            .then(response => response.json())
            .then(results => {
                this.setState({
                    isGameOver: true,
                    records: [currentResult].concat(results.result)
                })
            })
    }

    render () {
        return (
            <main className="game">
                <div className="game__options">
                    <Button className='btn_new-game' onClick={this.props.onNewGame}>New game</Button>
                    <Timer stopped={this.state.isGameOver} onTimeChange={this.handleTimeChange}/>
                </div>

                {!this.state.isGameOver
                    ? <CardsField
                        shirt={this.props.shirt}
                        cardsData={this.props.cardsData}
                        difficulty={this.props.difficulty}
                        onAllCardsMatched={this.handleAllCardsMatched}/>
                    : <ResultsTable records={this.state.records}/>
                }

                <p className="copyright">
                    Drawings by <a className="copyright__link"
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