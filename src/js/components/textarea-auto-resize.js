/* eslint-disable no-param-reassign */
import { gsap } from "gsap";

const autoResize = () => {
    const textarea = document.querySelectorAll('[data-autoresize], .wpcf7-textarea')

    textarea.forEach((element) => {
        element.style.boxSizing = 'border-box';
        const offset = element.offsetHeight - element.clientHeight;

        element.addEventListener('input', (event) => {
            event.target.style.height = 'auto';
            // event.target.style.height = `${event.target.scrollHeight + offset  }px`;

            if (element.innerText.length > 375) {
                const parent = element.closest('.form__field')
                parent.querySelector('.input-field-helper-line')?.remove()


                element.classList.add('is-error')
                parent.insertAdjacentHTML('beforeend',
                    `<div class="input-field-helper-line">
                            <div class="input-field-helper-text is-danger">
                              Не более 375 символов
                            </div>
                          </div>`
                )
            } else {
                const parent = element.closest('.form__field')
                parent.querySelector('.input-field-helper-line')?.remove()
                element.classList.remove('is-error')
            }

            gsap.to(event.target, {
                height: event.target.scrollHeight + offset,
                duration: .4,
                ease: "power1.out",
            })
        });

        element.removeAttribute('data-autoresize');
    });
}

autoResize()
