const switcher = document.querySelector('.lang-switcher')
const switcherTrigger = document.querySelector('.lang-switcher')
const switcherActiveLangTrigger = document.querySelector('.lang-switcher__list .is-active')

const closeIfClickedOutside = (event) => {
  if (
    !event.target.closest(".lang-switcher")
  ) {
    switcher.classList.remove('is-active')
    document.removeEventListener("click", closeIfClickedOutside);
  }
};

switcherTrigger.addEventListener('click', () => {
  if (switcher.classList.contains('is-active')) {
    switcher.classList.remove('is-active')
    document.removeEventListener("click", closeIfClickedOutside);
  } else {
    switcher.classList.add('is-active')
    document.addEventListener("click", closeIfClickedOutside);
  }
})


// eslint-disable-next-line import/prefer-default-export
export const closeLangSwitcher = () => {
  switcher.classList.remove('is-active')
  document.removeEventListener("click", closeIfClickedOutside);
}

// switcherActiveLangTrigger.addEventListener('click', () => {
//   closeLangSwitcher()
// })


document.addEventListener("DOMContentLoaded", () => {
  const langSwitchers = document.querySelectorAll('.lang-switcher');

  langSwitchers.forEach(langSwitcher => {
    langSwitcher.addEventListener('click', () => {
      langSwitchers.forEach(item => {
        item.classList.remove('is-active');
      });
      langSwitcher.classList.add('is-active');
    });
  });
});
