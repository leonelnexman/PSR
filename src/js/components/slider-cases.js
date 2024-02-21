import Swiper from 'swiper'
import { Navigation, FreeMode } from 'swiper/modules';

Swiper.use([Navigation, FreeMode])


const swiper = new Swiper('.swiper-cases', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  centeredSlides: false,
  speed: 700,
  preloadImages: false,
  slideToClickedSlide: false,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: '.swiper-cases .swiper-custom-button-next',
    prevEl: '.swiper-cases .swiper-custom-button-prev',
  },

  breakpoints: {
    100: {
      spaceBetween: 8,
    },
    599: {
      spaceBetween: 20,
    },
  },
})

const caseTriggers = document.querySelectorAll('.js-case-trigger')

if (caseTriggers.length) {
  const caseModal = document.querySelector('#modal-case')
  const caseModalContent = caseModal.querySelector('.modal__content')

  caseTriggers.forEach(el => {
    const parent = el.closest('.swiper-slide')

    el.addEventListener('click', () => {
      caseModalContent.innerHTML = parent.innerHTML
    })
  })
}
