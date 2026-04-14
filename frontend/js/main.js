/* ============================================================
   Pizza Making Guide — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* --- Smooth scroll polyfill for older browsers ----------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
