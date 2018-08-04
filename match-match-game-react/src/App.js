import React from 'react'
import { Start } from './screens/Start.js'
import { Game } from './screens/Game'
import apple from './img/match-pics/apple.png'
import apricot from './img/match-pics/apricot.png'
import broccoli from './img/match-pics/broccoli.png'
import cabbage from './img/match-pics/cabbage.png'
import cherry from './img/match-pics/cherry.png'
import eggplant from './img/match-pics/eggplant.png'
import loquat from './img/match-pics/loquat.png'
import pawpaw from './img/match-pics/pawpaw.png'
import pitaya from './img/match-pics/pitaya.png'
import plum from './img/match-pics/plum.png'
import './App.css'

const cardImages = [apple, apricot, broccoli, cabbage, cherry, eggplant, loquat, pawpaw, pitaya, plum]

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = this.createStartState()
    }

    createStartState () {
        return {
            screen: 'start',
            shirt: 'geometric',
            difficulty: 8
        }
    }

    handleNewGame = () => {
        this.setState(this.createStartState())
    }

    handleShirtChange = shirt => {
        this.setState({shirt: shirt})
    }

    handleDifficultyChange = difficulty => {
        this.setState({difficulty: difficulty})
    }

    handlePlayerNameChange = ev => {
        this.setState({name: ev.target.value})
    }

    handlePlayerEmailChange = ev => {
        this.setState({email: ev.target.value})
    }

    handleScreenChange = screen => {
        this.setState({screen: screen})
    }

    createCards = () => {
        const cardsData = []
        for (let i = 0; i < this.state.difficulty / 2; i++) {
            cardsData.push({file: cardImages[i], order: Math.random()})
            cardsData.push({file: cardImages[i], order: Math.random()})
        }
        cardsData.sort((a, b) => a.order - b.order)
        this.setState({cardsData: cardsData})
    }

    render () {
        return this.state.screen === 'start'
            ? <Start
                shirt={this.state.shirt}
                onShirtChange={this.handleShirtChange}
                difficulty={this.state.difficulty}
                onDifficultyChange={this.handleDifficultyChange}
                onPlayerNameChange={this.handlePlayerNameChange}
                onPlayerEmailChange={this.handlePlayerEmailChange}
                onScreenChange={this.handleScreenChange}
                onCreateCards={this.createCards}
            />
            : this.state.screen === 'game' && <Game shirt={this.state.shirt}
                                                    difficulty={this.state.difficulty}
                                                    cardsData={this.state.cardsData}
                                                    onNewGame={this.handleNewGame}/>
    }

}

export default App
