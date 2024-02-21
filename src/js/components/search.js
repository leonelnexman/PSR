const search = document.querySelector('.js-search-documents')
const searchInput = document.querySelector('.js-search-documents input')

let searchActive = false;
let oldValue = ''

const keyDownClose = (e) => {
  if (e.key === 'Escape') {
    search.classList.remove('is-active')
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener("click", closeIfClickedOutside);
    document.removeEventListener('keydown', keyDownClose)
    searchActive = false
  }
}

const closeIfClickedOutside = (event) => {
  if (
    !event.target.closest(".header-search")
    && !event.target.closest(".search-mob-trigger")
  ) {
    search.classList.remove('is-active')
    document.removeEventListener("click", closeIfClickedOutside);
    document.removeEventListener('keydown', keyDownClose)
    searchActive = false
  }
};

document.addEventListener("scroll", () => {
  if (searchActive) {
    search.classList.remove('is-active')
    document.removeEventListener("click", closeIfClickedOutside);
    document.removeEventListener('keydown', keyDownClose)
    searchActive = false
  }
})

const getSearchResult = async (val) => {
  const formData = new FormData();

  formData.append('action', 'ba_ajax_search');
  formData.append('term', val);

  const response = await fetch('/wp-admin/admin-ajax.php', {
    method: 'POST',
    body: formData
  })

  if(!response.ok){
    const message = `An error occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

const renderResult = (data) => {
  const resultWrapper = document.querySelector('.docs-search .result-search-list')

  if (data.html) {
    resultWrapper.classList.add('is-active')
  } else {
    resultWrapper.classList.remove('is-active')
  }
  resultWrapper.innerHTML = data.html ?? ''
}

search?.addEventListener('click', () => {
  search.classList.add('is-active')
  document.addEventListener("click", closeIfClickedOutside);
  document.addEventListener('keydown', keyDownClose)

  searchInput.focus()
  searchActive = true
})

searchInput?.addEventListener('input', () => {
  search.classList.add('is-active')
  document.querySelector('.docs-search .result-search-list').classList.add('is-active')
})

const debounce = (callback, time) => {
  let debounceTimer;
  return (e) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback.bind(null, e), time);
  };
};

const handleInput = async () => {
  const val = searchInput.value.trim()

  if (val.length > 0) {
    search.classList.add('is-not-empty')
  } else {
    search.classList.remove('is-not-empty')
  }

  if (val === oldValue) return
  if (val.length < 2) {
    renderResult({})
    return
  }

  const data = await getSearchResult(val)

  renderResult(data)

  oldValue = val
}

searchInput?.addEventListener('input', debounce(handleInput, 300))
