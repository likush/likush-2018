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
            <h2 class="heading card-shirts__heading">Select card shirt</h2>
            <div class="card-shirts__wrapper">
                <div class="card shirt shirt_geometric" data-shirt="shirt_geometric"></div>
                <div class="card shirt shirt_dotted" data-shirt="shirt_dotted"></div>
                <div class="card shirt shirt_tissue" data-shirt="shirt_tissue"></div>
            </div>
        </div>
        <div class="difficulty">
            <h2 class="heading difficulty__heading">Select difficulty level</h2>
            <div class="difficulty-btn-group">
                <div class="btn btn_outline difficulty__btn" data-difficulty="8">4x2</div>
                <div class="btn btn_outline difficulty__btn" data-difficulty="12">4x3</div>
                <div class="btn btn_outline difficulty__btn" data-difficulty="16">4x4</div>
            </div>
        </div>
        
        <form class="registration-form">
            <fieldset class="registration-form__fieldset">
                <label class="registration-form__item">
                    First name
                    <input class="registration-form__input" type="text" required name="first-name" value="{first-name}">
                </label>
                <label class="registration-form__item">
                    Last name
                    <input class="registration-form__input" type="text" required name="last-name" value="{last-name}">
                </label>
                <label class="registration-form__item">
                    Email
                    <input class="registration-form__input" type="email" required name="email" value="{email}">
                </label>
            </fieldset>
            <button class="btn start-game__btn">Start game</button>
        </form>
    </section>
</main>
`

function showRules (profile) {
    profile = profile || {}

    document.body.innerHTML = rulesTemplate
        .replace('{first-name}', profile['first-name'] || '')
        .replace('{last-name}', profile['last-name'] || '')
        .replace('{email}', profile.email || '')

    document.querySelector('.card-shirts__wrapper').addEventListener('click', selectShirt)
    document.querySelector('.difficulty-btn-group').addEventListener('click', selectDifficulty)
}

let prevShirtEl

function selectShirt (ev) {
    const selectedEl = ev.target
    if (selectedEl !== prevShirtEl && selectedEl.matches('[data-shirt]')) {
        window.shirt = selectedEl.dataset.shirt
        selectedEl.classList.add('shirt_selected')
        if (prevShirtEl) prevShirtEl.classList.remove('shirt_selected')
        prevShirtEl = selectedEl
    }
}

let prevDifficultyEl

function selectDifficulty (ev) {
    const selectedEl = ev.target
    if (selectedEl !== prevDifficultyEl && selectedEl.matches('[data-difficulty]')) {
        window.difficulty = +selectedEl.dataset.difficulty
        selectedEl.classList.add('difficulty__btn_selected')
        if (prevDifficultyEl) prevDifficultyEl.classList.remove('difficulty__btn_selected')
        prevDifficultyEl = selectedEl
    }
}
