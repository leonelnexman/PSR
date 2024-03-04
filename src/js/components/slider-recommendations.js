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


const slidertwo = document.querySelectorAll('.slider-slidetwo');

slidertwo.forEach((slider) => {
  new Swiper(slider, {
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
      nextEl: slider.querySelector('.slider-slidetwo__next'),
      prevEl: slider.querySelector('.slider-slidetwo__prev'),
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
});

const SliderOnes = document.querySelectorAll('.slider-sliderone');

SliderOnes.forEach((slider) => {
  new Swiper(slider, {
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
      nextEl: slider.querySelector('.slider-sliderone__next'),
      prevEl: slider.querySelector('.slider-sliderone__prev'),
    }
  });
});

let allowSlideChange = false;

const slideViews = document.querySelectorAll('.swiper-slide__view');

slideViews.forEach((slideView, index) => {
  slideView.addEventListener('click', function() {
    this.classList.add('opacity');
    allowSlideChange = true; // Разрешаем изменение слайдов после добавления класса opacity
  });
});

const swiper = new Swiper(".mySwiper", {
  spaceBetween: 8,
  slidesPerView: 6,
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
  on: {
    slideChange () {
      if (!allowSlideChange && this.activeIndex > 4) {
        this.slideTo(4); // Переключаемся обратно к пятому слайду
      }
    },
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
  on: {
    slideChange () {
      if (!allowSlideChange && this.activeIndex > 4) {
        this.slideTo(4); // Переключаемся обратно к пятому слайду
      }
    },
  },
});