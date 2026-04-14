/**
 * Pizza Making Guide — Navigation & Table of Contents
 * Builds TOC dynamically, highlights active section via IntersectionObserver,
 * and drives a scroll-progress bar.
 */

(function () {
  'use strict';

  // ── 1. Build Table of Contents ──────────────────────────────────────────────
  const sections = Array.from(document.querySelectorAll('.content-section'));
  const tocList  = document.getElementById('toc-list');

  if (!tocList || sections.length === 0) return;

  sections.forEach((section) => {
    const heading = section.querySelector('h2');
    if (!heading) return;

    const id    = section.id;
    const label = heading.textContent.trim();

    const li = document.createElement('li');
    li.dataset.section = id;

    const a = document.createElement('a');
    a.href        = `#${id}`;
    a.textContent = label;
    a.setAttribute('aria-label', `Jump to ${label}`);

    // Smooth scroll with JS (belt-and-suspenders for browsers that honour
    // scroll-behavior:smooth on the html element already).
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without triggering a jump
        history.pushState(null, '', `#${id}`);
      }
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });

  // ── 2. Active-section highlighting via IntersectionObserver ─────────────────
  const tocItems = Array.from(tocList.querySelectorAll('li'));

  // Track which sections are currently intersecting
  const visibleSections = new Set();

  function updateActiveTocItem() {
    // Find the topmost visible section (smallest offsetTop among visible)
    let activeId = null;
    let minTop   = Infinity;

    visibleSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top < minTop) {
          minTop   = top;
          activeId = id;
        }
      }
    });

    // If nothing is intersecting, fall back to the last section above the fold
    if (!activeId) {
      let bestTop = -Infinity;
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= 0 && top > bestTop) {
          bestTop  = top;
          activeId = section.id;
        }
      });
    }

    tocItems.forEach((li) => {
      li.classList.toggle('active', li.dataset.section === activeId);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });
      updateActiveTocItem();
    },
    {
      root      : null,
      // Trigger when a section enters the top 60 % of the viewport
      rootMargin: '0px 0px -40% 0px',
      threshold : 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  // ── 3. Scroll Progress Bar ───────────────────────────────────────────────────
  const progressBar = document.getElementById('progress-bar');

  function updateProgressBar() {
    if (!progressBar) return;
    const scrollTop    = window.scrollY || document.documentElement.scrollTop;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(scrolled, 100)}%`;
  }

  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar(); // initialise on load

  // ── 4. Honour deep-link on page load ────────────────────────────────────────
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      // Short delay lets the browser finish rendering before scrolling
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}());
