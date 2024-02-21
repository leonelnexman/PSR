const inputs = document.querySelectorAll(".input-field input, .input-field textarea")

const isEmpty = str => !str?.trim().length;

const inputFocused = (event) => {
  const $parent = event.target.closest('.input-field')
  const $label = $parent.querySelector('.floating-label');

  $parent.classList.add('is-active')
  $label.classList.add('floating-label--float-above')
}

const inputUnfocused = (event) => {
  const $parent = event.target.closest('.input-field')
  const $label = $parent.querySelector('.floating-label');

  $parent.classList.remove('is-active')

  if (isEmpty(event.target.innerText || event.target.value)) {
    $label.classList.remove('floating-label--float-above')
  }
}

inputs.forEach((el) => {
  if (!isEmpty(el.innerText || el.value)) {
    const $parent = el.closest('.input-field')
    const $label = $parent.querySelector('.floating-label');

    $label.classList.add('floating-label--float-above')
  }
})

inputs.forEach((el) => {
  el.addEventListener("focus", inputFocused)
})

inputs.forEach((el) => {
  el.addEventListener("blur", inputUnfocused)
})

const inputValidation = (event) => {

  if (event.target.type === "tel") {
    // eslint-disable-next-line no-param-reassign
    event.target.value = event.target.value.replace(/[^\d+]+/g,'')
  }
}

inputs.forEach((el) => {
  el.addEventListener("input", inputValidation)
})
