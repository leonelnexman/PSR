/* eslint-disable no-use-before-define */
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

// import { closeLangSwitcher } from "./lang-switcher"

const headerWrapper = document.querySelector(".header-wrapper-sticky");
const header = document.querySelector(".header-main");
// const headerTrigger = document.querySelector(".hero__nav");

const hamburger = document.querySelector(".hamburger");
// const hamburgerLines = hamburger.querySelectorAll(".hamburger__line");
const hamburgerTrigger = document.querySelector(".header__hamburger");
const mobMenu = document.querySelector(".mobile-menu");
const nav = document.querySelector(".header .nav");
const headerNav = document.querySelector(".header__nav");
const mobMenuNav = document.querySelector(".mobile-menu__nav");

const sidebar = document.querySelector('.docs-page__sidebar');
const menu = document.querySelector('.menu-page__nav-inner');

// const tlMobileMenu = gsap.timeline({ paused: true });

// tlMobileMenu
//     .to(mobMenu, {
//         autoAlpha: 1
//     }, 0)
//     .fromTo(".mobile-menu .nav__item span, .mobile-menu__footer > div", {
//         yPercent: 100,
//         autoAlpha: 0
//     }, {
//         autoAlpha: 1,
//         yPercent: 0,
//         duration: .8,
//         ease: "expo.out",
//         stagger: .08
//     }, .2)

function runmenu(run) {
    if (run === true) {
        // tlMobileMenu.timeScale(1).progress(0).play();
        header.classList.add('is-active');
        hamburger.classList.add('is-active');
        mobMenu.classList.add('is-active');

        if (sidebar && menu) {
            sidebar.classList.add('is-visible');
            menu.classList.add('is-visible');
            disableBodyScroll(mobMenu);
        }
    } else {
        // tlMobileMenu.timeScale(1.5).reverse();
        header.classList.remove('is-active');
        hamburger.classList.remove('is-active');
        mobMenu.classList.remove('is-active');

        if (sidebar && menu) {
            sidebar.classList.remove('is-visible');
            menu.classList.remove('is-visible');
            enableBodyScroll(mobMenu);
        }
    }
}

if (hamburgerTrigger) {
    hamburgerTrigger.addEventListener("click", () => {
        runmenu(!hamburger.classList.contains('is-active'));
    });
}

const mobMenuNavItems = mobMenu.querySelectorAll('.mobile-menu__nav .nav__item:not(.has-child)');

mobMenuNavItems.forEach(item => {
    item.addEventListener("click", () => {
        runmenu(false)
    });
})

const headerLandingMenuNavItems = header.querySelectorAll('.nav__item');
headerLandingMenuNavItems.forEach(item => {
    item.addEventListener("click", () => {
        runmenu(false)
    });
})

const navHasChild = document.querySelectorAll('.nav__item.has-child');

navHasChild.forEach(item => {
    const closeIfClickedOutside = (event) => {
        if (
            !event.target.closest(".nav__item.has-child")
        ) {
            item.classList.remove('is-active')
            document.removeEventListener("click", closeIfClickedOutside);
        }
    };

    const openNavChild = (open) => {
        document.querySelector('.nav__item.has-child.is-active')?.classList.remove('is-active')

        if (!open) {
            item.classList.add('is-active')
            document.addEventListener("click", closeIfClickedOutside);
        } else {
            item.classList.remove('is-active')
            document.removeEventListener("click", closeIfClickedOutside);
        }
    }

    item.addEventListener("click", () => {
        if (window.innerWidth > 899) return;

        openNavChild(item.classList.contains('is-active'))
    });

    item.addEventListener("mouseenter", () => {
        if (window.innerWidth < 899) return;

        openNavChild(false)
    });

    headerWrapper.addEventListener("mouseleave", () => {
        if (window.innerWidth < 899) return;

        openNavChild(true)
    });
})

let lastScrollTop = 0;
let ticking = false;

const stickyHeader = (scroll) => {
    if (header.classList.contains('is-animations')) {
        return
    }

    if (scroll > 0) {
        headerWrapper.classList.add('is-hide');
        if (sidebar && menu) {
            sidebar.classList.remove('is-visible');
            menu.classList.remove('is-visible');
        }
    } else {
        headerWrapper.classList.remove('is-hide');
        headerWrapper.classList.remove('is-visible');
        if (sidebar && menu) {
            sidebar.classList.remove('is-visible');
            menu.classList.remove('is-visible');
        }
    }

    if (scroll > lastScrollTop) {
        headerWrapper.classList.remove('is-visible');
        if (sidebar && menu) {
            sidebar.classList.remove('is-visible');
            menu.classList.remove('is-visible');
        }
    } else if (scroll < lastScrollTop) {
        headerWrapper.classList.add('is-visible');

        const menuPageNav = document.querySelector('.menu-page__nav');
        const navOffset = menuPageNav ? menuPageNav.getBoundingClientRect().top + window.pageYOffset : 0;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navOffset) {
            if (scrollTop < navOffset) {
                if (sidebar && menu) {
                    sidebar.classList.remove('is-visible');
                    menu.classList.remove('is-visible');
                }
            } else if (sidebar && menu) {
                    sidebar.classList.add('is-visible');
                    menu.classList.add('is-visible');
                }
        }
    }

    lastScrollTop = scroll;
}

const sections = document.querySelectorAll('section[id]')

// const navTriggers = document.querySelectorAll(`.header-landing .nav__item`)
// navTriggers.forEach(item => {
//   item.addEventListener('click', e => {
//     item.classList.add('is-active')
//   })
// })
const setActiveMenuItem = (scroll) => {

    sections.forEach(section => {
        const offset = section.offsetTop - 160;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const target = document.querySelector(`.header-landing .nav__item[href='#${id}']`);

        if (scroll >= offset && scroll < offset + height) {
            // const old = document.querySelectorAll(`.header-landing .nav__item.is-active`)
            // old.forEach(item => item.classList.remove('is-active'))
            target?.classList.add('is-active')
        } else {
            target?.classList.remove('is-active')
        }
    })
}

document.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            stickyHeader(scroll);
            setActiveMenuItem(scroll)

            setTimeout(() => {
                ticking = false;

                if (window.scrollY <= 0) {
                    // header.classList.remove('is-active')
                    headerWrapper.classList.remove('is-hide')
                    headerWrapper.classList.remove('is-visible');
                    // headerTrigger.classList.remove('is-hide')
                }
            }, 100)
        });

        ticking = true;
    }
})

const lastScrollTopp = 0;