import { gsap } from "gsap";

const accordionItems = document.querySelectorAll('.accordion-item')

window.addEventListener('load', () => {
    accordionItems.forEach(item => {
        const accordionItemHeader = item.querySelector('.accordion-item__header')
        const $wrapper = item.querySelector('.accordion-item__wrap')
        const $wrapperCont = $wrapper.querySelector('.accordion-item__content')
        // const $img = $wrapper.querySelector('.service-tab__img')

        const tl = gsap.timeline({
            paused: false,
            onStart: () => { $wrapper.style.overflow = 'hidden' },
            onComplete: () => { $wrapper.style.overflow = 'visible' }
        })

        gsap.set($wrapper, { height: "auto" });
        tl
            .from($wrapperCont, {
                duration: .3,
                // scale: .5,
                // xPercent: -20,
                yPercent: -20,
                autoAlpha: 0,
                z: 0.001,
                ease: "power1.inOut",
                transformOrigin: "0% 0%",
            }, 0)
            .from($wrapper, {
                duration: .3,
                // scale: 0,
                height: 0,
                transformOrigin: "0% 0%",
                ease: "power1.inOut"
            }, 0).reverse();

        // gsap.set($wrapper, { height: "auto" });

        if (item.classList.contains('is-active')) {
            tl.reversed(!tl.reversed())
        }

      item.addEventListener('click', () => {
            const active = document.querySelector('.accordion-item.is-active')

            if (active && active !== item) {
                active.querySelector('.accordion-item__header').click()
            }

            if (item.classList.contains('is-active')) {
                item.classList.remove('is-active')
                $wrapper.style.overflow = 'hidden'
                tl.reverse()

            } else {
                item.classList.add('is-active')
                tl.reversed(!tl.reversed())
            }
        })
    })
})
