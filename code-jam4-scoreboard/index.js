(function () {
    const formEl = document.querySelector('.session_selector')
    const tableEl = document.querySelector('.results')

    const selectedSession = new FormData(formEl).get('session')
    renderTable(selectedSession)

    formEl.addEventListener('change', function () {
        const selectedSession = new FormData(formEl).get('session')
        renderTable(selectedSession)
    })

    function renderTable (selectedSession) {
        tableEl.innerHTML = null
        tableEl.appendChild(createHeader(CODEJAM_SESSIONS[selectedSession]))
        createContent(CODEJAM_SESSIONS[selectedSession])
            .forEach(element => tableEl.appendChild(element))
    }

    function createHeader (session) {
        const row = createElement('tr')
        row.appendChild(createElement('th', 'GitHub Name'))

        const puzzleNames = session.puzzles.map(item => item.name)
        puzzleNames.forEach(name => {
            row.appendChild(createElement('th', name))
        })

        row.appendChild(createElement('th', 'Total Time'))

        return row
    }

    function createContent (session) {
        const solutions = session.rounds.map(round => round.solutions)
        return CODEJAM_USERS.map(user => {
            const row = createElement('tr')
            row.appendChild(createElement('td', user.displayName))

            let totalTime = 0
            solutions.forEach(solution => {
                const userSolution = solution[user.uid]
                const content = userSolution && userSolution.correct === 'Correct'
                    ? userSolution.time.$numberLong
                    : '150'
                const timeEl = createElement('td', content)
                if (userSolution) timeEl.title = userSolution.code
                row.appendChild(timeEl)

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
