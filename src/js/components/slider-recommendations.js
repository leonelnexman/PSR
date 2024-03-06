import Swiper from 'swiper'
import { Navigation, FreeMode, Thumbs, EffectFade} from 'swiper/modules';

Swiper.use([Navigation, FreeMode, Thumbs, EffectFade ])

const swiperrec = new Swiper('.recommendations__slider', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: false,
  speed: 450,
  preloadImages: false,
  watchOverflow: true,
  slideToClickedSlide: true,
  initialSlide: 0,
  centerInsufficientSlides: true,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: '.recommendations__next',
    prevEl: '.recommendations__prev',
  },
})


const initializeSwiperSlideTwo = element => new Swiper(element, {
  slidesPerView: 2,
  spaceBetween: 30,
  centeredSlides: false,
  speed: 450,
  preloadImages: false,
  watchOverflow: true,
  slideToClickedSlide: true,
  initialSlide: 0,
  centerInsufficientSlides: true,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: element.querySelector('.slider-two-slides__next'),
    prevEl: element.querySelector('.slider-two-slides__prev'),
  },
  breakpoints: {
    200: {
      slidesPerView: 'auto',
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
    }
  }
});

document.querySelectorAll('.slider-two-slides').forEach(element => {
initializeSwiperSlideTwo(element);
});

const initializeSwiperSlideOne = element => new Swiper(element, {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: false,
  speed: 450,
  preloadImages: false,
  watchOverflow: true,
  slideToClickedSlide: true,
  initialSlide: 0,
  centerInsufficientSlides: true,
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    nextEl: element.querySelector('.slider-one-slide__next'),
    prevEl: element.querySelector('.slider-one-slide__prev'),
  },
});

document.querySelectorAll('.slider-one-slide').forEach(element => {
initializeSwiperSlideOne(element);
});


const swiper = new Swiper(".mySwiper", {
  spaceBetween: 8,
  slidesPerView: 6,
  loop: true, // Разрешаем зацикливание
  loopedSlides: 5, // Ограничиваем количество слайдов до первых пяти
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 6,
    }
  },
});

const swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiperthumbs__next",
    prevEl: ".swiperthumbs__prev",
  },
  thumbs: {
    swiper,
  },
});