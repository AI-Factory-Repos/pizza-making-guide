/* =========================================
   Pizza Making Guide — Main JS
   ========================================= */

(function () {
  'use strict';

  /* --------------------------------------------------
     Video labels map — maps data-video-id to a human-
     readable title shown in the modal header.
  -------------------------------------------------- */
  const VIDEO_LABELS = {
    'olive-oil':         'Olive Oil Drizzle — Finishing Technique',
    'fresh-herbs':       'Fresh Herbs — Finishing Technique',
    'final-seasoning':   'Final Seasoning — Finishing Technique',
    'soggy-bottom':      'Soggy Bottom — Problem & Fix',
    'burnt-edges':       'Burnt Edges — Problem & Fix',
    'undercooked-centre':'Undercooked Centre — Problem & Fix',
  };

  /* --------------------------------------------------
     Modal elements
  -------------------------------------------------- */
  const modal         = document.getElementById('video-modal');
  const modalTitle    = document.getElementById('modal-title');
  const modalLabel    = document.getElementById('modal-video-label');
  const modalClose    = modal.querySelector('.video-modal__close');
  const modalBackdrop = modal.querySelector('.video-modal__backdrop');

  /* Element that had focus before the modal opened (for restoration on close) */
  let lastFocusedElement = null;

  /* --------------------------------------------------
     Open modal
  -------------------------------------------------- */
  function openModal(videoId) {
    const label = VIDEO_LABELS[videoId] || 'Video Demonstration';
    modalTitle.textContent = label;
    modalLabel.textContent = label;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  /* --------------------------------------------------
     Close modal
  -------------------------------------------------- */
  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  /* --------------------------------------------------
     Attach play-button click handlers (event delegation)
  -------------------------------------------------- */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.video-play-btn');
    if (!btn) return;

    lastFocusedElement = btn;
    const wrapper = btn.closest('.video-wrapper');
    const videoId = wrapper ? wrapper.dataset.videoId : null;
    openModal(videoId);
  });

  /* --------------------------------------------------
     Close handlers
  -------------------------------------------------- */
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  /* --------------------------------------------------
     Trap focus inside modal while open
  -------------------------------------------------- */
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.disabled);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* --------------------------------------------------
     Smooth scroll active nav link highlight
  -------------------------------------------------- */
  const sections = document.querySelectorAll('.guide-section');
  const navLinks = document.querySelectorAll('.main-nav a');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(s => observer.observe(s));
  }

})();
