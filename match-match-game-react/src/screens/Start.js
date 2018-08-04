import React from 'react'
import cn from 'classnames'
import { Shirt } from '../components/Shirt'
import { Button } from '../components/Button'
import { Form } from '../components/Form'
import { Input } from '../components/Input'

import './Start.css'

class Start extends React.Component {
    render () {
        return (
            <main className="start-content">
                <section className="about-game">
                    <div className="game-description">
                        <h1 className="heading game-description__heading heading_inverted">Match match game</h1>
                        <p className="game-description__text">
                            Match match game is a counter game where the object is to find pairs.
                        </p>
                        <p className="game-description__text">When the game begins, all pictures are hidden.</p>
                    </div>
                    <div className="rules">
                        <h2 className="heading heading_inverted">How to play</h2>
                        <ol className="rules__list">
                            <li className="rules__item">Select two cards to try to match the pictures</li>
                            <li className="rules__item">If you match the pictures you can do again</li>
                            <li className="rules__item">If they don't match it is the computer turn them.</li>
                            <li className="rules__item">The player that finds all pairs wins!</li>
                            <li className="rules__item">Have fun!</li>
                        </ol>
                    </div>
                </section>
                <section className="game-options">
                    <div className="shirts">
                        <h2 className="heading">Select card shirt</h2>
                        <div className="shirts__wrapper">
                            <Shirt
                                className={cn('shirt_geometric', {'shirt_selected': this.props.shirt === 'geometric'})}
                                onClick={() => this.props.onShirtChange('geometric')}/>
                            <Shirt
                                className={cn('shirt_dotted', {'shirt_selected': this.props.shirt === 'dotted'})}
                                onClick={() => this.props.onShirtChange('dotted')}/>
                            <Shirt
                                className={cn('shirt_tissue', {'shirt_selected': this.props.shirt === 'tissue'})}
                                onClick={() => this.props.onShirtChange('tissue')}/>
                        </div>
                    </div>
                    <div className="difficulty">
                        <h2 className="heading">Select difficulty level</h2>
                        <div className="difficulty-btn-group">
                            <Button
                                className={cn('btn_difficulty', {'btn_difficulty-selected': this.props.difficulty === 8})}
                                onClick={() => this.props.onDifficultyChange(8)}>4 x 2</Button>
                            <Button
                                className={cn('btn_difficulty', {'btn_difficulty-selected': this.props.difficulty === 12})}
                                onClick={() => this.props.onDifficultyChange(12)}>4 x 3</Button>
                            <Button
                                className={cn('btn_difficulty', {'btn_difficulty-selected': this.props.difficulty === 16})}
                                onClick={() => this.props.onDifficultyChange(16)}>4 x 4</Button>

                        </div>
                    </div>

                    <Form>
                        <Input onChange={this.props.onPlayerNameChange}

                               value='li'

                               label='name'
                               name='name'
                               type='text'
                               placeholder={'Your name'}/>
                        <Input onChange={this.props.onPlayerEmailChange}

                               value='li@li'

                               label='Email'
                               name='email'
                               type='email'
                               placeholder={'Your email'}/>
                        <Button className='btn_start-game' onClick={() => {
                            this.props.onScreenChange('game')
                            this.props.onCreateCards()
                        }}>
                            Start game
                        </Button>
                    </Form>
                </section>
            </main>
        )
    }
}

export { Start }
