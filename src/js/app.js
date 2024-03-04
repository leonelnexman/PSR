import { gsap } from "gsap";
import "./components/modal"
import "./components/header"
import "./components/form-check"
import "./components/input-floating-label"
import "./components/textarea-auto-resize"
import "./components/slider-cases"
import "./components/tabs"
import "./components/wave-card"
import "./components/accordionGsap"
import "./components/slider-default"
import "./components/slider-recommendations"
import "./components/button-tumbler"
import "./components/lang-switcher"
import "./components/video-gallery"
import "./components/slider-video-reviews"
import "./components/products-filters"
import "./components/select"
import "./components/slider-entry"
import "./components/slider-thumbnail"
import "./components/back-to-top"
import "./components/param-table-more"
import "./components/docs-page-nav"
import "./components/search"
import "./components/slider-modal-reviews"
import "./components/star-input"
import "./components/sectionactive"

// document.querySelector('.loader-overlay').classList.remove('is-visible')

const cookie = document.querySelector('.cookie');
if (cookie) {
  const button = cookie.querySelector('.js-cookie-approve')
  const cookieApproved = localStorage.getItem("cookie")

  if (!cookieApproved) {

    gsap.to(cookie, {
      delay: 2,
      yPercent: 0,
      y: 0,
      ease: "power1.out",
    })

    button.addEventListener('click', (e) => {
      e.preventDefault()

      localStorage.setItem("cookie", true);

      gsap.to(cookie, {
        yPercent: 100,
        ease: "power1.out",
        onComplete: () => {
          cookie.remove()
        }
      })
    })
  } else {
    cookie.remove()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.menu-page__link');

  function setActiveLink(sectionId) {
      sections.forEach(link => {
          if (link.getAttribute('href') === sectionId) {
              link.classList.add('active');
              if (window.innerWidth <= 962) {
                  link.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
          } else {
              link.classList.remove('active');
          }
      });
  }

  function isInViewport(element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  document.addEventListener('scroll', () => {
      sections.forEach(link => {
          const sectionId = link.getAttribute('href');
          const section = document.querySelector(sectionId);
          if (section) {
              if (isInViewport(section)) {
                  setActiveLink(sectionId);
              } else if (link.classList.contains('active') && window.innerWidth <= 962) {
                  link.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
          }
      });
  });
});
