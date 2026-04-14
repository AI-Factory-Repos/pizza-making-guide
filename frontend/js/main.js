/**
 * Pizza Making Guide — Main JS
 * Handles accordion expand/collapse for the dough section.
 */

(function () {
  'use strict';

  /**
   * Initialise all accordion triggers on the page.
   * Each .accordion-trigger toggles its associated .accordion-panel.
   */
  function initAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        const panelId = this.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        if (!panel) return;

        if (expanded) {
          // Collapse
          this.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        } else {
          // Expand
          this.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });

      // Keyboard: allow Space / Enter to toggle (button already handles Enter natively)
      trigger.addEventListener('keydown', function (e) {
        if (e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }
}());
