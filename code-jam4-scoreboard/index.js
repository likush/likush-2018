(function () {
    const tableEl = document.querySelector('.results')
    tableEl.appendChild(createHeader())
    createContent().forEach(element => tableEl.appendChild(element))

    function createHeader () {
        const row = createElement('tr')
        row.appendChild(createElement('th', 'GitHub Name'))

        const puzzleNames = CODEJAM_SESSIONS[0].puzzles.map(item => item.name)
        puzzleNames.forEach(name => {
            row.appendChild(createElement('th', name))
        })

        row.appendChild(createElement('th', 'Total Time'))

        return row
    }

    function createContent () {
        const solutions = CODEJAM_SESSIONS[0].rounds.map(round => round.solutions)
        return CODEJAM_USERS.map(user => {
            const row = createElement('tr')
            row.appendChild(createElement('td', user.displayName))

            let totalTime = 0
            solutions.forEach(solution => {
                const userSolution = solution[user.uid]
                const content = userSolution ? userSolution.time.$numberLong : 150
                row.appendChild(createElement('td', content))
                totalTime += +content
            })
            row.appendChild(createElement('td', totalTime))

            return row
        })
    }

    function createElement (tagName, innerHTML) {
        const el = document.createElement(tagName)
        if (innerHTML) el.innerHTML = innerHTML
        return el
    }
})()
