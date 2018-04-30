const cardCount = 12
let matchedCardCount = 0
let gameTime

const rulesTemplate = `
<main class="main-content">
    <section class="about-game">
        <div class="description">
            <h1 class="heading description__heading heading_inverted">Match match game</h1>
            <p class="description__text">Match match game is a counter game where the object is to find pairs.</p>
            <p class="description__text">When the game begins, all pictures are hidden.</p>
        </div>
        <div class="rules">
            <h2 class="heading heading_inverted">How to play</h2>
            <ol class="rules__list">
                <li class="rules__item">Select two cards to try to match the pictures</li>
                <li class="rules__item">If you match the pictures you can do again</li>
                <li class="rules__item">If they don't match it is the computer turn them.</li>
                <li class="rules__item">The player that finds all pairs wins!</li>
                <li class="rules__item">Have fun!</li>
            </ol>
        </div>
    </section>
    <section class="game-options">
        <div class="card-shirts">
            <h2 class="heading card-shirts__heading">Select card shirts</h2>
            <div class="card-shirts__wrapper">
                <div class="card shirt shirt__geometric"></div>
                <div class="card shirt shirt__dotted"></div>
                <div class="card shirt shirt__tissue"></div>
            </div>
        </div>
        <div class="difficulty">
            <h2 class="heading difficulty__heading">Select difficulty level</h2>
            <div class="difficulty-btn-group">
                <div class="btn btn_outline difficulty__btn">4x3</div>
                <div class="btn btn_outline difficulty__btn">4x4</div>
                <div class="btn btn_outline difficulty__btn">4x5</div>
            </div>
        </div>
        <button class="btn start-game__btn">Start game</button>
    </section>
</main>
`

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

showRules()

function showRules () {
    document.querySelector('body').innerHTML = rulesTemplate
    document.querySelector('.start-game__btn').addEventListener('click', showGame)
}

function showGame () {
    document.body.innerHTML = gameTemplate
    createCards()
    startTimer()
    document.querySelector('.play__options-btn_new-game').addEventListener('click', showRules)
    document.addEventListener('click', flipCard)
}

function createCards () {
    const cardsData = []

    for (let i = 0; i < cardCount / 2; i++) {
        cardsData.push({filename: cardImages[i], order: Math.random()})
        cardsData.push({filename: cardImages[i], order: Math.random()})
    }
    cardsData.sort((a, b) => a.order - b.order)

    document.querySelector('.cards').innerHTML = cardsData
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
