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
            solutions.forEach(solution => {
                const userSolution = solution[user.uid]
                let content
                if (userSolution) {
                    content = userSolution.time.$numberLong
                } else {
                    content = 'incorrect'
                }
                row.appendChild(createElement('td', content))
            })
            row.appendChild(createElement('td', '1000'))

            return row
        })
    }

    function createElement (tagName, innerHTML) {
        const el = document.createElement(tagName)
        if (innerHTML) el.innerHTML = innerHTML
        return el
    }
})()
