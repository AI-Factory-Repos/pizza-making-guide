/**
 * Pizza Making Guide — main.js
 * Core JavaScript for the equipment & tools section (Part 1).
 */

'use strict';

// ---------------------------------------------------------------------------
// Equipment & Tools Data
// ---------------------------------------------------------------------------

/** @typedef {{ id: string, icon: string, name: string, description: string, essential: boolean }} EquipmentItem */

/** @type {EquipmentItem[]} */
const EQUIPMENT_DATA = [
  {
    id: 'pizza-stone',
    icon: '🪨',
    name: 'Pizza Stone',
    description: 'Retains and distributes heat evenly, giving your pizza a crispy, restaurant-style base.',
    essential: true,
  },
  {
    id: 'pizza-peel',
    icon: '🍕',
    name: 'Pizza Peel',
    description: 'A flat paddle used to slide the pizza into and out of a hot oven safely.',
    essential: true,
  },
  {
    id: 'stand-mixer',
    icon: '🥣',
    name: 'Stand Mixer',
    description: 'Makes kneading dough effortless and produces a consistent, well-developed gluten structure.',
    essential: false,
  },
  {
    id: 'rolling-pin',
    icon: '🪄',
    name: 'Rolling Pin',
    description: 'Helpful for shaping dough uniformly, although hand-stretching is preferred by many pizza makers.',
    essential: false,
  },
  {
    id: 'dough-scraper',
    icon: '🔪',
    name: 'Bench / Dough Scraper',
    description: 'Cuts and portions dough cleanly and helps lift sticky dough from the work surface.',
    essential: true,
  },
  {
    id: 'pizza-cutter',
    icon: '⭕',
    name: 'Pizza Cutter',
    description: 'A wheel cutter or mezzaluna for slicing your finished pizza into clean portions.',
    essential: true,
  },
  {
    id: 'digital-scale',
    icon: '⚖️',
    name: 'Digital Kitchen Scale',
    description: 'Weighing ingredients (especially flour) ensures recipe accuracy and consistent results every time.',
    essential: true,
  },
  {
    id: 'mixing-bowls',
    icon: '🫙',
    name: 'Mixing Bowls',
    description: 'Large bowls for mixing and proofing dough, ideally with a tight-fitting lid or cling film.',
    essential: true,
  },
  {
    id: 'thermometer',
    icon: '🌡️',
    name: 'Instant-Read Thermometer',
    description: 'Check dough temperature and water temperature to ensure optimal yeast activity.',
    essential: false,
  },
  {
    id: 'ladle',
    icon: '🥄',
    name: 'Ladle / Sauce Spreader',
    description: 'Spreads tomato sauce in a smooth, even spiral across the pizza base without tearing it.',
    essential: false,
  },
];

// ---------------------------------------------------------------------------
// Equipment Card Renderer
// ---------------------------------------------------------------------------

/**
 * Creates a DOM element for a single equipment item.
 * @param {EquipmentItem} item
 * @returns {HTMLElement}
 */
function createEquipmentCard(item) {
  const article = document.createElement('article');
  article.classList.add('equipment-card');
  article.setAttribute('role', 'listitem');
  article.dataset.equipmentId = item.id;

  const badgeClass = item.essential
    ? 'equipment-card__badge--essential'
    : 'equipment-card__badge--optional';
  const badgeLabel = item.essential ? 'Essential' : 'Optional';

  article.innerHTML = `
    <span class="equipment-card__icon" aria-hidden="true">${item.icon}</span>
    <h3 class="equipment-card__name">${escapeHTML(item.name)}</h3>
    <p class="equipment-card__description">${escapeHTML(item.description)}</p>
    <span class="equipment-card__badge ${badgeClass}">${badgeLabel}</span>
  `;

  return article;
}

/**
 * Renders all equipment cards into the grid container.
 * @param {EquipmentItem[]} items
 */
function renderEquipmentGrid(items) {
  const grid = document.getElementById('equipment-grid');
  if (!grid) {
    console.warn('[Equipment] Grid container #equipment-grid not found.');
    return;
  }

  // Clear any existing content
  grid.innerHTML = '';

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(createEquipmentCard(item));
  });

  grid.appendChild(fragment);
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, (char) => map[char]);
}

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------

function init() {
  renderEquipmentGrid(EQUIPMENT_DATA);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
