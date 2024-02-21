const inputs = document.querySelectorAll('.js-star-input')

inputs.forEach(item => {
  const input = item.querySelector('input')
  const stars = item.querySelectorAll('svg')

  stars.forEach((star, index)=> {
    star.addEventListener('click', () => {
      stars.forEach((s,j) => {
        s.classList[j <= index ? 'add' : 'remove']('is-active')
      })
      input.value = `${index + 1}`
    })

    star.addEventListener('mouseenter', () => {
      stars.forEach((s,j) => {
        s.classList[j <= index ? 'add' : 'remove']('is-hover')
      })
    })

    star.addEventListener('mouseleave', () => {
      stars.forEach((s,j) => {
        s.classList.remove('is-hover')
      })
    })
  })
})
