let prevEl, prevMenuEl

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
    } else if (selectedEl.matches('.navbar__nav-link')) {
        const arrowEl = selectedEl.closest('.navbar__nav-item').querySelector('.arrow')
        arrowEl.classList.add('visible')
        if (prevMenuEl && prevMenuEl !== arrowEl) {
            prevMenuEl.classList.remove('visible')
        }
        prevMenuEl = arrowEl
    }
}

document.addEventListener('click', showHiddenContent)