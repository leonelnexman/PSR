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
        disableBodyScroll(mobMenu);
    } else {
        // tlMobileMenu.timeScale(1.5).reverse();
        header.classList.remove('is-active');
        hamburger.classList.remove('is-active');
        mobMenu.classList.remove('is-active');
        enableBodyScroll(mobMenu);
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

  // const { top } = headerTrigger.getBoundingClientRect()

  if (scroll > 0) {
    // header.classList.add('is-active')
    headerWrapper.classList.add('is-hide')
    // headerTrigger.classList.add('is-hide')
  } else {
    // header.classList.remove('is-active')
    headerWrapper.classList.remove('is-hide')
    headerWrapper.classList.remove('is-visible');
    // headerTrigger.classList.remove('is-hide')
  }

  if (scroll > lastScrollTop) {
    headerWrapper.classList.remove('is-visible');
  } else if (scroll < lastScrollTop) {
    headerWrapper.classList.add('is-visible');
  } else {
    // headerWrapper.classList.remove('is-visible');
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

const sidebar = document.querySelector('.docs-page__sidebar');
const menu = document.querySelector('.menu-page__nav-inner');

let lastScrollTopp = 0;

window.addEventListener('scroll', () => {
    // Проверяем ширину экрана
    if (window.innerWidth >= 962) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTopp) {
            // Скролл вниз
            sidebar.classList.add('is-hide');
            menu.classList.add('is-hide');
            sidebar.classList.remove('is-visible');
            menu.classList.remove('is-visible');
        } else {
            // Скролл вверх
            sidebar.classList.add('is-visible');
            menu.classList.add('is-visible');
            sidebar.classList.remove('is-hide');
            menu.classList.remove('is-hide');
            
            // Доработка: удаляем класс is-visible при остатке прокрутки 400px до верха
            if (currentScroll <= 150) {
                sidebar.classList.remove('is-visible');
                menu.classList.remove('is-visible');
            }
        }
        
        lastScrollTopp = currentScroll <= 0 ? 0 : currentScroll; // Для кроссбраузерной поддержки
    }
}, false);