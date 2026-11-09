document.addEventListener('DOMContentLoaded', () => {
  // Responsive navigation menu.
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Menu category dropdown and item search.
  const menu = document.querySelector('#menuContent');
  if (menu) {
    const toggle = document.querySelector('#categoryToggle');
    const options = document.querySelector('#categoryOptions');
    const selectedLabel = document.querySelector('#selectedCategory');
    const optionButtons = [...document.querySelectorAll('.category-options [data-category]')];
    const search = document.querySelector('#menuSearch');
    const status = document.querySelector('#menuStatus');
    const countLabel = document.querySelector('#resultCount');
    const clear = document.querySelector('#clearSearch');
    const noResults = document.querySelector('#noResults');
    const sections = [...menu.querySelectorAll('.menu-section')];
    let activeCategory = 'all';

    function updateMenu() {
      const query = (search?.value || '').trim().toLowerCase();
      let itemCount = 0;
      sections.forEach(section => {
        const categoryMatch = activeCategory === 'all' || section.dataset.category === activeCategory;
        const items = [...section.querySelectorAll('.menu-item')];
        let sectionHasVisibleItem = false;
        items.forEach(item => {
          const visible = categoryMatch && item.textContent.toLowerCase().includes(query);
          item.hidden = !visible;
          if (visible) { itemCount++; sectionHasVisibleItem = true; }
        });
        section.hidden = !sectionHasVisibleItem;
      });
      if (status) status.hidden = !query;
      if (countLabel) countLabel.textContent = `${itemCount} matching menu item${itemCount === 1 ? '' : 's'}`;
      if (noResults) noResults.hidden = itemCount !== 0;
    }

    function closeOptions() {
      if (options) options.hidden = true;
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    toggle?.addEventListener('click', () => {
      const opening = options.hidden;
      options.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
    });
    optionButtons.forEach(button => button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      selectedLabel.textContent = button.textContent;
      optionButtons.forEach(option => option.setAttribute('aria-selected', String(option === button)));
      closeOptions();
      updateMenu();
    }));
    search?.addEventListener('input', updateMenu);
    clear?.addEventListener('click', () => { search.value = ''; search.focus(); updateMenu(); });
    const params = new URLSearchParams(location.search);
    if (search && params.has('q')) search.value = params.get('q');
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash && sections.some(section => section.id === hash)) {
      activeCategory = sections.find(section => section.id === hash).dataset.category;
      const selected = optionButtons.find(button => button.dataset.category === activeCategory);
      if (selected) {
        selectedLabel.textContent = selected.textContent;
        optionButtons.forEach(option => option.setAttribute('aria-selected', String(option === selected)));
      }
    }
    updateMenu();
  }

  // Review form modal and local-only preview submission (not connected to a server).
  const modal = document.querySelector('#reviewModal');
  const openReview = document.querySelector('#openReview');
  const closeReview = document.querySelector('#closeReview');
  const reviewForm = document.querySelector('#reviewForm');
  const reviewList = document.querySelector('#reviewList');
  let selectedRating = 0;
  const stars = [...document.querySelectorAll('[data-rating]')];
  function setModal(open) {
    if (!modal) return;
    modal.hidden = !open;
    openReview?.setAttribute('aria-expanded', String(open));
    if (open) document.querySelector('#reviewName')?.focus();
  }
  openReview?.addEventListener('click', () => setModal(true));
  closeReview?.addEventListener('click', () => setModal(false));
  modal?.addEventListener('click', event => { if (event.target === modal) setModal(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal && !modal.hidden) setModal(false); });
  stars.forEach(star => star.addEventListener('click', () => {
    selectedRating = Number(star.dataset.rating);
    stars.forEach(item => item.classList.toggle('selected', Number(item.dataset.rating) <= selectedRating));
  }));
  reviewForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!selectedRating) { alert('Please select a star rating.'); return; }
    const name = document.querySelector('#reviewName').value.trim();
    const dish = document.querySelector('#reviewDish').value.trim();
    const review = document.querySelector('#reviewText').value.trim();
    const card = document.createElement('article');
    card.className = 'posted-review';
    const title = document.createElement('h3'); title.textContent = name;
    const rating = document.createElement('p'); rating.textContent = '★'.repeat(selectedRating) + '☆'.repeat(5-selectedRating) + (dish ? ` · ${dish}` : '');
    const body = document.createElement('p'); body.textContent = review;
    card.append(title, rating, body);
    reviewList?.prepend(card);
    document.querySelector('#emptyReviews')?.remove();
    reviewForm.reset(); selectedRating = 0; stars.forEach(item => item.classList.remove('selected'));
    setModal(false);
    alert('Your review was added to this wireframe preview only. It is not saved to the live website.');
  });
});
