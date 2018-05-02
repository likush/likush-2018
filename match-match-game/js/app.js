showRules(loadProfile())

document.addEventListener('submit', function (ev) {
    if (ev.target.matches('.registration-form')) {
        ev.preventDefault()
        showGame(window.difficulty, window.shirt)
        const profile = {}
        new FormData(ev.target).forEach((value, name) => {
            profile[name] = value
        })
        saveProfile(profile)
    }
})

document.addEventListener('click', function (ev) {
    if (ev.target.matches('.play__options-btn_new-game')) {
        showRules(loadProfile())
    }
})

function loadProfile () {
    return JSON.parse(localStorage.getItem('game-profile'))
}

function saveProfile (profile) {
    localStorage.setItem('game-profile', JSON.stringify(profile))
}

function saveRecords (profile, time) {
    const records = JSON.parse(localStorage.getItem('records')) || []
    localStorage.setItem('records', JSON.stringify(records.concat({profile: profile, time: time})))
}
