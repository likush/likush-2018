export function loadRecords () {
    return JSON.parse(localStorage.getItem('records')) || []
}

export function saveRecords (records) {
    localStorage.setItem('records', JSON.stringify(records))
}
