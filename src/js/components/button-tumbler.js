const buttons = document.querySelectorAll('.button-tumbler')
buttons.forEach(button => {
  const triggers = button.querySelectorAll('.button-tumbler__item')

  triggers.forEach(item => {
    item.addEventListener('click', () => {
      button.querySelector('.is-active')?.classList.remove('is-active')
      item.classList.add('is-active')
    })
  })
})
