const modalTemplate = `
    <div class="modal">
        <div class="modal__content">
            <button class="btn modal__btn_close">x</button>
            <h2 class="modal__heading">{caption}</h2>
            {content}
        </div>
        {extra}
    </div>`

function createModal (caption, content, extra) {
    const modalContainer = document.querySelector('.modal__container')
    modalContainer.innerHTML = modalTemplate
        .replace('{caption}', caption)
        .replace('{content}', content)
        .replace('{extra}', extra || '')
}

function hideModal () {
    document.querySelector('.modal__container').innerHTML = null
}
