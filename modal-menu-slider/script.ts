const $toggle = document.getElementById('toggle') as HTMLElement;
const $close = document.getElementById('close') as HTMLElement;
const $open = document.getElementById('open') as HTMLElement;
const $modal = document.getElementById('modal') as HTMLElement;

// Toggle nav
$toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
$open.addEventListener('click', () => $modal.classList.add('show-modal'));

// Hide modal
$close.addEventListener('click', () => $modal.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', (e) =>
  e.target === $modal ? $modal.classList.remove('show-modal') : false
);
