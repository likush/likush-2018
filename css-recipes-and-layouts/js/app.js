let prevEl

function showHiddenContent (ev) {
    const selectedEl = ev.target
    if (selectedEl.closest('[data-content]')) {
        const dataEl = selectedEl.dataset.content

        document.querySelector('.container')
            .querySelector(`[data-content="${dataEl}"]`)
            .classList.toggle('visible')
        if (prevEl && prevEl !== dataEl) {
            document.querySelector('.container')
                .querySelector(`[data-content="${prevEl}"]`)
                .classList.remove('visible')

        }
        prevEl = dataEl
    }
}

document.addEventListener('click', showHiddenContent)