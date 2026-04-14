// ===== Section toggle =====
function initSectionToggles() {
  document.querySelectorAll('.section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleSection(btn);
    });
  });
}

function toggleSection(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const bodyId = btn.getAttribute('aria-controls');
  const body = document.getElementById(bodyId);
  if (!body) return;

  btn.setAttribute('aria-expanded', String(!expanded));
  body.hidden = expanded;
}

function expandSection(btn) {
  const bodyId = btn.getAttribute('aria-controls');
  const body = document.getElementById(bodyId);
  if (!body) return;
  btn.setAttribute('aria-expanded', 'true');
  body.hidden = false;
}

function collapseSection(btn) {
  const bodyId = btn.getAttribute('aria-controls');
  const body = document.getElementById(bodyId);
  if (!body) return;
  btn.setAttribute('aria-expanded', 'false');
  body.hidden = true;
}

// ===== Search =====

/**
 * Walk the DOM of `node`, replacing text that matches `regex` with
 * <mark class="search-highlight"> elements. We avoid descending into
 * elements we don't want to mutate (script, style, mark).
 */
function highlightTextInNode(node, regex) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (!regex.test(text)) return;
    regex.lastIndex = 0; // reset after test()

    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    regex.lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const mark = document.createElement('mark');
      mark.className = 'search-highlight';
      mark.textContent = match[0];
      frag.appendChild(mark);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(frag, node);
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = node.tagName.toLowerCase();
    if (['script', 'style', 'mark', 'input', 'button'].includes(tag)) return;
    // Clone children list because we may mutate it
    Array.from(node.childNodes).forEach(child => highlightTextInNode(child, regex));
  }
}

/**
 * Strip all <mark class="search-highlight"> wrappers, restoring plain text.
 */
function removeHighlights(container) {
  container.querySelectorAll('mark.search-highlight').forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function initSearch() {
  const input = document.getElementById('site-search');
  const noResults = document.getElementById('no-results');
  const noResultsQuery = document.getElementById('no-results-query');
  const sections = Array.from(document.querySelectorAll('.guide-section'));

  if (!input) return;

  // Store original HTML per section body so we can restore cleanly.
  // We use a live remove-highlights approach instead of innerHTML restore
  // to preserve event listeners.

  let debounceTimer = null;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runSearch(input.value.trim()), 150);
  });

  function runSearch(query) {
    // 1. Remove previous highlights from all section bodies
    sections.forEach(section => {
      const body = section.querySelector('.section-body');
      if (body) removeHighlights(body);
    });

    // 2. If query is empty, restore default state
    if (!query) {
      sections.forEach(section => {
        section.classList.remove('search-hidden');
        const btn = section.querySelector('.section-toggle');
        if (btn) collapseSection(btn);
      });
      noResults.hidden = true;
      return;
    }

    // 3. Build case-insensitive regex
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');

    let anyVisible = false;

    sections.forEach(section => {
      const body = section.querySelector('.section-body');
      const btn = section.querySelector('.section-toggle');
      if (!body || !btn) return;

      // Check if section contains a match (search in text content of body)
      const bodyText = body.textContent;
      const hasMatch = new RegExp(escaped, 'i').test(bodyText);

      if (hasMatch) {
        section.classList.remove('search-hidden');
        expandSection(btn);
        // Highlight matching text
        const freshRegex = new RegExp(escaped, 'gi');
        highlightTextInNode(body, freshRegex);
        anyVisible = true;
      } else {
        section.classList.add('search-hidden');
        collapseSection(btn);
      }
    });

    // 4. No-results message
    if (!anyVisible) {
      noResultsQuery.textContent = query;
      noResults.hidden = false;
    } else {
      noResults.hidden = true;
    }
  }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initSectionToggles();
  initSearch();
});
