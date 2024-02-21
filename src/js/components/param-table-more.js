const moreTriggers = document.querySelectorAll('.js-param-table-more');

moreTriggers.forEach(trigger => {
  const parent = trigger.closest('.param-table')
  const textWrapper = trigger.querySelector('span')
  const { textMore, textLess } = trigger.dataset

  trigger.addEventListener('click', () => {
    parent.classList.toggle('is-open')

    if (parent.classList.contains('is-open')) {
      textWrapper.textContent = textLess
    } else {
      textWrapper.textContent = textMore
    }
  })
})
