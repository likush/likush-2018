const taskTemplate = `
    <p class="modal__task">{content}</p>
    <form class="form form__task">
        <label>
            <input name="answer" class="form__input modal__input" type="text" required>
        </label>
        <button class="btn form__btn modal__btn">Submit</button>
    </form>`

function createMathTask () {
    const SIGNS = ['+', '-', '*']
    const a = Math.round(Math.random() * 10)
    const b = Math.round(Math.random() * 10)
    const sign = SIGNS[Math.floor(Math.random() * SIGNS.length)]
    const operation = new Function('a,b', 'return a' + sign + 'b')
    const result = operation(a, b)
    return {
        caption: 'Give your decision here',
        taskHTML: taskTemplate.replace('{content}', a + ' ' + sign + ' ' + b + ' ='),
        checkResult: answer => +answer === result
    }
}

function createTranslateTask () {
    const keys = Object.keys(window.VOCABULARY)
    const word = keys[Math.floor(Math.random() * keys.length)]
    return {
        caption: 'Translate the word',
        taskHTML: taskTemplate.replace('{content}', word),
        checkResult: answer => window.VOCABULARY[word].includes(answer)
    }
}

function selectTask () {
    const tasks = [createMathTask, createTranslateTask]
    const selectedTask = tasks[Math.floor(Math.random() * tasks.length)]
    return selectedTask()
}
