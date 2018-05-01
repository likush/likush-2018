showRules()

document.addEventListener('click', function (ev) {
    if (ev.target.matches('.start-game__btn')) {
        showGame(12, 'shirt__geometric')
    } else if (ev.target.matches('.play__options-btn_new-game')) {
        showRules()
    }
})
