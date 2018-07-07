import { changeHealthBar } from './createHealthBar.js'
import { createModal, hideModal } from './createModal.js'
import { createMonster } from './createMonsters.js'
import { createPlayer } from './createPlayer.js'
import { selectTask } from './tasks.js'

const registrationModalTemplate = `
        <form class="form form__registration">
            <label class="registration__item">
                Your name
                <input class="form__input registration__input" type="text" required name="first-name">
            </label>
            <button class="btn form__btn registration__btn">Start game</button>
        </form>`

const resultTableTemplate = `
    <div class="game-results">
        <table class="table-results">
            <tr class="table-results__row">
                <th class="table-results__cell table-results__cell_head">Player name</th>
                <th class="table-results__cell table__cell_head">Defeated monsters</th>
            </tr>
            {rows}
        </table>
    </div>`

const resultRowTemplate = `
    <tr class="table-results__row">
        <td class="table-results__cell">{name}</td>
        <td class="table-results__cell">{monsters}</td>
    </tr>`

let monster, player, defeatedMonsters, currentTask, currentSpell
addDelegatedListener('submit', '.form__registration', handleSubmitPlayerName)
addDelegatedListener('submit', '.form__task', handleSubmitResult)
addDelegatedListener('click', '.action__btn_new-game', () => newGame())
addDelegatedListener('click', '.action__btn_attack', () => showModal('attack'))
addDelegatedListener('click', '.action__btn_heal', () => showModal('heal'))
addDelegatedListener('click', '.modal__btn_close', hideModal)

createModal('Registration', registrationModalTemplate)
focusOnInput()

function handleSubmitPlayerName (ev) {
    ev.preventDefault()
    const playerName = new FormData(ev.target).get('first-name').trim()

    hideModal()
    newGame(0, playerName)
}

function showModal (spell) {
    currentTask = selectTask()
    currentSpell = spell

    createModal(currentTask.caption, currentTask.taskHTML)
    focusOnInput()
}

function handleSubmitResult (ev) {
    ev.preventDefault()
    const answer = new FormData(ev.target).get('answer').trim()
    let isAnswerCorrect
    answer === '' ? isAnswerCorrect = false : isAnswerCorrect = currentTask.checkResult(answer)
    hideModal()
    if (isAnswerCorrect) {
        handleCorrectAnswer()
        generateAttack('playerAttack', playerAttackSound)
    } else {
        handleWrongAnswer()
        generateAttack('monsterAttack', monsterAttackSound)
    }

    checkGameResult()
}

function handleCorrectAnswer () {
    if (currentSpell === 'attack') {
        applySpell(monster, -1)
    } else if (currentSpell === 'heal') {
        applySpell(player, 1)
    }
}

function handleWrongAnswer () {
    applySpell(player, -1)
}

function applySpell (hero, multiplier) {
    const hpChange = (Math.floor(Math.random() * 10) + 10) * multiplier
    const hpPopupEl = hero.el.querySelector('.visible-change-hp')
    hpPopupEl.innerHTML = (hpChange > 0 ? '+' + hpChange : hpChange)
    hpPopupEl.classList.add('display-block')
    setTimeout(() => {
        hpPopupEl.classList.remove('display-block')
    }, 2000)

    hero.hp += hpChange
    if (hero.hp < 0) {
        hero.hp = 0
    } else if (hero.hp > 100) {
        hero.hp = 100
    }

    changeHealthBar(hero.healthBarEl, hero.hp)
}

function checkGameResult () {
    if (player.hp === 0) {
        showResults()
    } else if (monster.hp === 0) {
        createModal('Victory!', 'Lets fight again!')
        setTimeout(hideModal, 2000)
        setTimeout(() => newGame(defeatedMonsters + 1), 2000)
    }
}

function showResults () {
    const records = loadRecords()
    records.unshift({playerName: player.name, defeatedMonsters: defeatedMonsters})
    saveRecords(records)

    const rows = records
        .map(record => resultRowTemplate
            .replace('{name}', record.playerName)
            .replace('{monsters}', record.defeatedMonsters)
        )
        .join('')

    const content = resultTableTemplate.replace('{rows}', rows)
    const extra = `
        <div class="game-results__img">
            <p class="game-results__img-text">You are great!</p>
            <img class="game-results__chicken" src="src/player/chicken.png" alt="chicken">
        </div>`
    createModal('Total results', content, extra)
    newGame()
}

function newGame (_defeatedMonsters, playerName) {
    defeatedMonsters = _defeatedMonsters || 0
    monster = createMonster(100)
    player = createPlayer(100, playerName || player.name)
}

function loadRecords () {
    return JSON.parse(localStorage.getItem('records')) || []
}

function saveRecords (records) {
    localStorage.setItem('records', JSON.stringify(records))
}

const attackTemplate = `<img class="attack__img" src="src/fireworks.png" alt="attackImg">`
const attackEl = document.querySelector('.attack')
const playerAttackSound = new Audio('src/sounds/player-attack.wav')
const monsterAttackSound = new Audio('src/sounds/monster-attack.wav')

function generateAttack (animationName, sound) {
    attackEl.innerHTML = attackTemplate
    const attackImgEl = document.querySelector('.attack__img')
    attackImgEl.style.animationName = animationName
    setTimeout(() => {
        attackImgEl.classList.add('display-none')
    }, 2000)
    sound.play()
}

function focusOnInput () {
    document.querySelector('.form__input').focus()
}

function addDelegatedListener (eventName, selector, handler) {
    document.addEventListener(eventName, function (ev) {
        if (ev.target.matches(selector)) {
            handler.apply(this, arguments)
        }
    })
}
