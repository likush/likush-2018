const gameTemplate = `
<main class="play-field">
    <div class="play__options">
        <button class="btn play__options-btn play__options-btn_new-game">New game</button>
        <div class="play__options-timer"></div>
    </div>

    <div class="cards"></div>

    <p class="copyright">
        Drawings by <a class="copyright__link" target="_blank" href="https://dribbble.com/Necklaceee">NOZ Creative</a>
    </p>
</main>
`

const cardTemplate = `
    <div class="card card__item">
        <div class="card__flipper">
            <div class="card__front {card-shirt}"></div>
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

let cardCount

function showGame (difficulty, shirt) {
    document.body.innerHTML = gameTemplate
    cardCount = difficulty
    createCards(difficulty, shirt)
    startTimer()
    document.addEventListener('click', flipCard)
}

function createCards (cardCount, shirt) {
    const cardsData = []

    for (let i = 0; i < cardCount / 2; i++) {
        cardsData.push({filename: cardImages[i], order: Math.random()})
        cardsData.push({filename: cardImages[i], order: Math.random()})
    }
    cardsData.sort((a, b) => a.order - b.order)

    document.querySelector('.cards').innerHTML = cardsData
        .map(item => cardTemplate
            .replace('{filename}', item.filename)
            .replace('{card-shirt}', shirt)
        )
        .join('')
}

let gameTime
let matchedCardCount = 0

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
