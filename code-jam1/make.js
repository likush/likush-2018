function make(...args) {
    const data = args
    return function next(...nextArgs) {
        if (typeof nextArgs[0] === 'function') {
            return data.reduce(nextArgs[0])
        } else {
            data.push(...nextArgs)
            return next
        }
    }
}
