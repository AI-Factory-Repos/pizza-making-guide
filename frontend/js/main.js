(function () {
  'use strict';

  // ── Data ────────────────────────────────────────────────────────────────────
  const EQUIPMENT = [
    {
      id: 'pizza-stone',
      name: 'Pizza Stone',
      icon: '🪨',
      category: 'baking',
      priority: 3,
      description:
        'A pizza stone absorbs and radiates intense heat, mimicking the floor of a wood-fired oven. It gives your crust a crispy bottom and evenly baked base.',
      tips: [
        'Preheat in the oven for at least 45–60 minutes before baking.',
        'Never wash with soap — wipe with a dry cloth after cooling.',
        'Place on the lowest rack for maximum heat transfer.',
      ],
    },
    {
      id: 'pizza-peel',
      name: 'Pizza Peel',
      icon: '🍕',
      category: 'essential',
      priority: 3,
      description:
        'A pizza peel is a flat paddle used to slide raw pizza onto a stone or steel and retrieve it when done. Available in wood or metal — wood is better for building, metal for retrieving.',
      tips: [
        'Dust liberally with semolina or flour to prevent sticking.',
        'Assemble the pizza quickly and transfer immediately.',
        'A perforated metal peel reduces drag during the launch.',
      ],
    },
    {
      id: 'stand-mixer',
      name: 'Stand Mixer',
      icon: '⚙️',
      category: 'prep',
      priority: 2,
      description:
        'A stand mixer with a dough hook takes the effort out of kneading. It develops gluten consistently and frees your hands while mixing.',
      tips: [
        'Mix on low for 2 minutes, then medium for 6–8 minutes.',
        'Dough should clear the bowl sides and feel tacky, not sticky.',
        'Do not exceed speed 4 or you risk overheating the dough.',
      ],
    },
    {
      id: 'bench-scraper',
      name: 'Bench Scraper',
      icon: '🔪',
      category: 'prep',
      priority: 2,
      description:
        'A bench scraper is indispensable for dividing dough, cleaning your work surface, and transferring ingredients. It keeps your workflow tidy and efficient.',
      tips: [
        'Use it to fold and shape dough without tearing.',
        'Scrape flour and dough bits off the bench between steps.',
        'Choose a stainless-steel scraper for durability.',
      ],
    },
    {
      id: 'digital-scale',
      name: 'Digital Kitchen Scale',
      icon: '⚖️',
      category: 'essential',
      priority: 3,
      description:
        'Accurate measurement is the foundation of consistent dough. Volume measures vary wildly with flour; weight is always precise.',
      tips: [
        'Measure all ingredients by weight in grams for best results.',
        'Zero (tare) the scale between each ingredient.',
        'A 0.1 g resolution scale is ideal for yeast.',
      ],
    },
    {
      id: 'dough-containers',
      name: 'Dough Proofing Containers',
      icon: '🫙',
      category: 'prep',
      priority: 2,
      description:
        'Straight-sided containers with lids let you monitor dough rise accurately. Clear containers make it easy to see when dough has doubled.',
      tips: [
        'Lightly oil the container before placing dough inside.',
        'Mark the starting level with a rubber band or tape.',
        'Use individual containers for each dough ball during cold fermentation.',
      ],
    },
    {
      id: 'infrared-thermometer',
      name: 'Infrared Thermometer',
      icon: '🌡️',
      category: 'baking',
      priority: 2,
      description:
        'Instantly measure the surface temperature of your pizza stone or steel. Knowing the surface temperature lets you bake with confidence and consistency.',
      tips: [
        'Aim for 260–290 °C (500–550 °F) for Neapolitan-style.',
        'Check multiple spots — the center vs. edges can vary.',
        'Give the stone extra time if it reads below target.',
      ],
    },
    {
      id: 'pizza-cutter',
      name: 'Pizza Cutter (Wheel or Rocker)',
      icon: '🔵',
      category: 'essential',
      priority: 3,
      description:
        'A sharp pizza cutter slices cleanly through crust and toppings without dragging cheese off. Rocker blades are fast; wheel cutters are versatile.',
      tips: [
        'Keep the blade sharp — dull cutters tear the pizza.',
        'Let the pizza rest 2 minutes before cutting for cleaner slices.',
        'A rocker blade works better on thick-crust pizzas.',
      ],
    },
    {
      id: 'pizza-steel',
      name: 'Pizza Steel',
      icon: '🔩',
      category: 'baking',
      priority: 2,
      description:
        'Thicker and denser than a pizza stone, a baking steel conducts heat more effectively, producing an even crispier crust in less time.',
      tips: [
        'Season with a thin layer of oil after each use.',
        'Preheat on the top rack under the broiler for best results.',
        'Heavier than stone — handle with care.',
      ],
    },
    {
      id: 'sauce-ladle',
      name: 'Sauce Ladle / Spoodle',
      icon: '🥄',
      category: 'prep',
      priority: 1,
      description:
        'A dedicated ladle or offset spoon spreads sauce in a controlled spiral from the center outward, giving you an even, thin layer every time.',
      tips: [
        'Use the back of the ladle in a spiral motion.',
        'Less is more — 80–100 g of sauce for a 30 cm pizza.',
        'Leave a 1–2 cm border for the crust.',
      ],
    },
    {
      id: 'oven-thermometer',
      name: 'Oven Thermometer',
      icon: '🌡️',
      category: 'baking',
      priority: 2,
      description:
        'Most home ovens run 15–30 °C off from their dial setting. An oven thermometer tells you the real temperature so you can compensate.',
      tips: [
        'Hang it from the oven rack near the stone.',
        'Calibrate your oven dial based on the reading.',
        'Check it periodically — oven accuracy can drift over time.',
      ],
    },
    {
      id: 'wire-cooling-rack',
      name: 'Wire Cooling Rack',
      icon: '🏗️',
      category: 'optional',
      priority: 1,
      description:
        'Resting your pizza on a wire rack prevents the bottom crust from steaming and going soggy. A simple but highly effective accessory.',
      tips: [
        'Transfer the pizza to the rack immediately after baking.',
        'Rest for at least 2 minutes before cutting.',
        'Also doubles as a rack for proofing dough in a warm oven.',
      ],
    },
    {
      id: 'mixing-bowls',
      name: 'Mixing Bowls (Stainless Steel)',
      icon: '🥣',
      category: 'essential',
      priority: 3,
      description:
        'A set of stainless-steel mixing bowls handles everything from combining dry ingredients to proofing bulk dough. Durable, easy to clean, and non-reactive.',
      tips: [
        'Choose bowls with a flat base and high sides to contain flour.',
        'A large 5 L bowl is ideal for a 1 kg batch of dough.',
        'Cover with plastic wrap or a damp towel during fermentation.',
      ],
    },
    {
      id: 'plastic-wrap',
      name: 'Plastic Wrap / Beeswax Wraps',
      icon: '🧻',
      category: 'optional',
      priority: 1,
      description:
        'Essential for covering dough during fermentation to prevent a dry skin from forming. Beeswax wraps are a sustainable alternative.',
      tips: [
        'Press wrap directly onto the dough surface to eliminate air.',
        'Label with the time and dough weight for organised prep.',
        'Reusable silicone lids also work well on bowls.',
      ],
    },
  ];

  // ── State ────────────────────────────────────────────────────────────────────
  let activeCategory = 'all';
  let searchQuery = '';

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  const grid = document.getElementById('equipment-grid');
  const emptyState = document.getElementById('empty-state');
  const resultsCount = document.getElementById('results-count');
  const searchInput = document.getElementById('equipment-search');
  const filterTabs = document.querySelectorAll('.filter-tab');

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function badgeClass(category) {
    const map = {
      essential: 'badge-essential',
      baking: 'badge-baking',
      prep: 'badge-prep',
      optional: 'badge-optional',
    };
    return map[category] || 'badge-optional';
  }

  function renderPriorityDots(priority) {
    const max = 3;
    let html = '<div class="priority-dots" aria-hidden="true">';
    for (let i = 1; i <= max; i++) {
      html += `<span class="priority-dot${i <= priority ? ' filled' : ''}"></span>`;
    }
    html += '</div>';
    return html;
  }

  function priorityLabel(priority) {
    const labels = { 1: 'Nice to have', 2: 'Recommended', 3: 'Must have' };
    return labels[priority] || '';
  }

  function createCard(item) {
    const card = document.createElement('article');
    card.className = 'equipment-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = item.id;

    const tipsHtml = item.tips
      .map(t => `<li>${escapeHtml(t)}</li>`)
      .join('');

    card.innerHTML = `
      <div class="card-header" tabindex="0" role="button"
           aria-expanded="false"
           aria-controls="detail-${item.id}"
           id="header-${item.id}">
        <span class="card-icon" aria-hidden="true">${item.icon}</span>
        <div class="card-meta">
          <div class="card-name">${escapeHtml(item.name)}</div>
          <span class="card-category-badge ${badgeClass(item.category)}">${escapeHtml(item.category)}</span>
        </div>
        <span class="card-toggle" aria-hidden="true">▼</span>
      </div>
      <div class="card-detail"
           id="detail-${item.id}"
           role="region"
           aria-labelledby="header-${item.id}">
        <p class="card-description">${escapeHtml(item.description)}</p>
        <div class="card-tips">
          <p class="card-tips-title">Pro Tips</p>
          <ul class="card-tips-list">${tipsHtml}</ul>
        </div>
        <div class="card-priority">
          ${renderPriorityDots(item.priority)}
          <span>${priorityLabel(item.priority)}</span>
        </div>
      </div>
    `;

    // Toggle on click or Enter/Space
    const header = card.querySelector('.card-header');
    header.addEventListener('click', () => toggleCard(card, header));
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card, header);
      }
    });

    return card;
  }

  function toggleCard(card, header) {
    const isExpanded = card.classList.contains('expanded');
    card.classList.toggle('expanded', !isExpanded);
    header.setAttribute('aria-expanded', String(!isExpanded));
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getFiltered() {
    const q = searchQuery.trim().toLowerCase();
    return EQUIPMENT.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tips.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }

  function render() {
    const filtered = getFiltered();

    // Clear grid
    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      resultsCount.textContent = '';
      return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    const total = EQUIPMENT.length;
    resultsCount.textContent =
      filtered.length === total
        ? `Showing all ${total} items`
        : `Showing ${filtered.length} of ${total} items`;

    const fragment = document.createDocumentFragment();
    filtered.forEach(item => fragment.appendChild(createCard(item)));
    grid.appendChild(fragment);
  }

  // ── Event listeners ──────────────────────────────────────────────────────────
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    render();
  });

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.dataset.category;
      render();
    });
  });

  // ── Init ─────────────────────────────────────────────────────────────────────
  render();
})();
