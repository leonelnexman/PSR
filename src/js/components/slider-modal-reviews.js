import Swiper from 'swiper'
import { Navigation, FreeMode } from 'swiper/modules';

Swiper.use([Navigation, FreeMode])

const swiper = new Swiper('.swiper-modal-reviews', {
  slidesPerView: 1.08,
  spaceBetween: 10,
  centeredSlides: false,
  speed: 700,
  preloadImages: false,
  slideToClickedSlide: false,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: '.swiper-modal-reviews .swiper-custom-button-next',
    prevEl: '.swiper-modal-reviews .swiper-custom-button-prev',
  },
  breakpoints: {
    599: {
      spaceBetween: 15,
      slidesPerView: 1.68
    },
  }
})
