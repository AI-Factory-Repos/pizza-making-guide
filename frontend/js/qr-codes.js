/* ============================================================
   QR Code helper — Pizza Making Guide
   Replaces video elements with QR code blocks for print.
   Uses Google Charts QR API (no JS lib dependency).
   ============================================================ */

(function () {
  'use strict';

  /**
   * Build a Google Charts QR-code image URL for a given link.
   * @param {string} url  - The destination URL
   * @param {number} size - Pixel size (square)
   * @returns {string}
   */
  function qrImageUrl(url, size) {
    size = size || 200;
    return (
      'https://chart.googleapis.com/chart?cht=qr&chs=' +
      size + 'x' + size +
      '&chl=' + encodeURIComponent(url) +
      '&choe=UTF-8'
    );
  }

  /**
   * Create and insert a .qr-code-block element after a video wrapper.
   * @param {Element} videoEl - The <video> or containing wrapper element
   * @param {string}  videoUrl - The online URL for the video
   * @param {string}  label    - Human-readable title for the video
   */
  function insertQrBlock(videoEl, videoUrl, label) {
    var block = document.createElement('div');
    block.className = 'qr-code-block';
    block.setAttribute('aria-hidden', 'true');

    var img = document.createElement('img');
    img.src = qrImageUrl(videoUrl, 200);
    img.alt = 'QR code linking to: ' + label;
    img.width = 100;
    img.height = 100;

    var labelEl = document.createElement('p');
    labelEl.className = 'qr-label';
    labelEl.textContent = '\uD83C\uDFA5 ' + (label || 'Watch video online');

    var caption = document.createElement('p');
    caption.className = 'qr-caption';
    caption.textContent = videoUrl;

    block.appendChild(img);
    block.appendChild(labelEl);
    block.appendChild(caption);

    // Insert after the video element's container
    var parent = videoEl.parentNode;
    if (parent) {
      parent.insertBefore(block, videoEl.nextSibling);
    }
  }

  /**
   * Process all video elements on the page:
   * - Read data-video-url (or src) and data-video-title attributes
   * - Inject a .qr-code-block sibling for print
   */
  function processVideos() {
    // Handle <video> elements
    var videos = document.querySelectorAll('video[data-video-url], video[src]');
    videos.forEach(function (video) {
      var url = video.getAttribute('data-video-url') || video.getAttribute('src') || '';
      var label = video.getAttribute('data-video-title') || video.getAttribute('title') || 'Video';
      if (url) insertQrBlock(video, url, label);
    });

    // Handle wrapper divs that contain iframes (YouTube embeds, etc.)
    var wrappers = document.querySelectorAll(
      '[data-video-url], .video-wrapper[data-video-url], .video-container[data-video-url]'
    );
    wrappers.forEach(function (wrapper) {
      // Avoid double-processing
      if (wrapper.tagName.toLowerCase() === 'video') return;
      var url = wrapper.getAttribute('data-video-url') || '';
      var label = wrapper.getAttribute('data-video-title') || 'Video';
      if (url) insertQrBlock(wrapper, url, label);
    });

    // Handle plain <iframe> embeds (YouTube, Vimeo)
    var iframes = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
    iframes.forEach(function (iframe) {
      var url = iframe.getAttribute('data-video-url') || convertEmbedToWatch(iframe.src);
      var label = iframe.getAttribute('data-video-title') || iframe.getAttribute('title') || 'Watch Video';
      if (url) insertQrBlock(iframe, url, label);
    });
  }

  /**
   * Convert a YouTube embed URL to a standard watch URL.
   * @param {string} embedUrl
   * @returns {string}
   */
  function convertEmbedToWatch(embedUrl) {
    if (!embedUrl) return '';
    // https://www.youtube.com/embed/VIDEO_ID  ->  https://youtu.be/VIDEO_ID
    var ytMatch = embedUrl.match(/youtube\.com\/embed\/([^?&]+)/);
    if (ytMatch) return 'https://youtu.be/' + ytMatch[1];

    // https://player.vimeo.com/video/VIDEO_ID  ->  https://vimeo.com/VIDEO_ID
    var vimeoMatch = embedUrl.match(/vimeo\.com\/video\/([^?&]+)/);
    if (vimeoMatch) return 'https://vimeo.com/' + vimeoMatch[1];

    return embedUrl;
  }

  /* --- Offline banner -------------------------------------- */
  function showOfflineBanner() {
    if (document.getElementById('offline-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.setAttribute('role', 'status');
    banner.textContent = '\u26A0\uFE0F You are offline. Showing cached content.';
    banner.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0',
      'background:#d97706', 'color:#fff',
      'text-align:center', 'padding:8px 16px',
      'font-size:14px', 'z-index:9999',
      'font-family:sans-serif'
    ].join(';');
    document.body.insertBefore(banner, document.body.firstChild);
  }

  function hideOfflineBanner() {
    var banner = document.getElementById('offline-banner');
    if (banner) banner.remove();
  }

  /* --- Print header / footer injection --------------------- */
  function injectPrintChrome() {
    if (!document.querySelector('.print-header')) {
      var header = document.createElement('div');
      header.className = 'print-header';
      header.innerHTML =
        '<h1>Pizza Making Guide</h1>' +
        '<p>Printed from ' + location.href + ' &mdash; ' + new Date().toLocaleDateString() + '</p>';
      header.style.display = 'none'; // shown only in print via CSS
      document.body.insertBefore(header, document.body.firstChild);
    }

    if (!document.querySelector('.print-footer')) {
      var footer = document.createElement('div');
      footer.className = 'print-footer';
      footer.style.display = 'none'; // shown only in print via CSS
      document.body.appendChild(footer);
    }
  }

  /* --- Register service worker ----------------------------- */
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker
      .register('/frontend/js/service-worker.js')
      .then(function (reg) {
        console.log('[SW] Registered, scope:', reg.scope);
      })
      .catch(function (err) {
        console.warn('[SW] Registration failed:', err);
      });
  }

  /* --- Init ------------------------------------------------ */
  function init() {
    processVideos();
    injectPrintChrome();
    registerServiceWorker();

    // Offline / online event listeners
    if (!navigator.onLine) showOfflineBanner();
    window.addEventListener('offline', showOfflineBanner);
    window.addEventListener('online', hideOfflineBanner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
