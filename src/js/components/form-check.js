const inputs = document.querySelectorAll('.js-tel-check')

if (inputs.length) {
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const regex2 = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

            if (input.value.match(regex2) && !(input.value.match(/0{5,}/))) {
                // if (!input.value.match(regex2)) {
                const parent = input.closest('.input-field-container')
                parent.querySelector('.input-field-helper-line')?.remove()
                input.classList.remove('is-error')
            } else {
                const parent = input.closest('.input-field-container')
                parent.querySelector('.input-field-helper-line')?.remove()

                input.classList.add('is-error')
                parent.insertAdjacentHTML('beforeend',
                    `<div class="input-field-helper-line">
                            <div class="input-field-helper-text is-danger">
                              Введите корректные данные
                            </div>
                          </div>`
                )
            }

            if (input.value.length === 0) {
                const parent = input.closest('.input-field-container')
                parent.querySelector('.input-field-helper-line')?.remove()
                input.classList.remove('is-error')
            }

            /* const regex = /[^0-9]/
            console.log(input.value.length);
            if (!input.value.length) return

            if (input.value.match(regex)) {
                const parent = input.closest('.input-field-container')
                parent.querySelector('.input-field-helper-line')?.remove()
                // input-field-helper-line
                parent.insertAdjacentHTML('beforeend',
                    `<div class="input-field-helper-line">
                            <div class="input-field-helper-text is-danger">
                              The number is incorrect
                            </div>
                          </div>`
                )
            } else {
                const parent = input.closest('.input-field-container')
                parent.querySelector('.input-field-helper-line')?.remove()
            } */
        })
    })
}

const validateEmail = (email) => String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const inputsEmail = document.querySelectorAll('input[type="email"]')

if (inputsEmail.length) {
    inputsEmail.forEach(input => {
        input.addEventListener('input', () => {
            if (validateEmail(input.value)) {
                input.classList.remove('is-error')
            } else {
                input.classList.add('is-error')
            }
        })
    })
}

const forms = document.querySelectorAll('form')

const validate = (field) => {
    if(field.type === 'tel' && field.classList.contains('is-error')) {
        return false
    }

    if (field.classList.contains('textarea')) {
        return !field.classList.contains('is-error');
    }


    if(field.type === 'tel' && field.classList.contains('is-error')) {
        return false
    }

    if(field.type === 'email' && field.classList.contains('is-error')) {
        return false
    }

    if (!field.value?.trim()) {
        return false
    }

    if (field.textContent.trim().length > 0) {

        return false
    }

    return true
}

if (forms.length) {
    forms.forEach(form => {
        const formData = new FormData(form);
        const formProps = Object.fromEntries(formData);
        const fields = form.querySelectorAll('input:not([type="hidden"]), .textarea');
        const sumbit = form.querySelector('.form__submit button')
        let error = false

        if (!sumbit) return

        fields.forEach(field => {

            if (!validate(field)) {
                error = true
            }

            field.addEventListener('input', event => {
                error = false

                fields.forEach(item => {
                    if (!validate(item)) {
                        error = true
                    }
                })

                if (form.classList.contains('js-pdf-form')
                    && !document.querySelector('.modal__loader').classList.contains('is-loaded')
                ) {
                    error = true
                } else {
                    error = false
                }

                if (!error) {
                    sumbit.disabled = false
                } else {
                    sumbit.disabled = true
                }
            })
        })

        if (form.classList.contains('js-pdf-form')
            && !document.querySelector('.modal__loader').classList.contains('is-loaded')
        ) {
            error = true
        } else {
            error = false
        }

        if (!error) {
            sumbit.disabled = false
        } else {
            sumbit.disabled = true
        }

        form.addEventListener('submit', (e) => {
            e.target.querySelectorAll('.input-field-helper-line').forEach(item => {
                item.remove()
            })
        })
    })
}

const formsList = document.querySelectorAll('[data-form-name]')
formsList.forEach(form => {
  const submitButton = form.querySelector('button[type=submit],input[type=submit]')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    submitButton.disabled = true
    const { formName } = form.dataset
    const formData = new FormData(form);

    form.querySelector('.form-result')?.remove()

    formData.append('action', `ajax_form_${formName}`);

    fetch('/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: formData
    }).then(async (response) => {
      const json = await response.json()

      if (response.ok) {
        // const msg = `<div class="form-result">${json.msg}</div>`
        // form.insertAdjacentHTML('beforeend', msg)

        const container = form.closest('.modal-container')

        if (container) {
          container.querySelector('.js-modal-close').click()
        }

        const containerOld = form.closest('.js-popup')
        if (containerOld) {
          document.querySelector('.js-overlay')?.click()
        }

        const modl = document.querySelector('#modal-accepted');

        if (modl) {
          modl.querySelector('.modal__title').textContent = json.title
          modl.querySelector('.modal__desc').textContent = json.msg
        }

        form.classList.add('is-success')

        form.querySelector('.form__hidden')?.click()

        form.reset()

        return json;
      }

      const msg = `<div class="form-result is-error">${json.msg}</div>`

      form.insertAdjacentHTML('beforeend', msg)

      Object.keys(json.errors).forEach(field => {
        const el = form.querySelector(`[name=${field}]`)
        // const input = el.querySelector('input')
        el.classList.add('is-error')

        const parent = el.closest('.input-field-container')
        parent.querySelector('.input-field-helper-line')?.remove()

        // input.classList.add('is-error')
        parent.insertAdjacentHTML('beforeend',
          `<div class="input-field-helper-line">
                            <div class="input-field-helper-text is-danger">
                              ${json.errors[field]}
                            </div>
                          </div>`
        )
      })

      const err = new Error("Not 2xx response");
      err.response = response;
      throw err;

    }).catch((err) => {
      // There was an error
      console.warn('Something went wrong.', err);
    }).finally(() => {
      submitButton.disabled = false
    });

  })
})
