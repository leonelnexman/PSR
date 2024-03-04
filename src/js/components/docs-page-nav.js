document.addEventListener('DOMContentLoaded', () => {
  const itemTops = document.querySelectorAll('.menu-sidebar__item-top');
  const subitemTops = document.querySelectorAll('.menu-sidebar__subitem-top');

  function closeItems() {
      itemTops.forEach((item) => {
          const parentItem = item.closest('.menu-sidebar__item');
          const itemContent = parentItem.querySelector('.menu-sidebar__item-content');
          itemContent.style.maxHeight = '0px';
          item.classList.remove('nav-open');
      });

      subitemTops.forEach((item) => {
          const parentItemTop = item.closest('.menu-sidebar__subitem-top');
          const parentItem = parentItemTop.closest('.menu-sidebar__subitem');
          const itemContent = parentItem.querySelector('.menu-sidebar__subitem-content');
          itemContent.style.maxHeight = '0px';
          parentItemTop.classList.remove('sub-open');
      });
  }

  function handleItemClick() {
      const parentItem = this.closest('.menu-sidebar__item');
      const itemContent = parentItem.querySelector('.menu-sidebar__item-content');

      if (itemContent.offsetHeight > 0) {
          itemContent.style.maxHeight = '0px';
          this.classList.remove('nav-open');
      } else {
          itemContent.style.maxHeight = `${itemContent.scrollHeight}px`;
          this.classList.add('nav-open');
      }
  }

  function handleSubitemClick() {
      const parentItemTop = this.closest('.menu-sidebar__subitem-top');
      const parentItem = parentItemTop.closest('.menu-sidebar__subitem');
      const itemContent = parentItem.querySelector('.menu-sidebar__subitem-content');

      parentItem.classList.toggle('open');

      if (parentItemTop.classList.contains('sub-open')) {
          parentItemTop.classList.remove('sub-open');
      } else {
          parentItemTop.classList.add('sub-open');
      }

      if (itemContent.offsetHeight > 10) {
          itemContent.style.maxHeight = '0px';
      } else {
          itemContent.style.maxHeight = `${itemContent.scrollHeight}px`;

          let currentParent = parentItem;
          while (currentParent) {
              const parentContentItem = currentParent.querySelector('.menu-sidebar__subitem-content');
              if (parentContentItem) {
                  parentContentItem.style.maxHeight = `${parentContentItem.scrollHeight}px`;
              }

              currentParent = currentParent.parentElement.closest('.menu-sidebar__subitem');
          }

          const parentSideItem = this.closest('.menu-sidebar__item').querySelector('.menu-sidebar__item-content');
          if (parentSideItem) {
              parentSideItem.style.maxHeight = `${parentSideItem.scrollHeight}px`;
          }
      }
  }

  itemTops.forEach((item) => {
      item.addEventListener('click', handleItemClick);
  });

  subitemTops.forEach((item) => {
      item.addEventListener('click', handleSubitemClick);
  });

  const screenWidth = window.innerWidth;
  if (screenWidth < 1050) {
      closeItems();
  } else {
      itemTops.forEach((item) => {
          const parentItem = item.closest('.menu-sidebar__item');
          const itemContent = parentItem.querySelector('.menu-sidebar__item-content');
          itemContent.style.maxHeight = `${itemContent.scrollHeight}px`;
          item.classList.add('nav-open');
      });
  }
});






document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu-page__link');

  links.forEach((link) => {
      link.addEventListener('click', (event) => {

          links.forEach((otherLink) => {
              otherLink.classList.remove('active');
          });
          link.classList.add('active');
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.docs-sidebar__hamburger');
  const sidebar = document.querySelector('.docs-sidebar');
  const hamburgerText = document.querySelector('.docs-sidebar-hamburger__text');

  if (hamburger && sidebar && hamburgerText) {
      hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('is-active');
          sidebar.classList.toggle('is-active');
          hamburgerText.textContent = hamburger.classList.contains('is-active') ? 'Close' : 'Menu';
      });
  }
});

// const triggers = document.querySelectorAll('.docs-nav-item--has-child')
// triggers.forEach(item => {
//   const trigger = item.querySelector('.docs-nav-item__inner')
//   trigger.addEventListener('click', () => {
//     if (item.classList.contains('is-active')) {
//       item.classList.remove('is-active')
//       trigger.classList.remove('is-active')
//     } else {
//       item.classList.add('is-active')
//       trigger.classList.add('is-active')
//     }
//   })
// })

// const docsNavHamburger = document.querySelector('.js-docs-nav-trigger')
// docsNavHamburger?.addEventListener('click', () => {
//   docsNavHamburger.closest('.docs-sidebar').classList.toggle('is-active')
//   docsNavHamburger.classList.toggle('is-active')
// })

