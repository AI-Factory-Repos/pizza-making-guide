/* ============================================================
   Pizza Making Guide — Main JS
   Handles: timing controls, interactive countdown timer,
            doneness indicators UI
============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Timer State
  ---------------------------------------------------------- */
  let totalSeconds   = 0;   // duration chosen by user (seconds)
  let remainingSeconds = 0;
  let timerInterval  = null;
  let isRunning      = false;
  let isPaused       = false;

  /* ----------------------------------------------------------
     DOM References
  ---------------------------------------------------------- */
  const styleCards       = document.querySelectorAll('.style-card');
  const selectBtns       = document.querySelectorAll('.select-style-btn');

  const timerWidget      = document.getElementById('timer-widget');
  const timerStyleLabel  = document.getElementById('timer-style-label');
  const timerRangeSel    = document.getElementById('timer-range-selector');
  const timerSlider      = document.getElementById('timer-duration');
  const timerMinLabel    = document.getElementById('timer-min-label');
  const timerMaxLabel    = document.getElementById('timer-max-label');
  const timerSelMinutes  = document.getElementById('timer-selected-minutes');

  const timerDisplay     = document.getElementById('timer-display');
  const timerClock       = document.getElementById('timer-clock');
  const timerProgressFill = document.getElementById('timer-progress-fill');

  const timerControls    = document.getElementById('timer-controls');
  const startBtn         = document.getElementById('timer-start-btn');
  const pauseBtn         = document.getElementById('timer-pause-btn');
  const resetBtn         = document.getElementById('timer-reset-btn');

  const timerStatus      = document.getElementById('timer-status');
  const toast            = document.getElementById('toast');

  /* ----------------------------------------------------------
     Utility: format seconds -> M:SS
  ---------------------------------------------------------- */
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  /* ----------------------------------------------------------
     Utility: show toast
  ---------------------------------------------------------- */
  let toastTimeout = null;
  function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ----------------------------------------------------------
     Select Pizza Style
  ---------------------------------------------------------- */
  function selectStyle(btn) {
    const min   = parseInt(btn.dataset.min, 10);
    const max   = parseInt(btn.dataset.max, 10);
    const label = btn.dataset.label;
    const mid   = Math.round((min + max) / 2);

    // Reset running timer before changing style
    stopAndResetTimer();

    // Highlight active card
    styleCards.forEach(c => c.classList.remove('active'));
    const parentCard = btn.closest('.style-card');
    if (parentCard) parentCard.classList.add('active');

    // Update timer label
    timerStyleLabel.textContent = `${label} — ${min}–${max} min`;

    // Configure slider
    timerSlider.min   = min;
    timerSlider.max   = max;
    timerSlider.value = mid;
    timerMinLabel.textContent = min;
    timerMaxLabel.textContent = max;
    timerSelMinutes.textContent = mid;

    // Update clock display
    totalSeconds     = mid * 60;
    remainingSeconds = totalSeconds;
    timerClock.textContent = formatTime(remainingSeconds);
    timerClock.className = 'timer-clock';
    timerProgressFill.style.width = '0%';
    timerProgressFill.className = 'timer-progress-fill';
    timerStatus.textContent = '';

    // Show controls
    timerRangeSel.hidden  = false;
    timerDisplay.hidden   = false;
    timerControls.hidden  = false;

    startBtn.disabled  = false;
    pauseBtn.disabled  = true;

    timerWidget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ----------------------------------------------------------
     Slider change
  ---------------------------------------------------------- */
  timerSlider.addEventListener('input', () => {
    if (isRunning || isPaused) return; // Don't allow mid-run changes
    const mins = parseInt(timerSlider.value, 10);
    timerSelMinutes.textContent = mins;
    totalSeconds     = mins * 60;
    remainingSeconds = totalSeconds;
    timerClock.textContent = formatTime(remainingSeconds);
    timerProgressFill.style.width = '0%';
  });

  /* ----------------------------------------------------------
     Timer: Start
  ---------------------------------------------------------- */
  function startTimer() {
    if (isRunning) return;

    if (!isPaused) {
      // Fresh start
      const mins   = parseInt(timerSlider.value, 10);
      totalSeconds = mins * 60;
      remainingSeconds = totalSeconds;
    }

    isRunning = true;
    isPaused  = false;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    timerStatus.textContent = '';
    timerSlider.disabled = true;

    timerInterval = setInterval(tick, 1000);
  }

  /* ----------------------------------------------------------
     Timer: Tick
  ---------------------------------------------------------- */
  function tick() {
    if (remainingSeconds <= 0) {
      timerDone();
      return;
    }

    remainingSeconds--;
    const elapsed  = totalSeconds - remainingSeconds;
    const progress = (elapsed / totalSeconds) * 100;

    timerClock.textContent = formatTime(remainingSeconds);
    timerProgressFill.style.width = `${progress}%`;

    // Warning at last 25%
    const warningThreshold = Math.floor(totalSeconds * 0.25);
    if (remainingSeconds <= warningThreshold && remainingSeconds > 0) {
      timerClock.className       = 'timer-clock warning';
      timerProgressFill.className = 'timer-progress-fill warning';
    } else {
      timerClock.className       = 'timer-clock';
      timerProgressFill.className = 'timer-progress-fill';
    }
  }

  /* ----------------------------------------------------------
     Timer: Done
  ---------------------------------------------------------- */
  function timerDone() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    isPaused  = false;

    remainingSeconds = 0;
    timerClock.textContent      = '0:00';
    timerClock.className        = 'timer-clock done';
    timerProgressFill.style.width = '100%';
    timerProgressFill.className = 'timer-progress-fill done';

    startBtn.disabled = true;
    pauseBtn.disabled = true;
    timerSlider.disabled = false;

    timerStatus.textContent = '🍕 Time\'s up! Check your pizza now.';
    showToast('🍕 Timer done! Check your pizza now.', 5000);

    // Scroll doneness section into view
    const donenessSection = document.getElementById('doneness-section');
    if (donenessSection) {
      setTimeout(() => donenessSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 800);
    }
  }

  /* ----------------------------------------------------------
     Timer: Pause
  ---------------------------------------------------------- */
  function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    isPaused  = true;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    timerStatus.textContent = '⏸ Paused';
  }

  /* ----------------------------------------------------------
     Timer: Reset
  ---------------------------------------------------------- */
  function stopAndResetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    isPaused  = false;

    remainingSeconds = 0;
    timerClock.textContent = formatTime(0);
    timerClock.className   = 'timer-clock';
    timerProgressFill.style.width = '0%';
    timerProgressFill.className   = 'timer-progress-fill';
    timerStatus.textContent = '';

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    timerSlider.disabled = false;
  }

  function resetTimer() {
    stopAndResetTimer();
    const mins = parseInt(timerSlider.value, 10);
    totalSeconds     = mins * 60;
    remainingSeconds = totalSeconds;
    timerClock.textContent = formatTime(remainingSeconds);
  }

  /* ----------------------------------------------------------
     Event Listeners
  ---------------------------------------------------------- */
  selectBtns.forEach(btn => {
    btn.addEventListener('click', () => selectStyle(btn));
  });

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  /* ----------------------------------------------------------
     Keyboard: Space to start/pause when timer is visible
  ---------------------------------------------------------- */
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && timerControls && !timerControls.hidden) {
      // Avoid triggering when user is typing in inputs
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      e.preventDefault();
      if (isRunning) {
        pauseTimer();
      } else if (!startBtn.disabled) {
        startTimer();
      }
    }
  });

})();
