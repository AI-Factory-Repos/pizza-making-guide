/* =============================================
   Pizza Making Guide — Main JS
   ============================================= */

(function () {
  'use strict';

  /**
   * Accordion component
   * Each .accordion-item contains:
   *   - .accordion-header  (button, aria-expanded, aria-controls)
   *   - .accordion-panel   (div, id, hidden attribute)
   */
  function initAccordion () {
    const accordion = document.getElementById('toppings-accordion');
    if (!accordion) return;

    const headers = accordion.querySelectorAll('.accordion-header');

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const panelId    = header.getAttribute('aria-controls');
        const panel      = document.getElementById(panelId);

        if (!panel) return;

        if (isExpanded) {
          // Collapse
          collapsePanel(header, panel);
        } else {
          // Expand
          expandPanel(header, panel);
        }
      });

      // Keyboard: Space / Enter already trigger click on <button>.
      // Add arrow-key navigation between headers.
      header.addEventListener('keydown', function (e) {
        const allHeaders = Array.from(accordion.querySelectorAll('.accordion-header'));
        const idx = allHeaders.indexOf(header);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = allHeaders[idx + 1] || allHeaders[0];
          next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = allHeaders[idx - 1] || allHeaders[allHeaders.length - 1];
          prev.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          allHeaders[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          allHeaders[allHeaders.length - 1].focus();
        }
      });
    });
  }

  function expandPanel (header, panel) {
    header.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');

    // Animate height from 0 → scrollHeight using max-height trick
    panel.classList.remove('is-open');
    // Force reflow so transition plays
    void panel.offsetHeight;
    panel.classList.add('is-open');
  }

  function collapsePanel (header, panel) {
    header.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');

    // Hide after transition ends
    panel.addEventListener('transitionend', function handler () {
      if (header.getAttribute('aria-expanded') === 'false') {
        panel.setAttribute('hidden', '');
      }
      panel.removeEventListener('transitionend', handler);
    });
  }

  /**
   * Smooth-scroll for anchor nav links
   */
  function initSmoothScroll () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetId = link.getAttribute('href').slice(1);
        const target   = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Move focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // Boot
  document.addEventListener('DOMContentLoaded', function () {
    initAccordion();
    initSmoothScroll();
  });

}());
