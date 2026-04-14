# Pizza Making Guide

## Project Overview

A comprehensive, interactive frontend-only website that serves as a personal knowledge hub for pizza making. The site features detailed instructions for dough preparation, sauce making, topping combinations, equipment guidance, and baking techniques, all presented through collapsible dropdown sections with embedded YouTube video tutorials for visual learning support.

## Tech Stack

**Frontend:**
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- YouTube Embed API for video integration
- CSS Grid and Flexbox for responsive layouts
- CSS Animations and Transitions
- Service Workers for offline functionality
- Web APIs: IntersectionObserver, localStorage

**Development & Deployment:**
- Netlify for static site hosting
- No build process - direct HTML/CSS/JS serving
- Responsive design with mobile-first approach

## Architecture

```
/
├── index.html              # Single-page application entry point
├── css/
│   ├── styles.css         # Main stylesheet with component styles
│   └── print.css          # Print-optimized styles
├── js/
│   ├── dropdown.js        # Dropdown component system
│   ├── youtube-embed.js   # YouTube video embed handler
│   ├── search.js          # Content search functionality
│   ├── navigation.js      # Smooth scrolling and TOC
│   └── service-worker.js  # Offline functionality
└── assets/
    └── icons/             # UI icons and print QR codes
```

The application is a single-page website with modular JavaScript components. All sections are rendered on initial load with progressive enhancement through JavaScript for interactive features. No client-server communication required.

## Build & Development Commands

```bash
# No build process required - serve directly
# For local development:
npx http-server . -p 8080
# OR
python -m http.server 8080
# OR open index.html directly in browser

# Deploy to Netlify:
# Simply connect repository to Netlify dashboard
# Build command: (none)
# Publish directory: .
```

## Environment Variables

```bash
# No environment variables required
# All configuration is inline in JavaScript files
# YouTube video IDs are hardcoded in the HTML/JS
```

## API Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| N/A | N/A | Frontend-only project with no API endpoints | N/A |

## Database Schema

```
# No database - all content is static
# Video references stored as:
{
  videoId: string,        # YouTube video ID
  title: string,          # Video description
  section: string,        # Associated content section
  timestamp?: string      # Optional start time
}

# Search index structure (localStorage):
{
  sections: Array<{
    id: string,
    title: string,
    content: string,
    keywords: string[]
  }>
}
```

## Key Algorithms & Patterns

**Dropdown System:** Event delegation pattern with CSS transitions for smooth expand/collapse animations. Uses `max-height` transitions with `overflow: hidden` for performance.

**YouTube Embed Loading:** Lazy loading pattern that creates iframe elements only when dropdowns are first opened to improve initial page load performance.

**Search Functionality:** Client-side full-text search using `String.prototype.includes()` with highlight functionality. Indexes all section content and video descriptions on page load.

**Navigation System:** IntersectionObserver API tracks section visibility for active state highlighting in table of contents. Smooth scrolling implemented with `scrollIntoView()` API.

**Print Optimization:** CSS media queries replace video embeds with QR codes linking to online videos. Service worker caches essential content for offline viewing.

## What Was Built (Tickets)

### Foundation Phase
- **FE-1**: Create project structure and basic HTML layout — Established base HTML structure with semantic sections, CSS reset, and responsive typography foundation
- **FE-2**: Implement interactive dropdown component system — Built reusable dropdown components with smooth CSS animations, ARIA accessibility, and keyboard navigation support
- **FE-3**: Create YouTube video embed component — Developed responsive YouTube iframe wrapper with aspect ratio preservation and error handling for invalid video IDs

### Core Phase
- **FE-4**: Build dough-making section with detailed instructions — Added comprehensive dough section with ingredient measurements, mixing techniques, kneading methods, proofing times, and troubleshooting guides
- **FE-5**: Build sauce preparation section with variations — Created detailed sauce section covering marinara, white sauce, pesto, cooking methods, and seasoning techniques
- **FE-6**: Create comprehensive toppings guide section — Implemented toppings section with cheese types, vegetable prep, meat handling, layering order, and flavor combinations
- **FE-7-S1-1**: Build equipment and tools section - Part 1 — Core structure for equipment guide with essential tools and mixing bowls setup
- **FE-8-S1-1**: Build baking fundamentals section with temperature guidance — Added oven temperature guidelines (450-500°F), pizza stone vs baking sheet comparison, and preheating instructions
- **FE-7-S1-2**: Build equipment and tools section - Part 2 — Completed equipment section with specialized tools (pizza stone, peel, stand mixer) and budget recommendations
- **FE-8-S1-2**: Implement timing controls and doneness indicators — Added timing guidelines for different crust styles and visual doneness indicators with interactive timer functionality
- **FE-8-S1-3**: Add finishing techniques and troubleshooting guide — Built finishing touches section and comprehensive baking problem solutions guide

### Integration Phase
- **FE-10**: Implement search functionality within content — Added client-side search with content filtering, highlighting, and video description indexing
- **FE-9**: Add navigation and table of contents — Implemented sticky TOC sidebar with smooth scrolling and progress indicators using IntersectionObserver

### Polish Phase
- **FE-11**: Add print-friendly stylesheet and offline viewing — Created print-optimized CSS with QR codes for videos and basic service worker for offline content access

## Known Constraints & Notes

**YouTube API Limitations:** Videos are embedded using basic iframe approach rather than YouTube API to avoid API key requirements. Video availability depends on YouTube's embed policies.

**Offline Functionality:** Service worker caches HTML/CSS/JS but cannot cache YouTube videos. Print version includes QR codes as fallback for offline video access.

**Search Scope:** Search functionality is client-side only and indexes content at page load. Does not search within video transcripts or comments.

**Browser Support:** Uses modern JavaScript features (ES6+) and CSS Grid. Graceful degradation provided but optimal experience requires modern browsers.

**Content Management:** All content is hardcoded in HTML/JavaScript. Adding new sections or updating video links requires direct code modification.

**Performance:** All content loads on initial page load rather than lazy loading sections. Acceptable for current scope but may need optimization if content expands significantly.