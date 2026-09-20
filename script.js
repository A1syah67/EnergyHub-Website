// =====================================================
// EnergyHub — shared site behaviour
// Handles: current-page highlighting, mobile nav toggle,
// JS-driven page navigation, and footer year.
// =====================================================

document.addEventListener('DOMContentLoaded', function () {

  // Identify the current page
  var path = window.location.pathname.split('/').pop();

  if (path === '' || path === 'index.html') {
    path = 'index.html';
  }


  // Navigation links
  var navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(function (link) {

    var linkPage = link.getAttribute('data-page');

    // Highlight the current page
    if (linkPage === path) {
      link.setAttribute('aria-current', 'page');
    }

    // JavaScript navigation
    link.addEventListener('click', function (e) {
      e.preventDefault();

      goToPage(link.getAttribute('href'));
    });

  });


  // Logo returns to Home
  var brandLink = document.querySelector('.brand');

  if (brandLink) {

    brandLink.addEventListener('click', function (e) {
      e.preventDefault();

      goToPage('index.html');
    });

  }


  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {

    toggle.addEventListener('click', function () {

      var isOpen = links.classList.toggle('open');

      toggle.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );

    });

  }


  // Footer year
  var yearEl = document.getElementById('current-year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});


// Navigate to another page
function goToPage(href) {
  window.location.href = href;
}
