import { gsap } from "gsap";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const modalTriggers = document.querySelectorAll('[data-modal]')

const modalAnimType = (modalId) => {
    const tl = gsap.timeline({ paused: true })
    const title = document.querySelector(`#${modalId} .modal__title div`)

    if (!title) return tl

    tl
        .fromTo(`#${modalId} .modal__title div, #${modalId} .modal__desc div`, {
            yPercent: 100,
        },{
            yPercent: 0,
            duration: .9,
            stagger: 0.15,
            ease: 'power1.out'
        }, 0)
        .fromTo(`#${modalId} .modal__form > div`, {
            y: 16,
            autoAlpha: 0
        },{
            y: 0,
            autoAlpha: 1,
            duration: .7,
            stagger: .08,
            ease: 'power1.out'
        }, .35)

    return tl
}

modalTriggers.forEach(item => {
    const modalId = item.dataset.modal;
    const modal = document.querySelector(`#${modalId}`);
    // const loopObj = false

    if (!modal) return

    const modalCloseButtons = modal.querySelectorAll('.js-modal-close')
    const modalWrapper = modal.querySelector('.modal-container__wrapper')

    const initAnimation = gsap.timeline({ paused: true });

    const animation = modalAnimType(modalId)

    initAnimation
        .fromTo(modal.querySelector('.modal'), {
            y: 16,
            scaleX: .95,
            autoAlpha: 0,
        }, {
            y: 0,
            scaleX: 1,
            autoAlpha: 1,
            // duration: .5,
            ease: 'power1.inOut'
        }, 0)
        .fromTo(modal.querySelector('.modal-container__overlay'), {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            // duration: .5,
            ease: 'power1.inOut'
        }, 0)

    const keyDownClose = (e) => {
        if (e.key === 'Escape') {
            // eslint-disable-next-line no-use-before-define
            setInactive()
        }
    }

    const wrapperClickCheck = (e) => {
        if (e.target === modalWrapper) {
            // eslint-disable-next-line no-use-before-define
            setInactive()
        }
    }

    const setInactive = (event) => {
        event?.preventDefault()

        initAnimation.timeScale(1.5).reverse().then(() => {
            modal.classList.remove('is-active')
            enableBodyScroll(modal);

            modalCloseButtons.forEach(closeButton => {
                closeButton.removeEventListener('click', setInactive)
            })
            modalWrapper.removeEventListener('click', wrapperClickCheck)
            window.removeEventListener('keydown', keyDownClose)


            animation.kill()
        })
    }

    const setActive = () => {
        disableBodyScroll(modal, {
            reserveScrollBarGap: true,
        });
        modal.classList.add('is-active')
        document.querySelector('.header').classList.remove('is-visible');

        modalCloseButtons.forEach(closeButton => {
            closeButton.addEventListener('click', setInactive)
        })

        modalWrapper.addEventListener('click', wrapperClickCheck)

        window.addEventListener('keydown', keyDownClose)

        initAnimation.timeScale(1).progress(0).play().then(() => {
            // modal.querySelector('form .input, form .textarea')?.focus()
        })
        animation.restart()
    }

    item.addEventListener('click', (e) => {
        e.preventDefault()

        setActive()
    })
})
