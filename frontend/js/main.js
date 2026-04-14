/* ============================================================
   Pizza Making Guide — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // Data: sub-panel content definitions
  // ----------------------------------------------------------

  const marinaMethod = {
    cooked: {
      title: 'Cooked Marinara',
      content: `
        <p>Cooking the sauce concentrates the tomato flavour, mellows acidity, and allows the
        garlic and herbs to fully infuse into the base. This is the traditional method and is
        particularly well-suited for longer-baking pizzas or when using higher-moisture toppings.</p>
        <ol>
          <li>Follow the full Step-by-Step Method above, simmering for at least 20 minutes.</li>
          <li>Allow the sauce to cool to room temperature before spreading on dough — hot sauce can
          partially cook the dough before it reaches the oven.</li>
          <li>Cooked sauce freezes well in portions for up to 3 months.</li>
          <li>Reheat gently before use if it has been refrigerated, as cold sauce can affect oven spring.</li>
        </ol>
      `
    },
    fresh: {
      title: 'Fresh / No-Cook Marinara',
      content: `
        <p>A no-cook sauce preserves the bright, vibrant flavour of raw tomatoes and is ideal
        for Neapolitan-style pizzas baked in a very hot oven (450°C / 900°F) where the sauce
        cooks directly on the pizza in 60–90 seconds.</p>
        <ol>
          <li>Crush whole San Marzano tomatoes by hand directly into a bowl.</li>
          <li>Add a pinch of fine sea salt, a drizzle of extra-virgin olive oil, and tear in fresh basil.</li>
          <li>Do not blend — leave slightly chunky for texture.</li>
          <li>Drain excess liquid through a fine sieve if the tomatoes are very watery.</li>
          <li>Apply immediately to stretched dough and bake at maximum oven temperature.</li>
        </ol>
        <p><em>Note: no-cook sauce should only be used on pizza — it is too sharp and acidic to eat as a sauce on its own without cooking.</em></p>
      `
    }
  };

  const whiteStyle = {
    bechamel: {
      title: 'Béchamel (Roux-Based) Method',
      content: `
        <ol>
          <li>Melt butter in a heavy-bottomed saucepan over medium-low heat.</li>
          <li>Add flour all at once and whisk vigorously for 1–2 min to cook out the raw flour taste — the mixture (roux) should look pale golden and smell slightly nutty.</li>
          <li>Remove from heat. Gradually add warm milk in three additions, whisking completely smooth between each pour.</li>
          <li>Return to medium heat, whisking constantly until the sauce thickens and comes to a gentle bubble (3–5 min).</li>
          <li>Season with salt, white pepper, and a tiny pinch of freshly grated nutmeg.</li>
          <li>Remove from heat and stir in Parmesan if using.</li>
          <li>Cover surface with plastic wrap touching the sauce to prevent a skin forming as it cools.</li>
        </ol>
      `
    },
    alfredo: {
      title: 'Alfredo-Style (Cream-Based) Method',
      content: `
        <ol>
          <li>Melt butter in a skillet over medium heat; add minced garlic and cook for 30 seconds until fragrant.</li>
          <li>Pour in heavy cream and bring to a gentle simmer; cook 3–4 min, stirring, until slightly reduced.</li>
          <li>Remove from heat and stir in finely grated Parmesan until fully melted and smooth.</li>
          <li>Season with salt and white pepper.</li>
          <li>This sauce thickens further as it cools — it will be the right consistency for pizza spreading once at room temperature.</li>
          <li>Apply in a thin, even layer on the pizza dough before adding toppings.</li>
        </ol>
      `
    }
  };

  const pestoVariant = {
    basil: {
      title: 'Classic Basil Pesto (Genovese)',
      content: `
        <p><strong>Ingredients:</strong> 60 g fresh basil leaves, 30 g pine nuts (toasted), 50 g Parmesan
        (finely grated), 25 g Pecorino Romano, 1 clove garlic, 120 ml extra-virgin olive oil,
        salt to taste, squeeze of lemon juice.</p>
        <ol>
          <li>Blanch basil for 5 seconds in boiling water; transfer immediately to ice water. Pat dry.</li>
          <li>Add garlic and toasted pine nuts to a food processor; pulse until coarsely ground.</li>
          <li>Add blanched basil; pulse 5–6 times.</li>
          <li>Add cheeses; pulse again.</li>
          <li>With the motor running, drizzle in olive oil until creamy and emulsified.</li>
          <li>Season with salt and lemon juice. Taste and adjust.</li>
          <li>Apply to pizza after baking, or in the last 2 minutes inside the oven.</li>
        </ol>
      `
    },
    sundried: {
      title: 'Sun-Dried Tomato Pesto',
      content: `
        <p><strong>Ingredients:</strong> 100 g sun-dried tomatoes (in oil, drained), 30 g toasted almonds
        or pine nuts, 30 g Parmesan, 1 clove garlic, 80 ml extra-virgin olive oil, 1 tsp tomato
        paste, pinch of red pepper flakes, salt and black pepper.</p>
        <ol>
          <li>Add garlic and nuts to the food processor; pulse until finely ground.</li>
          <li>Add sun-dried tomatoes and tomato paste; blend until roughly combined.</li>
          <li>Add Parmesan and pulse briefly.</li>
          <li>Drizzle in olive oil while blending until a thick, spreadable paste forms.</li>
          <li>Season with red pepper flakes, salt, and black pepper.</li>
          <li>Unlike basil pesto, this variation can be applied before baking as it does not discolour in the oven.</li>
        </ol>
      `
    },
    arugula: {
      title: 'Arugula & Walnut Pesto',
      content: `
        <p><strong>Ingredients:</strong> 80 g fresh arugula (rocket), 40 g toasted walnuts, 40 g
        Parmesan, 1 small clove garlic, 100 ml extra-virgin olive oil, juice of ½ lemon,
        salt and black pepper.</p>
        <ol>
          <li>Toast walnuts in a dry pan for 2–3 min; cool completely.</li>
          <li>Add garlic and walnuts to food processor; pulse until roughly ground.</li>
          <li>Add arugula (no blanching needed — arugula does not oxidise as quickly as basil); pulse until combined.</li>
          <li>Add Parmesan and lemon juice; pulse again.</li>
          <li>Stream in olive oil while blending until desired consistency is reached.</li>
          <li>Season generously with salt and black pepper.</li>
          <li>Best applied after baking to preserve the peppery bite of the arugula.</li>
        </ol>
        <p><em>This pesto pairs beautifully with prosciutto, fresh mozzarella, and shaved Parmesan.</em></p>
      `
    }
  };

  // ----------------------------------------------------------
  // Helpers
  // ----------------------------------------------------------

  function renderSubPanel (containerEl, data) {
    if (!data) {
      containerEl.innerHTML = '';
      containerEl.classList.add('hidden');
      return;
    }
    containerEl.innerHTML = `<h5>${data.title}</h5>${data.content}`;
    containerEl.classList.remove('hidden');
  }

  function hideAllSaucePanels () {
    document.querySelectorAll('.sauce-panel').forEach(function (panel) {
      panel.classList.add('hidden');
    });
  }

  function resetSubDropdown (selectEl, detailEl) {
    if (selectEl) selectEl.value = '';
    if (detailEl) {
      detailEl.innerHTML = '';
      detailEl.classList.add('hidden');
    }
  }

  // ----------------------------------------------------------
  // Sauce type selector
  // ----------------------------------------------------------

  var sauceTypeSelect = document.getElementById('sauce-type-select');

  if (sauceTypeSelect) {
    sauceTypeSelect.addEventListener('change', function () {
      var value = this.value;

      hideAllSaucePanels();

      // Reset all sub-dropdowns when top-level changes
      resetSubDropdown(
        document.getElementById('marinara-method-select'),
        document.getElementById('marinara-method-detail')
      );
      resetSubDropdown(
        document.getElementById('white-style-select'),
        document.getElementById('white-style-detail')
      );
      resetSubDropdown(
        document.getElementById('pesto-variant-select'),
        document.getElementById('pesto-variant-detail')
      );

      if (!value) return;

      var target = document.getElementById('panel-' + value);
      if (target) {
        target.classList.remove('hidden');
        // Scroll panel into view smoothly
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ----------------------------------------------------------
  // Marinara method sub-dropdown
  // ----------------------------------------------------------

  var marinaraMethodSelect = document.getElementById('marinara-method-select');
  var marinaraMethodDetail = document.getElementById('marinara-method-detail');

  if (marinaraMethodSelect) {
    marinaraMethodSelect.addEventListener('change', function () {
      renderSubPanel(marinaraMethodDetail, marinaMethod[this.value] || null);
    });
  }

  // ----------------------------------------------------------
  // White sauce style sub-dropdown
  // ----------------------------------------------------------

  var whiteStyleSelect = document.getElementById('white-style-select');
  var whiteStyleDetail = document.getElementById('white-style-detail');

  if (whiteStyleSelect) {
    whiteStyleSelect.addEventListener('change', function () {
      renderSubPanel(whiteStyleDetail, whiteStyle[this.value] || null);
    });
  }

  // ----------------------------------------------------------
  // Pesto variant sub-dropdown
  // ----------------------------------------------------------

  var pestoVariantSelect = document.getElementById('pesto-variant-select');
  var pestoVariantDetail = document.getElementById('pesto-variant-detail');

  if (pestoVariantSelect) {
    pestoVariantSelect.addEventListener('change', function () {
      renderSubPanel(pestoVariantDetail, pestoVariant[this.value] || null);
    });
  }

})();
