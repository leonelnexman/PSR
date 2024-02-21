import Swiper from 'swiper'
import { Navigation, FreeMode } from 'swiper/modules';

Swiper.use([Navigation, FreeMode])

const swiper = new Swiper('.swiper-default', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  centeredSlides: false,
  speed: 450,
  preloadImages: false,
  watchOverflow: true,
  slideToClickedSlide: true,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: '.swiper-default-wrapper .swiper-custom-button-next',
    prevEl: '.swiper-default-wrapper .swiper-custom-button-prev',
  },
  breakpoints: {
    899: {
      spaceBetween: 10,
      slidesPerView: 3
    },
  }
})
