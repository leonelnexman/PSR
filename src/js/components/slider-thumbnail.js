import Swiper from 'swiper'
import { FreeMode, Thumbs, Navigation } from 'swiper/modules';

Swiper.use([FreeMode, Thumbs, Navigation])

const swiper2 = new Swiper('.swiper-thumbnail', {
  spaceBetween: 4,
  slidesPerView: 'auto',
  speed: 700,
  preloadImages: false,
  watchSlidesProgress: true,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 2,
    loadOnTransitionStart: true,
    threshold: 50,
  },
  freeMode: {
    enabled: true,
  },
  breakpoints: {
    100: {
      // spaceBetween: 8,
    },
    899: {
      spaceBetween: 4,
    },
    1100: {
      // slidesPerView: 16,
    },
  },
})

const swiper = new Swiper('.swiper-thumbnail-main', {
  slidesPerView: 2,
  spaceBetween: 10,

  speed: 700,
  // preloadImages: false,
  loop: true,
  // loopedSlides: 5,
  // LoopAdditionalSlides: 1,
  lazyPreloadPrevNext: 1,
  navigation: {
    nextEl: '.swiper-thumbnail-wrapper .swiper-custom-button-next',
    prevEl: '.swiper-thumbnail-wrapper .swiper-custom-button-prev',
  },
  thumbs: {
    swiper: swiper2,
  },
  breakpoints: {
    899: {
      centeredSlides: true,
      slidesPerView: 1.36,
    },
  },
})
