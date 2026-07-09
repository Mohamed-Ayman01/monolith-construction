# STRUCT // MONOLITH ARCHITECTURE
**HIGH-CONTRAST NEOBRUTALIST WEB EXPERIENCE // V1.0.0**

![STRUCT Header Badge](https://img.shields.io/badge/STRUCT-MONOLITH%20ARCHITECTURE-000000?style=for-the-badge&labelColor=FFFFFF&logoColor=000000)
![GSAP ScrollTrigger](https://img.shields.io/badge/GSAP-3.12.5-000000?style=for-the-badge&labelColor=FFFFFF)
![Lenis Smooth Scroll](https://img.shields.io/badge/Lenis-Smooth%20Scroll-000000?style=for-the-badge&labelColor=FFFFFF)
![Vite Build Engine](https://img.shields.io/badge/Vite-Multi--Page%20Bundle-000000?style=for-the-badge&labelColor=FFFFFF)

---

## 🏛️ OVERVIEW

**STRUCT** is a world-class, avant-garde 5-page architectural web application built for a high-end structural construction and monolithic engineering firm. The design rejects superficial aesthetics in favor of high-contrast, raw, neobrutalist principles—operating as a hybrid between a heavy civic blueprint, an industrial CAD terminal, and a premium printed monograph.

### 📐 Core Design & Visual Constraints
* **High-Contrast B&W Palette:** Strict `#000000` (Pitch Black) and `#FFFFFF` (Pure White). Raw concrete gray (`#E5E5E5`) is reserved strictly for structural dividing borders and secondary table rows.
* **Zero Rounded Corners:** Universal `border-radius: 0 !important` enforced across all elements, inputs, buttons, containers, and media frames.
* **Sharp 90-Degree Geometry:** Heavy solid borders (`2px solid #000` / `4px solid #000`), structural grid lines (`.grid-line-h`, `.grid-line-v`), and precision crosshair node intersections (`.crosshair-node`).
* **Hard Drop Shadows:** Unblurred, offset architectural shadows (`4px 4px 0px #000` and `6px 6px 0px #000`) for high tactile contrast.
* **Dual-Typography Hierarchy:** Bold geometric headers (`Archivo Black` & `Space Grotesk`) paired with monospaced technical labels and specification readouts (`JetBrains Mono` & `Space Mono`).
* **Self-Contained Vector Blueprints:** 100% reliable local high-contrast B&W architectural vector assets (`assets/img/*.svg`) ensuring instant `0ms` load times without external network dependencies.

---

## ⚡ TECH STACK & ANIMATION ENGINE

* **Core Structure:** Multi-page **HTML5** & **Vanilla CSS** (`style.css`) powered by **Vite (`^5.4.10`)**.
* **Animation & Motion Engine:** **GSAP (`^3.12.5`)** with core plugins:
  * **ScrollTrigger:** Pinned sections, scrubbed timelines, horizontal translations, and traced grid animations.
  * **GSAP QuickTo:** High-performance, smooth mouse-follow cursor tracking for ledger hover previews.
  * **GSAP MatchMedia:** Responsive breakpoint handling for complex desktop-vs-mobile timeline calculations.
* **Smooth Scrolling:** **Lenis (`^1.1.13`)** integrated directly with `gsap.ticker` and `ScrollTrigger.update()` for fluid momentum scrolling.

---

## 📑 5-PAGE SITE ARCHITECTURE

```
monolith-construction/
├── index.html          # [PAGE 01] Home // Hero, Marquee, Contra-Scroll, Horizontal Showcase & Film Strip
├── archive.html        # [PAGE 02] Archive // Global Projects Ledger, Grid/List Toggle & QuickTo Hover Pop-up
├── capabilities.html   # [PAGE 03] Capabilities // Services Directory & Interactive Live SVG Blueprint Drawing
├── manifesto.html      # [PAGE 04] Manifesto // Printed Monograph Layout, Tenets & Traced Vertical Timeline
├── estimate.html       # [PAGE 05] Estimate // Specification Form, Custom Range Sliders & Live Terminal Receipt
├── style.css           # Global Neobrutalist Design System & Custom Utility Classes
├── vite.config.js      # Multi-page Vite Rollup Configuration
└── js/
    ├── main.js         # Core Engine: Lenis Smooth Scroll, Header/Footer Injection, Mask/Flicker Text & Grid Lines
    ├── home.js         # Page 1 Scripts: Contra-Scroll, Scrubbed Horizontal Project Slider & Film Strip Carousel
    ├── archive.js      # Page 2 Scripts: Ledger Dataset, Category Filtering, Sort Logic & QuickTo Hover Tracking
    ├── capabilities.js # Page 3 Scripts: Discipline Selector & GSAP stroke-dashoffset Vector Drawing Engine
    ├── manifesto.js    # Page 4 Scripts: Traced Center Timeline Connection (`scaleY`) & Card Reveal Staggers
    └── estimate.js     # Page 5 Scripts: Real-Time Structural Calculation Math Engine & Receipt Terminal Feed
```

### 1. [index.html](file:///c:/Users/dell/Downloads/Github-Repos/monolith-construction/index.html) — Home (Landing Page)
* **Hero Blueprint Layout:** Giant masked text (`"WE BUILD MONOLITHS"`), side technical metrics (`REF_ID #ST-MONO-2026`, `42,500 PSI`, `1,840,000 MT`), and a live status ticker displaying real-time UTC coordinates (`LAT: 34°03'N / LON: 118°15'W`).
* **Infinite Monospaced Marquee:** Seamless looping ticker that dynamically accelerates based on vertical scroll velocity (`scroll speed-boost`).
* **Contra-Scroll Split Section:** Left column (structural specifications) scrolls upwards while the right column (concrete renderings & blueprints) slides downwards (`ScrollTrigger pin & scrub`).
* **Horizontal Works Showcase:** Multi-column horizontal slider where vertical scroll translates exactly `1px` horizontally for every `1px` scrolled vertically (`x: () => -(scrollWidth - innerWidth)`), pinning cleanly without overshooting.
* **Vertical Strip Stack Carousel:** `4:3` rectangular film-strip viewer (`THE ALPINE SEED VAULT`) with click-triggered vertical slide transitions and live frame indicators (`[ FRAME: 01 / 05 ]`).

### 2. [archive.html](file:///c:/Users/dell/Downloads/Github-Repos/monolith-construction/archive.html) — Archive (Projects Ledger)
* **Interactive Ledger / Grid Toggle:** Instant switch between a high-density tabular specification ledger (`[ LEDGER_LIST ]`) and a 2-column visual grid (`[ GRID_VIEW ]`).
* **Hard-Shadowed Hover Pop-up (`gsap.quickTo`):** Hovering over any row in ledger view reveals a floating high-contrast blueprint box tracking the mouse cursor across the screen with smooth damping.
* **Neobrutalist Sortable Filters:** Instant category filtering by `[ ALL ]`, `[ MEGAPROJECT (SCALE) ]`, `[ CONCRETE / STEEL (MATERIAL) ]`, and `[ EUROPE / AMERICAS / ASIA (LOCATION) ]`.

### 3. [capabilities.html](file:///c:/Users/dell/Downloads/Github-Repos/monolith-construction/capabilities.html) — Capabilities (Engineering & Services)
* **6 Core Structural Disciplines:** `01 Monolithic Concrete Engineering`, `02 Seismic Reinforcing`, `03 Heavy Steel Fabrication`, `04 Subterranean Foundation Blueprinting`, `05 Precast Façade Systems`, `06 Acoustic & Thermal Mass Isolation`.
* **Live Vector Blueprint Drawing:** Clicking any discipline triggers a GSAP vector path animation (`stroke-dashoffset: length ➔ 0`) that live-draws detailed isometric CAD schematics (rebar cages, base isolators, Corten trusses, caisson piles) paired with live parameter readouts (`180 MPa`, `±0.1 MM tolerance`).

### 4. [manifesto.html](file:///c:/Users/dell/Downloads/Github-Repos/monolith-construction/manifesto.html) — Manifesto (Philosophy & Chronology)
* **Monograph Editorial Layout:** Styled like a physical printed monograph (`[PAGE 04 OF 05]`) articulating the Ethics of Raw Mass (`Truth in Material`, `Anti-Fragile Architecture`, `The Brutalist Imperative`).
* **Scroll-Traced Vertical Timeline:** Chronology from 1998 Zurich to 2026 Orbital Launchpads where a central black line (`scaleY: 0 ➔ 1`) draws downwards connecting milestone crosshair nodes and triggering card reveals.
* **Principal Architects:** High-contrast geometric B&W vector portraits for Dr. Kaspar Vogel, Helena Rostova, and Marcus Chen.

### 5. [estimate.html](file:///c:/Users/dell/Downloads/Github-Repos/monolith-construction/estimate.html) — Estimate (Bespoke Specification & Calculator)
* **Architectural Specification Form Grid:** Interactive custom range sliders (`Width 10m-500m`, `Length 10m-500m`, `Floors 1-80`), neobrutalist radio matrix for structural typology, and checkbox grid for material matrices.
* **Live Monospaced Receipt Block:** Real-time JavaScript structural calculation engine printing estimated concrete volume ($M^3$), Corten steel tonnage ($MT$), structural rating (`CLASS IX-EX // SOVEREIGN MONOLITH`), timeline, and budget parameters ($M USD) inside a barcoded terminal receipt box (`RECEIPT #EST-8842-X`). Includes a interactive `[ SUBMIT FOR STRUCTURAL REVIEW & GENERATE BLUEPRINT SPEC ]` button.

---

## 🛠️ LOCAL DEVELOPMENT & COMMANDS

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then install project dependencies:
```bash
npm install
```

### 2. Start Development Server
Launch the Vite hot-reloading development server:
```bash
npm run dev
```
* Open your browser to `http://localhost:5173`.
* **To shut down the server:** Press `Ctrl + C` inside your terminal window (press `Y` if prompted to confirm).

### 3. Build for Production
Compile, bundle, and minify all 5 HTML pages, CSS, and JS modules into the `dist/` directory:
```bash
npm run build
```
To preview the compiled production build locally:
```bash
npm run preview
```

---

## 📦 GIT VERSION CONTROL SETUP

If you want to initialize a Git repository for this project in your terminal:
```powershell
# 1. Initialize Git repository (Note: run 'git init' without asterisks)
git init

# 2. Stage all project files
git add .

# 3. Create your initial commit
git commit -m "feat: initial commit of STRUCT 5-page neobrutalist web experience"
```
*(Note: On Windows PowerShell/CMD, running `git init *` fails because `*` is not a valid folder name. Always run `git init` on its own).*

---
**STRUCTURAL ENGINEERING PROTOCOL // © 2026 SOVEREIGN MONOLITH CORP**
