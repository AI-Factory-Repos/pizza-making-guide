/* Pizza Making Guide — Main JS */

document.addEventListener('DOMContentLoaded', () => {
  initTemperatureDial();
  initSmoothScroll();
  initIntersectionAnimations();
});

/**
 * Animates the temperature dial indicator on the preheating step.
 * The dial visually shows 475°F as the optimal setting.
 */
function initTemperatureDial() {
  const indicator = document.getElementById('dialIndicator');
  const tempDisplay = document.getElementById('dialTemp');
  if (!indicator || !tempDisplay) return;

  // Temperature range: 350°F (0%) to 600°F (100%)
  const MIN_TEMP = 350;
  const MAX_TEMP = 600;
  const TARGET_TEMP = 475;

  const pct = ((TARGET_TEMP - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;

  // Animate dial to target position after a short delay
  setTimeout(() => {
    indicator.style.left = `${pct}%`;
  }, 600);

  // Animate temperature counter
  let current = MIN_TEMP;
  const step = Math.ceil((TARGET_TEMP - MIN_TEMP) / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, TARGET_TEMP);
    tempDisplay.textContent = `${current}°F`;
    if (current >= TARGET_TEMP) clearInterval(interval);
  }, 30);
}

/**
 * Smooth scroll for in-page navigation anchors.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/**
 * Fade-in animation for major content cards when they enter the viewport.
 */
function initIntersectionAnimations() {
  const targets = document.querySelectorAll(
    '.temp-card, .equipment-card, .preheat-step, .quick-ref__item'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
    observer.observe(el);
  });

  // Add visible class styles dynamically
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}
