const tabs = document.querySelectorAll('.tabs')

tabs.forEach(tab => {
  const active = tab.querySelector('.js-tab-trigger.is-active')
  const items = tab.querySelectorAll('.js-tab-trigger')
  const tabsContent = tab.querySelectorAll('.js-tab-content');

  const changeTabsActive = (el) => {
    const activeTab = Number(el.dataset.tab);

    tab.querySelector('.js-tab-trigger.is-active').classList.remove('is-active')
    el.classList.add('is-active')

    tabsContent.forEach(item => {
      const data = Number(item.dataset.tab)
      if (data === activeTab) {
        item.classList.add('is-active')

      } else {
        item.classList.remove('is-active')
      }
    })
  }

  changeTabsActive(active)

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      changeTabsActive(e.target)
    })
  })
})
