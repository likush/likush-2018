let prevEl

function showHiddenContent (ev) {
    const selectedEl = ev.target
    if (selectedEl.closest('[data-content]')) {
        const dataEl = selectedEl.dataset.content
        console.log(selectedEl, dataEl, prevEl)
        document.querySelector('.container')
            .querySelector(`[data-content="${dataEl}"]`)
            .classList.toggle('s-hidden')
        if (prevEl) {
            document.querySelector('.container')
                .querySelector(`[data-content="${prevEl}"]`)
                .classList.add('s-hidden')
        }
        prevEl = dataEl
    }
}

document.addEventListener('click', showHiddenContent)
//
// document.querySelector('.navbar__collapsed-btn_nav').addEventListener('click', function (ev) {
//     document.querySelector('.navbar__nav-list').style.display = 'flex'
// })