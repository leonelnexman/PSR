import Swiper from 'swiper'
import { Navigation, FreeMode } from 'swiper/modules';

Swiper.use([Navigation, FreeMode])

const swiper = new Swiper('.swiper-video-reviews', {
  slidesPerView: 1,
  spaceBetween: 15,
  centeredSlides: false,
  speed: 700,
  preloadImages: false,
  slideToClickedSlide: false,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: '.swiper-default-wrapper .swiper-custom-button-next',
    prevEl: '.swiper-default-wrapper .swiper-custom-button-prev',
  },
})
