import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { HealthBar } from './components/HealthBar'
import { Player } from './components/Player'
import { Monster } from './components/Monster'
import { Modal } from './components/Modal'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { createMonster } from './logic/createMonster'
import { selectTask } from './logic/createTask'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            monster: createMonster(),
            monsterHp: 100,
            player: {},
            playerHp: 100,
            defeatedMonsters: 0,
            modal: {
                heading: 'Registration',
                content: (<Form onSubmit={ev => this.handleModalHide(ev)}>
                    <label>
                        Your name
                        <Input className="form__input_registration"
                               name="first-name"
                               onChange={ev => this.handlePlayerNameChange(ev)}/>
                    </label>
                    <Button className="btn_form btn_registration">Start game</Button>
                </Form>)
            }
        }
    }

    handlePlayerNameChange (ev) {
        this.setState({player: {name: ev.target.value}})
    }

    handleModalHide (ev) {
        ev.preventDefault()
        this.setState({modal: null})
    }

    handleSpellClick (spell) {
        const currentTask = selectTask()

        this.setState({
            modal: {
                heading: currentTask.caption,
                content: (
                    <React.Fragment>
                        <p className="modal__task">{currentTask.taskText}</p>
                        <Form onSubmit={ev => this.handleAnswer(ev, spell, currentTask)}>
                            <label>
                                <Input className="form__input_answer" name="answer"/>
                            </label>
                            <Button className="btn_form">Submit</Button>
                        </Form>
                    </React.Fragment>
                ),
                onClose: (ev) => this.handleModalHide(ev)
            }
        })
    }

    handleAnswer (ev, spell, currentTask) {
        this.handleModalHide(ev)
        const answer = new FormData(ev.target).get('answer').trim()
        const isAnswerCorrect = currentTask.checkResult(answer)

        if (isAnswerCorrect) {
            this.handleCorrectAnswer(spell)
        } else {
            this.handleWrongAnswer()
        }

        // checkGameResult()
    }

    handleCorrectAnswer (spell) {
        if (spell === 'attack') {
            this.applySpell('monster', -1)
        } else if (spell === 'heal') {
            this.applySpell('player', 1)
        }
    }

    handleWrongAnswer () {
        this.applySpell('player', -1)
    }

    applySpell (hero, multiplier) {
        const hpChange = (Math.floor(Math.random() * 10) + 10) * multiplier
        // hpPopupEl.innerHTML = (hpChange > 0 ? '+' + hpChange : hpChange)
        // hpPopupEl.classList.add('display-block')
        // setTimeout(() => {
        //     hpPopupEl.classList.remove('display-block')
        // }, 2000)
        //
        // hero.hp += hpChange
        // if (hero.hp < 0) {
        //     hero.hp = 0
        // } else if (hero.hp > 100) {
        //     hero.hp = 100
        // }
        //
        // changeHealthBar(hero.healthBarEl, hero.hp)
    }

    render () {
        return (
            <div className="container">
                <main className="main">
                    <div className="health-bar__group">
                        <HealthBar name={this.state.player.name} hp={this.state.playerHp}/>
                        <HealthBar name={this.state.monster.name} hp={this.state.monsterHp} reversed/>
                    </div>

                    <div className="heroes__wrapper">
                        <div className="heroes">
                            <Player/>
                            <div className="attack"/>
                            <Monster parts={this.state.monster.parts}/>
                        </div>
                    </div>

                    <div className="actions">
                        <Button className="btn_new-game">New game</Button>
                        <div className="action__btn-group">
                            <Button className="btn_action" onClick={() => this.handleSpellClick('attack')}>
                                Attack
                            </Button>
                            <Button className="btn_action" onClick={() => this.handleSpellClick('heal')}>
                                Heal
                            </Button>
                        </div>
                    </div>
                </main>
                {this.state.modal && (
                    <Modal heading={this.state.modal.heading} content={this.state.modal.content}
                           onClose={this.state.modal.onClose}/>
                )}
            </div>
        )
    }
}

export default App
