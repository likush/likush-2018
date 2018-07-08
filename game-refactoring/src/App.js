import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { HealthBar } from './components/HealthBar'
import { Player } from './components/Player'
import { Monster } from './components/Monster'
import { createMonster } from './logic/createMonster'

const monster = createMonster()

class App extends Component {
    render () {
        return (
            <div className="container">
                <main className="main">
                    <div className="health-bar__group">
                        <HealthBar name={'test'} hp={90}/>
                        <HealthBar name={monster.name} hp={90} reversed/>
                    </div>

                    <div className="heroes__wrapper">
                        <div className="heroes">
                            <Player/>
                            <div className="attack"/>
                            <Monster parts={monster.parts}/>
                        </div>
                    </div>

                    <div className="actions">
                        <Button className="btn_new-game">New game</Button>
                        <div className="action__btn-group">
                            <Button className="btn_action">Attack</Button>
                            <Button className="btn_action">Heal</Button>
                        </div>
                    </div>
                </main>
                <div className="modal__container"/>
            </div>
        )
    }
}

export default App
