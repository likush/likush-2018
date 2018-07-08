import { vocabulary } from './vocabulary.js'

function createMathTask () {
    const SIGNS = ['+', '-', '*']
    const a = Math.round(Math.random() * 10)
    const b = Math.round(Math.random() * 10)
    const sign = SIGNS[Math.floor(Math.random() * SIGNS.length)]
    const operation = new Function('a,b', 'return a' + sign + 'b')
    const result = operation(a, b)
    return {
        caption: 'Give your decision here',
        taskText: a + ' ' + sign + ' ' + b + ' =',
        checkResult: answer => +answer === result
    }
}

function createTranslateTask () {
    const keys = Object.keys(vocabulary)
    const word = keys[Math.floor(Math.random() * keys.length)]
    return {
        caption: 'Translate the word',
        taskText: word,
        checkResult: answer => vocabulary[word].includes(answer)
    }
}

export function selectTask () {
    const tasks = [createMathTask, createTranslateTask]
    const selectedTask = tasks[Math.floor(Math.random() * tasks.length)]
    return selectedTask()
}
