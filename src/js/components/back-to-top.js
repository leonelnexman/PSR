const init = () => {
  const $trigger = document.querySelector('.js-back-to-top');

  if (!$trigger) return

  let previousScrollPosition = 0;
  const isScrollingDown = () => {
    const scrollPosition = window.scrollY
    const scrollingDown = scrollPosition > previousScrollPosition && scrollPosition > 1000;
    previousScrollPosition = scrollPosition;

    return scrollingDown;
  }

  window.addEventListener(
    "scroll",
    () => $trigger.classList[isScrollingDown() ? "add" : "remove"]("is-visible"),
    { capture: true, passive: true}
  );

  $trigger.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  })
};
init()
