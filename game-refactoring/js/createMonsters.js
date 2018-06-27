const monsterTemplate = `
    <div class="visible-change-hp"></div> 
    <div class="monster">
        <img class="monster__body" src="src/monsters/body/{body}" alt="body">
        <img class="monster__legs" src="src/monsters/legs/{legs}" alt="legs">
        <img class="monster__weapon" src="src/monsters/weapon/{weapon}" alt="weapon">
    </div>`

const monsterParts = {
    body: ['body_1.png', 'body_2.png', 'body_3.png'],
    legs: ['legs_1.png', 'legs_2.png', 'legs_3.png'],
    weapon: ['weapon_1.png', 'weapon_2.png', 'weapon_3.png']
}

function createMonster (hp) {
    const generatedParts = []
    for (const prop in monsterParts) {
        generatedParts.push(monsterParts[prop][Math.floor(Math.random() * monsterParts[prop].length)])
    }

    const monsterEl = document.querySelector('.monster__wrapper')
    monsterEl.innerHTML = monsterTemplate
        .replace('{body}', generatedParts[0])
        .replace('{legs}', generatedParts[1])
        .replace('{weapon}', generatedParts[2])

    const monsterName = createMonsterName()
    const monsterHealthBarEl = createHealthBar('.health-bar_monster', 'margin-left: auto', monsterName, hp)

    return {
        name: monsterName,
        el: monsterEl,
        healthBarEl: monsterHealthBarEl,
        hp: hp
    }
}

const monsterNames = {
    adjectives: ['Big', 'Toothy', 'Round', 'Small', 'Green', 'Snotty'],
    nouns: ['Pangolin', 'Monster', 'Gnome', 'Lizard', 'Ogr', 'Goblin'],
    names: ['George', 'Chris', 'Arnold', 'Harry', 'Ronald']
}

function createMonsterName () {
    let name = ''
    for (const prop in monsterNames) {
        name += monsterNames[prop][Math.floor(Math.random() * monsterNames[prop].length)] + ' '
    }
    return name.trim()
}
