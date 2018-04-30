class Game {
    constructor () {
    }
}

const cardCount = 12
let matchedCardCount = 0
let gameTime

const cardsContainer = document.querySelector('.cards')

const cardTemplate = `
    <div class="card card__item">
        <div class="card__flipper">
            <div class="card__front"></div>
            <div class="card__back">
                <img class="card__back-img" src="img/match-pics/{filename}">
            </div>
        </div>
    </div>
`
const cardImages = [
    'apple.png',
    'apricot.png',
    'broccoli.png',
    'cabbage.png',
    'cherry.png',
    'eggplant.png',
    'loquat.png',
    'pawpaw.png',
    'pitaya.png',
    'plum.png'
]

function createCards () {
    const cardsData = []

    for (let i = 0; i < cardCount / 2; i++) {
        cardsData.push({filename: cardImages[i], order: Math.random()})
        cardsData.push({filename: cardImages[i], order: Math.random()})
    }
    cardsData.sort((a, b) => a.order - b.order)

    cardsContainer.innerHTML = cardsData
        .map(item => cardTemplate.replace('{filename}', item.filename))
        .join('')
}

function startTimer () {
    const timerEl = document.querySelector('.play__options-timer')
    timerEl.innerHTML = '00:00'
    const startTime = Date.now()
    const intervalId = setInterval(() => {
        const time = new Date(Date.now() - startTime).toISOString().substr(14, 5)
        timerEl.innerHTML = time
        if (matchedCardCount === cardCount) {
            clearInterval(intervalId)
            gameTime = time
        }
    }, 1000)
}

document.addEventListener('click', flipCard)
let openedCard

function flipCard (event) {
    const flipper = event.target.closest('.card__flipper')
    if (flipper && openedCard !== flipper) {
        flipper.classList.add('flipped')
        if (!openedCard) {
            openedCard = flipper
            return
        }

        const isMatched = checkMatches(flipper)
        if (isMatched) {
            delayHide(flipper.parentElement, openedCard.parentElement)
            openedCard = null
            matchedCardCount += 2
        } else {
            delayUnflip(flipper, openedCard)
            openedCard = null
        }
    }
}

function checkMatches (flipper) {
    const currentSrc = flipper.querySelector('.card__back-img').getAttribute('src')
    const prevSrc = openedCard.querySelector('.card__back-img').getAttribute('src')
    return currentSrc === prevSrc
}

function delayHide (card1, card2) {
    setTimeout(() => {
        card1.classList.add('hidden')
        card2.classList.add('hidden')
    }, 1000)
}

function delayUnflip (card1, card2) {
    setTimeout(() => {
        card1.classList.remove('flipped')
        card2.classList.remove('flipped')
    }, 1000)
}

createCards()
startTimer()
