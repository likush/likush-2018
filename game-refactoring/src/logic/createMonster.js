import body1 from '../img/monsters/body/body_1.png'
import body2 from '../img/monsters/body/body_2.png'
import body3 from '../img/monsters/body/body_3.png'
import legs1 from '../img/monsters/legs/legs_1.png'
import legs2 from '../img/monsters/legs/legs_2.png'
import legs3 from '../img/monsters/legs/legs_3.png'
import weapon1 from '../img/monsters/weapon/weapon_1.png'
import weapon2 from '../img/monsters/weapon/weapon_2.png'
import weapon3 from '../img/monsters/weapon/weapon_3.png'

const monsterParts = {
    body: [body1, body2, body3],
    legs: [legs1, legs2, legs3],
    weapon: [weapon1, weapon2, weapon3]
}

export function createMonster () {
    const generatedParts = []
    for (const prop in monsterParts) {
        generatedParts.push(monsterParts[prop][Math.floor(Math.random() * monsterParts[prop].length)])
    }

    return {
        name: createMonsterName(),
        parts: generatedParts
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
