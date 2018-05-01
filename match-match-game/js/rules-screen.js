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

function showRules () {
    document.querySelector('body').innerHTML = rulesTemplate
}
