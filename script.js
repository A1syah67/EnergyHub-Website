// =====================================================
// EnergyHub — shared site behaviour
// Handles: current-page highlighting, mobile nav toggle,
// JS-driven page swapping from the nav, footer year.
// =====================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Identify the current page from the filename ----
  var path = window.location.pathname.split('/').pop();
  if (path === '' || path === 'index.html') {
    path = 'index.html';
  }

  // ---- Mark the matching nav link as current, and wire up
  //      JS-based navigation for every nav link ----
  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute('data-page');

    if (linkPage === path) {
      link.setAttribute('aria-current', 'page');
    }

    link.addEventListener('click', function (e) {
      e.preventDefault();
      goToPage(link.getAttribute('href'));
    });
  });

  // ---- Logo also returns to home via JS ----
  var brandLink = document.querySelector('.brand');
  if (brandLink) {
    brandLink.addEventListener('click', function (e) {
      e.preventDefault();
      goToPage('index.html');
    });
  }

  // ---- Mobile menu toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---- Footer year, filled in by JS ----
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Swaps the browser to another page in the site.
function goToPage(href) {
  window.location.href = href;
}