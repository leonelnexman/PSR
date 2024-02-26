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
