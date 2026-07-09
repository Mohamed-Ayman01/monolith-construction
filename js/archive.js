import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, renderHeader, renderFooter, initMaskedText, initTracedGrid } from './main.js';

gsap.registerPlugin(ScrollTrigger);

// Project Ledger Dataset
const PROJECTS = [
  {
    id: "ST-101",
    title: "KYOTO MONOLITH TOWER",
    typology: "MEGAPROJECT // TOWER",
    material: "REINFORCED CONCRETE / CORTEN",
    location: "ASIA // KYOTO",
    year: "2024",
    mass: "48,200 MT",
    category: "MEGAPROJECT CONCRETE ASIA",
    image: "assets/img/kyoto-tower.svg",
    spec: "38 Floors • Seismic Exoskeleton Class IX"
  },
  {
    id: "ST-102",
    title: "REYKJAVIK THERMAL VAULT",
    typology: "SUBTERRANEAN // VAULT",
    material: "UHPC CONCRETE / BASALT",
    location: "EUROPE // REYKJAVIK",
    year: "2025",
    mass: "62,000 MT",
    category: "CONCRETE EUROPE",
    image: "assets/img/reykjavik-vault.svg",
    spec: "-45m Subsurface • Geothermal Containment"
  },
  {
    id: "ST-103",
    title: "BRUTALIST DATA FORTRESS",
    typology: "INDUSTRIAL // FORTRESS",
    material: "PRECAST CONCRETE / STEEL",
    location: "EUROPE // ZURICH",
    year: "2023",
    mass: "34,500 MT",
    category: "CONCRETE STEEL EUROPE",
    image: "assets/img/data-fortress.svg",
    spec: "EMP Hardened • Passive Updraft Cooling"
  },
  {
    id: "ST-104",
    title: "VALLETTA COASTAL SEAWALL",
    typology: "INFRASTRUCTURE // COASTAL",
    material: "SALTWATER RESIST CONCRETE",
    location: "EUROPE // MALTA",
    year: "2026",
    mass: "115,000 MT",
    category: "MEGAPROJECT CONCRETE EUROPE",
    image: "assets/img/valletta-seawall.svg",
    spec: "18.5m Wave Surge Shield • Tetrapod Matrix"
  },
  {
    id: "ST-105",
    title: "OSLO SUBTERRANEAN SILO",
    typology: "SUBTERRANEAN // SILO",
    material: "POST-TENSIONED CONCRETE",
    location: "EUROPE // OSLO",
    year: "2022",
    mass: "29,800 MT",
    category: "CONCRETE EUROPE",
    image: "assets/img/strip-1.svg",
    spec: "Underground Deep Storage • High Tensile Core"
  },
  {
    id: "ST-106",
    title: "LOS ANGELES SEISMIC PIER",
    typology: "INFRASTRUCTURE // BRIDGE",
    material: "HEAVY STEEL FABRICATION",
    location: "AMERICAS // LA",
    year: "2024",
    mass: "84,000 MT",
    category: "MEGAPROJECT STEEL AMERICAS",
    image: "assets/img/strip-2.svg",
    spec: "Elastomeric Base Isolators • San Andreas Rated"
  },
  {
    id: "ST-107",
    title: "BERLIN MONOLITH CANOPY",
    typology: "CIVIC // CANOPY",
    material: "CORTEN STEEL / UHPC",
    location: "EUROPE // BERLIN",
    year: "2021",
    mass: "18,400 MT",
    category: "STEEL CONCRETE EUROPE",
    image: "assets/img/strip-3.svg",
    spec: "Cantilever 28m Span • Oxidized Corten Trusses"
  },
  {
    id: "ST-108",
    title: "SÃO PAULO HIGH-DENSITY GRID",
    typology: "MEGAPROJECT // TOWER",
    material: "REINFORCED CONCRETE",
    location: "AMERICAS // SÃO PAULO",
    year: "2025",
    mass: "92,000 MT",
    category: "MEGAPROJECT CONCRETE AMERICAS",
    image: "assets/img/strip-4.svg",
    spec: "44 Stories • Monolithic Shear Core"
  },
  {
    id: "ST-109",
    title: "SEOUL ACOUSTIC BUNKER",
    typology: "INSTITUTIONAL // BUNKER",
    material: "HIGH-DENSITY MASS CONCRETE",
    location: "ASIA // SEOUL",
    year: "2023",
    mass: "41,000 MT",
    category: "CONCRETE ASIA",
    image: "assets/img/strip-5.svg",
    spec: "100dB Sound Isolation • 800mm Walls"
  },
  {
    id: "ST-110",
    title: "SANTIAGO ALPINE SEED VAULT",
    typology: "SUBTERRANEAN // VAULT",
    material: "UHPC CONCRETE / BASALT",
    location: "AMERICAS // SANTIAGO",
    year: "2026",
    mass: "54,000 MT",
    category: "CONCRETE AMERICAS",
    image: "assets/img/photo-mass.svg",
    spec: "3,200m Altitude • Permafrost Preservation"
  },
  {
    id: "ST-111",
    title: "TOKYO ORBITAL LAUNCH PAD",
    typology: "MEGAPROJECT // AEROSPACE",
    material: "HEAT-RESIST CONCRETE / STEEL",
    location: "ASIA // TOKYO",
    year: "2026",
    mass: "140,000 MT",
    category: "MEGAPROJECT STEEL CONCRETE ASIA",
    image: "assets/img/kyoto-tower.svg",
    spec: "Refractory Thermal Shielding • 1,500°C Rated"
  },
  {
    id: "ST-112",
    title: "MONTREAL BRUTALIST LIBRARY",
    typology: "CIVIC // MONOLITH",
    material: "EXPOSED BOARD-FORM CONCRETE",
    location: "AMERICAS // MONTREAL",
    year: "2020",
    mass: "26,500 MT",
    category: "CONCRETE AMERICAS",
    image: "assets/img/reykjavik-vault.svg",
    spec: "Natural Sky-Grid Lighting • Raw Pine Textures"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderHeader('archive');
  initSmoothScroll();
  renderFooter();
  initMaskedText('.mask-text');
  initTracedGrid();

  const container = document.getElementById('ledger-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewToggleBtns = document.querySelectorAll('.toggle-btn');
  const popup = document.getElementById('hover-preview-popup');
  const popupImg = document.getElementById('popup-img');
  const popupTitle = document.getElementById('popup-title');
  const popupSpec = document.getElementById('popup-spec');

  let currentView = 'list';
  let currentFilter = 'ALL';

  // QuickTo cursor tracking for pop-up preview box
  let xTo = gsap.quickTo(popup, "left", { duration: 0.15, ease: "power3" });
  let yTo = gsap.quickTo(popup, "top", { duration: 0.15, ease: "power3" });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  function renderProjects() {
    if (!container) return;
    
    const filtered = PROJECTS.filter(p => {
      if (currentFilter === 'ALL') return true;
      return p.category.includes(currentFilter);
    });

    if (currentView === 'list') {
      container.className = 'ledger-container';
      container.innerHTML = `
        <div class="ledger-header-row">
          <span>PROJECT_ID</span>
          <span>COMMISSION TITLE</span>
          <span>TYPOLOGY</span>
          <span>MATERIAL MATRIX</span>
          <span>LOCATION</span>
          <span>MASS (MT)</span>
          <span>YEAR</span>
        </div>
        ${filtered.map((p, index) => `
          <div class="ledger-row" data-id="${p.id}" data-image="${p.image}" data-title="${p.title}" data-spec="${p.spec}">
            <span class="badge-mono">${p.id}</span>
            <span class="project-title">${p.title}</span>
            <span class="text-mono-xs">${p.typology}</span>
            <span class="text-mono-xs">${p.material}</span>
            <span class="text-mono-xs">${p.location}</span>
            <span class="font-mono" style="font-weight: 700;">${p.mass}</span>
            <span class="badge-mono-outline">${p.year}</span>
          </div>
        `).join('')}
      `;

      // Attach hover listeners for pop-up preview
      const rows = container.querySelectorAll('.ledger-row');
      rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
          popupImg.src = row.getAttribute('data-image');
          popupTitle.textContent = `${row.getAttribute('data-id')} // ${row.getAttribute('data-title')}`;
          popupSpec.textContent = `SPEC: ${row.getAttribute('data-spec')}`;
          popup.classList.add('active');
        });
        row.addEventListener('mouseleave', () => {
          popup.classList.remove('active');
        });
      });
    } else {
      // Grid View
      container.className = 'ledger-grid-view';
      container.innerHTML = filtered.map(p => `
        <div class="grid-project-card">
          <div>
            <div class="grid-card-img-wrapper">
              <img src="${p.image}" alt="${p.title}" />
            </div>
            <div class="grid-card-body">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span class="badge-mono">${p.id}</span>
                <span class="text-mono-xs">${p.year} • ${p.location}</span>
              </div>
              <h3 class="font-header" style="font-size: 1.6rem; margin-bottom: 1rem;">${p.title}</h3>
              <div class="font-mono text-mono-xs" style="color: var(--text-muted); margin-bottom: 1rem;">
                <div>TYPOLOGY: ${p.typology}</div>
                <div>MATERIAL: ${p.material}</div>
                <div>STRUCTURAL MASS: ${p.mass}</div>
              </div>
              <div class="badge-mono-outline" style="font-size: 0.7rem; width: 100%; text-align: center;">
                SPEC: ${p.spec}
              </div>
            </div>
          </div>
          <div style="padding: 1.5rem 2rem; border-top: var(--border-thick); background: var(--bg-secondary); display: flex; justify-content: space-between; align-items: center;">
            <span class="font-mono text-mono-xs">STATUS: COMMISSIONED</span>
            <span class="font-mono" style="font-weight: 800;">[ VIEW BLUEPRINT ➔ ]</span>
          </div>
        </div>
      `).join('');
    }

    // Animate container items
    gsap.from(container.children, {
      opacity: 0,
      y: 15,
      duration: 0.4,
      stagger: 0.04,
      ease: 'power2.out'
    });
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderProjects();
    });
  });

  // View toggle click handlers
  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.getAttribute('data-view');
      renderProjects();
    });
  });

  renderProjects();
});
