const healthBarTemplate = `
    <p class="health-bar__name">{name}</p>
    <div class="health-bar">
        <span class="health-bar__value">{hp}</span>
        <div class="health-bar__inner" style="{style}"></div>
    </div>`

function createHealthBar (selector, style, name, hp) {
    const healthBarEl = document.querySelector(selector)
    healthBarEl.innerHTML = healthBarTemplate
        .replace('{style}', style)
        .replace('{name}', name)
        .replace('{hp}', hp)

    return healthBarEl
}

function changeHealthBar (healthBarEl, newHp) {
    healthBarEl.querySelector('.health-bar__inner').style.setProperty('width', newHp + '%')
    healthBarEl.querySelector('.health-bar__value').innerHTML = newHp
}
