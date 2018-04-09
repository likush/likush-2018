function sumOfOther(data) {
    const sum = data.reduce((accumulator, num) => {
        return accumulator + num
    })

    return data.map(num => sum - num)
}
