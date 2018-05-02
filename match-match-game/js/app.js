showRules()

document.addEventListener('click', function (ev) {
    if (ev.target.matches('.start-game__btn')) {
        showGame(window.difficulty, window.shirt)
    } else if (ev.target.matches('.play__options-btn_new-game')) {
        showRules()
    }
})
