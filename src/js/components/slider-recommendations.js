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


function adjustSlides(swiperElement) {
  const slidesContainer = swiperElement.querySelector('.swiper-wrapper');
  if (!slidesContainer) return;

  const slides = Array.from(slidesContainer.children);

  if (window.innerWidth < 962) {
    const sixthSlide = slides.splice(5, 1)[0];
    slides.splice(5, 0, sixthSlide);
  } else {
    const sixthSlide = slides.splice(3, 1)[0];
    slides.splice(5, 0, sixthSlide);
  }

  for (let i = 6; i < slides.length; i++) {
    slides[i].classList.add('hidden');
  }
}

const swiperElement = document.querySelector('.mySwiper');
if (swiperElement) {
  const swiper = new Swiper(swiperElement, {
    spaceBetween: 8,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      962: {
        slidesPerView: 6,
      },
      200: {
        slidesPerView: 4,
        spaceBetween: 10,
      }
    },
  });

  window.addEventListener('resize', () => {
    adjustSlides(swiperElement);
  });

  adjustSlides(swiperElement);
}

const swiper2Element = document.querySelector('.mySwiper2');
if (swiper2Element) {
  const swiper = new Swiper(swiper2Element, {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: ".swiperthumbs__next",
      prevEl: ".swiperthumbs__prev",
    },
    thumbs: {
      swiper: swiperElement || undefined,
    },
  });
}
