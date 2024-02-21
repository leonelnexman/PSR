const productsLoadMore = document.querySelectorAll('.js-products-load-more')

const getData = (filters) => {
  const url = `products?filters=${filters}`

  const data = null

  return data
}

const loadMoreProducts = (group, parent) => {
  if (!group) return

  // get data
  const data = getData(group)

  if (data) {
    parent?.querySelector('.market-products-group__list')?.insertAdjacentHTML('beforeend', data)
  }
}

productsLoadMore.forEach(trigger => {
  const groupParent = trigger.closest('.market-products-group')
  const { productsGroup } = trigger.dataset

  trigger.addEventListener('click', (e) => {
    e.preventDefault()

    loadMoreProducts(productsGroup, groupParent)
  })
})

const checkboxes = document.querySelectorAll('.js-products-category-filter')
let filters = [];

const setFilters = () => {
  filters = []
  checkboxes.forEach(item => {
    if (item.checked) {
      filters.push(item.value)
    }
  })
}

const loadCategoryProducts = () => {
  const data = getData(filters)
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    setFilters()
    loadCategoryProducts()
  })
})

const searchInput = document.querySelector('.js-search-products')
let oldValue = ''

const debounce = (callback, time) => {
  let debounceTimer;
  return (e) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback.bind(null, e), time);
  };
};

const handleInput = async () => {
  const val = searchInput.value.trim()

  if (val === oldValue) return
  if (val.length < 2) {
    // renderResult({})
    return
  }

  // const data = await getSearchResult(val)
  //
  // renderResult(data)

  oldValue = val
}

searchInput?.addEventListener('input', debounce(handleInput, 300))
