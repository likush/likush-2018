function createNotification(tips) {
    const modalEl = document.querySelector('.modal');
    const modalContentEl = document.querySelector('.modal__content');
    const closeBtnEl = document.querySelector('.modal__btn_close');
    const checkboxEl = document.querySelector('.form__checkbox');

    if (window.localStorage.getItem('modal-visibility-hidden') !== 'true') {
        setTimeout(initComponent, 5000)
    }

    function initComponent() {
        modalContentEl.innerHTML = tips[0];

        const indicatorTemplate = document.querySelector('.indicators__item');

        for (let i = 0; i < tips.length - 1; i++) {
            const newIndicator = indicatorTemplate.cloneNode(true);
            indicatorTemplate.parentElement.appendChild(newIndicator)
        }

        indicatorTemplate.classList.add('indicators__item_active');

        document.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'Escape':
                    hideModal();
                    break;
                case 'ArrowLeft':
                    switchTip('prev');
                    break;
                case 'ArrowRight':
                    switchTip('next');
                    break;
            }
        });

        closeBtnEl.addEventListener('click', hideModal);
        checkboxEl.addEventListener('change', saveVisibilityState);
        modalEl.addEventListener('click', function (e) {
            if (e.target.matches('.carousel__btn_next')) {
                switchTip('next');
            } else if (e.target.matches('.carousel__btn_prev')) {
                switchTip('prev');
            }
        });

        showModal()
    }

    function hideModal() {
        modalEl.classList.add('modal_hidden');
    }

    function showModal() {
        modalEl.classList.remove('modal_hidden');
    }

    function saveVisibilityState(e) {
        const stateHidden = String(e.currentTarget.checked);
        window.localStorage.setItem('modal-visibility-hidden', stateHidden)
    }

    let currentIndex = 0;

    function switchTip(direction) {
        const indicators = document.querySelectorAll('.indicators__item');
        indicators[currentIndex].classList.remove('indicators__item_active');
        if (direction === 'next') {
            currentIndex = currentIndex === tips.length - 1 ? 0 : currentIndex + 1;
        } else if (direction === 'prev') {
            currentIndex = currentIndex === 0 ? tips.length - 1 : currentIndex - 1
        }
        indicators[currentIndex].classList.add('indicators__item_active');
        modalContentEl.innerHTML = tips[currentIndex];
    }
}
