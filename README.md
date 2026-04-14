# Pizza Making Guide

A comprehensive, interactive web guide for mastering the art of pizza making from dough to finish. This personal knowledge hub covers everything from basic dough preparation to advanced baking techniques, complete with embedded video tutorials and step-by-step instructions.

## Live Demo

🍕 **[View Live Site](https://pizza-making-guide.netlify.app)**

## Features

- **Interactive Accordion Sections** — Expandable dropdowns for each major topic with smooth animations
- **Embedded Video Tutorials** — YouTube videos integrated directly into each section for visual learning
- **Comprehensive Coverage** — Detailed instructions for dough, sauce, toppings, equipment, and baking
- **Search Functionality** — Real-time content search with text highlighting and auto-section expansion
- **Equipment Guide** — Filterable tool recommendations with detailed descriptions
- **Baking Timer** — Interactive countdown timer with style-specific presets
- **Print-Friendly** — Optimized print stylesheet with QR codes for video links
- **Offline Support** — Service worker enables offline viewing of cached content
- **Responsive Design** — Mobile-first layout that works on all screen sizes
- **Accessibility** — Full keyboard navigation and ARIA support throughout

## Tech Stack

**Frontend:**
- HTML5 with semantic markup
- CSS3 with custom properties and responsive design
- Vanilla JavaScript (ES6+)
- Service Worker for offline functionality
- YouTube embed API integration

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pizza-making-guide
```

2. Open the project:
```bash
# Simply open the HTML file in your browser
open frontend/index.html
# or
firefox frontend/index.html
# or double-click frontend/index.html in your file explorer
```

### Running Locally

No build step or local server required! The project runs directly in the browser:

1. Navigate to the `frontend` directory
2. Open `index.html` in any modern web browser
3. All features work immediately, including offline caching when served over HTTPS or localhost

For development with HTTPS (to test service worker):
```bash
# Using Python 3
cd frontend && python -m http.server 8000

# Using Node.js http-server
npx http-server frontend -p 8000
```

## Project Structure

```
pizza-making-guide/
├── README.md
└── frontend/
    ├── index.html              # Main application file
    ├── manifest.json           # PWA manifest
    ├── css/
    │   ├── styles.css          # Main stylesheet
    │   └── print.css           # Print-optimized styles
    └── js/
        ├── main.js             # Core application logic
        ├── service-worker.js   # Offline caching
        └── qr-codes.js         # QR code generation for print
```

## Key Sections

The guide is organized into these main interactive sections:

- **Dough Making** — Ingredients, mixing techniques, kneading, proofing, and troubleshooting
- **Sauce Preparation** — Marinara, white sauce, pesto variations with cooking methods
- **Toppings Guide** — Cheese types, vegetables, meats, layering, and flavor combinations
- **Equipment & Tools** — Searchable database of recommended pizza-making equipment
- **Baking Techniques** — Temperature control, timing, finishing touches, and troubleshooting

## License

MIT