function createPlayer (hp, name) {
    const playerEl = document.querySelector('.player__wrapper')
    const playerHealthBarEl = createHealthBar('.health-bar_player', 'margin-right: auto', name, hp)

    return {
        name: name,
        el: playerEl,
        healthBarEl: playerHealthBarEl,
        hp: hp
    }
}
