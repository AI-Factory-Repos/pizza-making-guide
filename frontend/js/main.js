/**
 * Dropdown Component System
 * Provides expand/collapse behaviour with smooth animation,
 * ARIA attribute management, and full keyboard navigation.
 */

(function () {
  'use strict';

  /**
   * Initialise a single dropdown element.
   * @param {HTMLElement} dropdown - Element with [data-dropdown] attribute.
   */
  function initDropdown(dropdown) {
    const trigger = dropdown.querySelector('.dropdown__trigger');
    const body = dropdown.querySelector('.dropdown__body');

    if (!trigger || !body) return;

    // Ensure initial closed state is correctly reflected
    body.style.maxHeight = '0px';
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', () => toggleDropdown(dropdown, trigger, body));

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown(dropdown, trigger, body);
      }
    });
  }

  /**
   * Toggle the open/closed state of a dropdown.
   * @param {HTMLElement} dropdown
   * @param {HTMLElement} trigger
   * @param {HTMLElement} body
   */
  function toggleDropdown(dropdown, trigger, body) {
    const isOpen = dropdown.classList.contains('dropdown--open');

    if (isOpen) {
      closeDropdown(dropdown, trigger, body);
    } else {
      openDropdown(dropdown, trigger, body);
    }
  }

  /**
   * Open a dropdown with animation.
   * @param {HTMLElement} dropdown
   * @param {HTMLElement} trigger
   * @param {HTMLElement} body
   */
  function openDropdown(dropdown, trigger, body) {
    dropdown.classList.add('dropdown--open');
    trigger.setAttribute('aria-expanded', 'true');

    // Measure the natural height of the content before animating
    body.style.maxHeight = 'none';
    const fullHeight = body.scrollHeight;
    body.style.maxHeight = '0px';

    // Force reflow so the transition fires from 0
    // eslint-disable-next-line no-unused-expressions
    body.offsetHeight;

    body.style.maxHeight = fullHeight + 'px';

    body.addEventListener('transitionend', function onTransitionEnd() {
      // Allow the body to grow if content size changes (e.g. nested dropdowns)
      if (dropdown.classList.contains('dropdown--open')) {
        body.style.maxHeight = 'none';
      }
      body.removeEventListener('transitionend', onTransitionEnd);
    });
  }

  /**
   * Close a dropdown with animation.
   * @param {HTMLElement} dropdown
   * @param {HTMLElement} trigger
   * @param {HTMLElement} body
   */
  function closeDropdown(dropdown, trigger, body) {
    // Snap max-height back to a pixel value so CSS transition can animate from it
    body.style.maxHeight = body.scrollHeight + 'px';

    // Force reflow
    // eslint-disable-next-line no-unused-expressions
    body.offsetHeight;

    body.style.maxHeight = '0px';
    dropdown.classList.remove('dropdown--open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  /**
   * Initialise all dropdowns on the page.
   */
  function initAllDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(initDropdown);
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllDropdowns);
  } else {
    initAllDropdowns();
  }

  // Expose API for programmatic usage if needed
  window.DropdownSystem = {
    init: initAllDropdowns,
    open: openDropdown,
    close: closeDropdown,
    toggle: toggleDropdown,
  };
}());
