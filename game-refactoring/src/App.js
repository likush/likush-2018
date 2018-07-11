import React, { Component } from 'react'
import './App.css'
import { Button } from './components/Button'
import { HealthBar } from './components/HealthBar'
import { Hero } from './components/Hero'
import { Modal } from './components/Modal'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { ResultsTable } from './components/ResultsTable'
import { createMonster } from './logic/createMonster'
import { selectTask } from './logic/createTask'
import { loadRecords, saveRecords } from './utils/recordsStore'
import chicken from './img/player/chicken.png'
import fireworks from './img/fireworks.png'
import monsterAttackSound from './sounds/monster-attack.wav'
import playerAttackSound from './sounds/player-attack.wav'

const Spell = {
    ATTACK: 'attack',
    HEAL: 'heal'
}

class App extends Component {
    constructor (props) {
        super(props)
        this.state = this.createNewGameState()
        this.state.player = {}
        this.state.defeatedMonsters = 0
        this.state.modal = (<Modal heading='Registration'>
            <Form onSubmit={ev => this.handleModalHide(ev)}>
                <label>
                    Your name
                    <Input className="form__input_registration"
                           name="first-name"
                           onChange={ev => this.handlePlayerNameChange(ev)}/>
                </label>
                <Button className="btn_form btn_registration">Start game</Button>
            </Form>
        </Modal>)
    }

    createNewGameState (isNextRound) {
        const nextState = {
            monster: createMonster(),
            monsterHp: 100,
            playerHp: 100,
        }

        if (!isNextRound) nextState.defeatedMonsters = 0
        return nextState
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
            modal: (<Modal heading={currentTask.caption} onClose={ev => this.handleModalHide(ev)}>
                <p className="modal__task">{currentTask.taskText}</p>
                <Form onSubmit={ev => this.handleAnswer(ev, spell, currentTask)}>
                    <label>
                        <Input className="form__input_answer" name="answer"/>
                    </label>
                    <Button className="btn_form">Submit</Button>
                </Form>
            </Modal>)
        })
    }

    handleAnswer (ev, spell, currentTask) {
        this.handleModalHide(ev)
        const answer = new FormData(ev.target).get('answer').trim()
        const isAnswerCorrect = currentTask.checkResult(answer)

        this.applySpell(spell, isAnswerCorrect)
            .then(() => this.checkGameResult())
    }

    applySpell (spell, isAnswerCorrect) {
        let multiplier, hpStateProp, attackTarget, sound
        if (isAnswerCorrect && spell === Spell.ATTACK) {
            multiplier = -1
            hpStateProp = 'monsterHp'
            attackTarget = 'playerAttack'
            sound = playerAttackSound
        } else if (isAnswerCorrect && spell === Spell.HEAL) {
            multiplier = 1
            hpStateProp = 'playerHp'
        } else if (!isAnswerCorrect) {
            multiplier = -1
            hpStateProp = 'playerHp'
            attackTarget = 'monsterAttack'
            sound = monsterAttackSound
        }

        const hpChange = (Math.floor(Math.random() * 10) + 10) * multiplier
        let heroHp = this.state[hpStateProp]
        heroHp += hpChange
        if (heroHp < 0) {
            heroHp = 0
        } else if (heroHp > 100) {
            heroHp = 100
        }

        new Audio(sound).play()

        this.setState({
            [hpStateProp]: heroHp,
            attackTarget: attackTarget
        })

        return new Promise(resolve => {
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.setState({attackTarget: null})
                resolve()
            }, 2000)
        })
    }

    checkGameResult () {
        if (this.state.playerHp === 0) {
            this.showResults()
            setTimeout(
                () => this.setState({modal: null}),
                4000
            )
        } else if (this.state.monsterHp === 0) {
            const nextState = this.createNewGameState(true)
            nextState.defeatedMonsters = this.state.defeatedMonsters + 1
            nextState.modal = <Modal heading='Victory!'>Let's fight again!</Modal>

            this.setState(nextState)
            setTimeout(
                () => this.setState({modal: null}),
                2000
            )
        }
    }

    showResults () {
        const records = loadRecords()
        records.unshift({playerName: this.state.player.name, defeatedMonsters: this.state.defeatedMonsters})
        saveRecords(records)

        this.setState({
            modal: (<Modal heading='Total results' extra={(
                <div className="game-results__img">
                    <p className="game-results__img-text">You are great!</p>
                    <img className="game-results__chicken" src={chicken} alt="chicken"/>
                </div>
            )}>
                <ResultsTable records={records}/>
            </Modal>)
        })
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
                            <Hero hp={this.state.playerHp}>
                                <div className="player">
                                    <img className="player__img" src={chicken} alt="player"/>
                                </div>
                            </Hero>
                            <div className="attack">
                                <img className="attack__img"
                                     style={{
                                         animationName: this.state.attackTarget,
                                         display: this.state.attackTarget ? 'block' : 'none'
                                     }}
                                     src={fireworks}
                                     alt="attackImg"
                                />
                            </div>
                            <Hero hp={this.state.monsterHp}>
                                <div className="monster">
                                    <img className="monster__body" src={this.state.monster.parts[0]} alt="body"/>
                                    <img className="monster__legs" src={this.state.monster.parts[1]} alt="legs"/>
                                    <img className="monster__weapon" src={this.state.monster.parts[2]} alt="weapon"/>
                                </div>
                            </Hero>
                        </div>
                    </div>

                    <div className="actions">
                        <Button className="btn_new-game" onClick={() => this.setState(this.createNewGameState())}>
                            New game
                        </Button>
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
                {this.state.modal}
            </div>
        )
    }
}

export default App
