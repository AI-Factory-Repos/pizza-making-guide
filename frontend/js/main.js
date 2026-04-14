/**
 * YouTube Video Embed Component
 *
 * Usage:
 *   createYouTubeEmbed(container, videoId, options)
 *
 * Options:
 *   title   {string}  - accessible title for the iframe (default: 'YouTube video')
 *   caption {string}  - optional caption displayed below the player
 */

/**
 * Validates a YouTube video ID.
 * YouTube video IDs are 11 characters consisting of [A-Za-z0-9_-].
 * @param {string} id
 * @returns {boolean}
 */
function isValidYouTubeId(id) {
  return typeof id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id);
}

/**
 * Creates a responsive YouTube embed inside the given container element.
 * Shows a loading placeholder, then renders the iframe or an error message.
 *
 * @param {HTMLElement} container - DOM element to render into
 * @param {string}      videoId  - YouTube video ID
 * @param {Object}      [options]
 * @param {string}      [options.title='YouTube video'] - iframe accessible title
 * @param {string}      [options.caption]               - optional caption text
 */
function createYouTubeEmbed(container, videoId, options = {}) {
  const { title = 'YouTube video', caption = '' } = options;

  // Wrap everything in the outer container div
  const wrapper = document.createElement('div');
  wrapper.className = 'video-embed-container';

  if (!isValidYouTubeId(videoId)) {
    wrapper.appendChild(buildErrorState('Invalid video ID', 'The provided YouTube video ID is not valid. Please check the ID and try again.'));
    if (caption) wrapper.appendChild(buildCaption(caption));
    container.appendChild(wrapper);
    return;
  }

  // Show loading state while iframe loads
  const loadingEl = buildLoadingState();
  wrapper.appendChild(loadingEl);
  if (caption) wrapper.appendChild(buildCaption(caption));
  container.appendChild(wrapper);

  // Build iframe
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;
  iframe.title = title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';

  iframe.addEventListener('load', () => {
    // Replace loading placeholder with the real embed wrapper
    const embedWrapper = document.createElement('div');
    embedWrapper.className = 'video-embed-wrapper';
    embedWrapper.appendChild(iframe);
    wrapper.replaceChild(embedWrapper, loadingEl);
  });

  iframe.addEventListener('error', () => {
    const errorEl = buildErrorState('Video unavailable', 'This video could not be loaded. It may have been removed or made private.');
    wrapper.replaceChild(errorEl, loadingEl);
  });

  // Append iframe to DOM to trigger load
  const hiddenWrapper = document.createElement('div');
  hiddenWrapper.style.display = 'none';
  hiddenWrapper.appendChild(iframe);
  document.body.appendChild(hiddenWrapper);

  // Move iframe into visible wrapper once DOM is ready
  // (load event fires after appendChild to visible DOM)
  const embedWrapper = document.createElement('div');
  embedWrapper.className = 'video-embed-wrapper';
  hiddenWrapper.remove();
  embedWrapper.appendChild(iframe);
  wrapper.replaceChild(embedWrapper, loadingEl);
}

/**
 * Builds the loading placeholder element.
 * @returns {HTMLElement}
 */
function buildLoadingState() {
  const outer = document.createElement('div');
  outer.className = 'video-embed-loading';

  const inner = document.createElement('div');
  inner.className = 'video-embed-loading-content';

  const spinner = document.createElement('div');
  spinner.className = 'video-embed-spinner';
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('aria-label', 'Loading video…');

  inner.appendChild(spinner);
  outer.appendChild(inner);
  return outer;
}

/**
 * Builds the error state element.
 * @param {string} title
 * @param {string} message
 * @returns {HTMLElement}
 */
function buildErrorState(title, message) {
  const outer = document.createElement('div');
  outer.className = 'video-embed-error';
  outer.setAttribute('role', 'alert');
  outer.setAttribute('aria-live', 'assertive');

  const inner = document.createElement('div');
  inner.className = 'video-embed-error-content';

  const icon = document.createElement('div');
  icon.className = 'video-embed-error-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '⚠️';

  const titleEl = document.createElement('p');
  titleEl.className = 'video-embed-error-title';
  titleEl.textContent = title;

  const msgEl = document.createElement('p');
  msgEl.className = 'video-embed-error-message';
  msgEl.textContent = message;

  inner.appendChild(icon);
  inner.appendChild(titleEl);
  inner.appendChild(msgEl);
  outer.appendChild(inner);
  return outer;
}

/**
 * Builds a caption element.
 * @param {string} text
 * @returns {HTMLElement}
 */
function buildCaption(text) {
  const p = document.createElement('p');
  p.className = 'video-embed-caption';
  p.textContent = text;
  return p;
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createYouTubeEmbed, isValidYouTubeId };
}
