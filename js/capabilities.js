import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, renderHeader, renderFooter, initMaskedText, initTracedGrid } from './main.js';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: "01",
    title: "MONOLITHIC CONCRETE ENGINEERING",
    subtitle: "ULTRA-HIGH PERFORMANCE FIBER CONCRETE (UHPFRC) & DIRECT POUR GRIDS",
    description: "Our core discipline. We cast uninterrupted load-bearing concrete monoliths up to 1,200 cubic meters per continuous pour. By blending amorphous silica fume with micro-steel tensile fibers, our UHPFRC eliminates the need for secondary crack waterproofing and achieves compressive ratings up to 180 MPa while preserving crisp, self-supported 90-degree neobrutalist corners.",
    specs: [
      { label: "COMPRESSIVE YIELD RATING", value: "180 MPa (ASTM C1856)" },
      { label: "CONTINUOUS POUR VELOCITY", value: "120 - 240 M³ / HR" },
      { label: "CORNER EDGE TOLERANCE", value: "±0.1 MM / UNCHIPPED" },
      { label: "MICRO-STEEL FIBER DENSITY", value: "3.2% BY VOLUME" }
    ],
    svgContent: `
      <!-- Isometric Concrete Rebar Cage Core Blueprint -->
      <g class="layer-outer">
        <polygon points="200,30 340,100 340,280 200,350 60,280 60,100" fill="none" stroke="#000" stroke-width="3"/>
        <line x1="200" y1="30" x2="200" y2="350" stroke="#000" stroke-width="2" stroke-dasharray="6,6"/>
        <line x1="60" y1="100" x2="340" y2="100" stroke="#000" stroke-width="2"/>
        <line x1="60" y1="280" x2="340" y2="280" stroke="#000" stroke-width="2"/>
      </g>
      <g class="layer-inner">
        <!-- Rebar grid -->
        <line x1="100" y1="80" x2="100" y2="300" stroke="#000" stroke-width="3"/>
        <line x1="150" y1="60" x2="150" y2="320" stroke="#000" stroke-width="3"/>
        <line x1="250" y1="60" x2="250" y2="320" stroke="#000" stroke-width="3"/>
        <line x1="300" y1="80" x2="300" y2="300" stroke="#000" stroke-width="3"/>
        <path d="M 80,140 L 320,140 M 80,200 L 320,200 M 80,260 L 320,260" stroke="#000" stroke-width="2.5"/>
        <circle cx="200" cy="190" r="45" fill="none" stroke="#000" stroke-width="3"/>
      </g>
    `
  },
  {
    id: "02",
    title: "SEISMIC & DYNAMIC LOAD REINFORCING",
    subtitle: "ELASTOMERIC BASE ISOLATION & VISCOUS SHEAR DAMPENERS",
    description: "In tectonically active zones, mass alone is insufficient. We engineer subterranean elastomeric raft bearings and hydraulic diagonal shear dampeners that isolate kinetic ground waves from the superstructure. During a Class IX seismic shock, the building core glides smoothly up to ±650 mm horizontally without transmitting shear stress to upper floor slabs.",
    specs: [
      { label: "SEISMIC RATING CERTIFICATION", value: "CLASS IX-EX TECTONIC" },
      { label: "HORIZONTAL RAFT DISPLACEMENT", value: "±650 MM NOMINAL" },
      { label: "DAMPENING RECOVERY SPEED", value: "0.8 SECONDS / WAVE" },
      { label: "BEARING MATERIAL MATRIX", value: "LEAD-RUBBER LAMINATE" }
    ],
    svgContent: `
      <!-- Base Isolation Shear Dampener Blueprint -->
      <g class="layer-outer">
        <rect x="50" y="40" width="300" height="40" fill="none" stroke="#000" stroke-width="4"/>
        <rect x="50" y="280" width="300" height="40" fill="none" stroke="#000" stroke-width="4"/>
      </g>
      <g class="layer-inner">
        <!-- Dual Isolator Nodes -->
        <circle cx="130" cy="180" r="50" fill="none" stroke="#000" stroke-width="3"/>
        <circle cx="270" cy="180" r="50" fill="none" stroke="#000" stroke-width="3"/>
        <circle cx="130" cy="180" r="20" fill="#000" opacity="0.1"/>
        <circle cx="270" cy="180" r="20" fill="#000" opacity="0.1"/>
        <line x1="130" y1="80" x2="130" y2="130" stroke="#000" stroke-width="4"/>
        <line x1="130" y1="230" x2="130" y2="280" stroke="#000" stroke-width="4"/>
        <line x1="270" y1="80" x2="270" y2="130" stroke="#000" stroke-width="4"/>
        <line x1="270" y1="230" x2="270" y2="280" stroke="#000" stroke-width="4"/>
        <!-- Diagonal Hydraulic Struts -->
        <line x1="80" y1="80" x2="220" y2="280" stroke="#000" stroke-width="2.5" stroke-dasharray="8,4"/>
        <line x1="320" y1="80" x2="180" y2="280" stroke="#000" stroke-width="2.5" stroke-dasharray="8,4"/>
      </g>
    `
  },
  {
    id: "03",
    title: "HEAVY STEEL STRUCTURAL FABRICATION",
    subtitle: "UNPAINTED OXIDIZED CORTEN EXOSKELETONS & BOX TRUSSES",
    description: "Where structural spans exceed 30 meters, we deploy heavy Corten steel box trusses. Unpainted by design, our high-tensile steel forms a protective self-sealing oxidized patina within 12 months of exposure. This raw rust armature provides unyielding tensile rigidity (`800 MPa`) while contrasting dramatically with pristine gray board-formed concrete cores.",
    specs: [
      { label: "TENSILE YIELD CAPACITY", value: "800 MPa GRADE STEEL" },
      { label: "UNSUPPORTED CLEAR SPAN", value: "UP TO 64 METERS" },
      { label: "OXIDATION SEAL TIMELINE", value: "12 MONTHS PASSIVE" },
      { label: "WELDING JOINT TOLERANCE", value: "ULTRASONIC 100% TESTED" }
    ],
    svgContent: `
      <!-- Heavy Steel Corten Box Truss Blueprint -->
      <g class="layer-outer">
        <polygon points="40,180 200,60 360,180 200,300" fill="none" stroke="#000" stroke-width="4"/>
      </g>
      <g class="layer-inner">
        <!-- Internal Truss Webbing -->
        <line x1="40" y1="180" x2="360" y2="180" stroke="#000" stroke-width="3"/>
        <line x1="200" y1="60" x2="200" y2="300" stroke="#000" stroke-width="3"/>
        <line x1="120" y1="120" x2="280" y2="240" stroke="#000" stroke-width="2.5"/>
        <line x1="280" y1="120" x2="120" y2="240" stroke="#000" stroke-width="2.5"/>
        <circle cx="200" cy="180" r="25" fill="#FFF" stroke="#000" stroke-width="4"/>
        <circle cx="200" cy="180" r="8" fill="#000"/>
        <!-- Rivet Node Markers -->
        <circle cx="120" cy="120" r="6" fill="#000"/>
        <circle cx="280" cy="120" r="6" fill="#000"/>
        <circle cx="120" cy="240" r="6" fill="#000"/>
        <circle cx="280" cy="240" r="6" fill="#000"/>
      </g>
    `
  },
  {
    id: "04",
    title: "SUBTERRANEAN FOUNDATION BLUEPRINTING",
    subtitle: "DEEP CAISSON PILES & BASALT BEDROCK ANCHORING",
    description: "Every monolith requires an unmovable root system. We drill high-density reinforced caisson piles up to 60 meters deep into solid granite or basalt bedrock. Combined with post-tensioned soil nails and continuous bentonite slurry walls, our subterranean vaults remain completely impervious to hydrostatic groundwater pressure and soil liquefaction.",
    specs: [
      { label: "CAISSON PILE DRILL DEPTH", value: "UP TO -65 METERS" },
      { label: "BEDROCK ANCHOR TENSILE RATING", value: "4,500 kN / ANCHOR" },
      { label: "HYDROSTATIC SHIELDING", value: "10 BAR WATERPROOF" },
      { label: "SOIL LIQUEFACTION FACTOR", value: "ZERO SHEAR LOSS" }
    ],
    svgContent: `
      <!-- Subterranean Bedrock Caisson Blueprint -->
      <g class="layer-outer">
        <rect x="100" y="30" width="200" height="60" fill="none" stroke="#000" stroke-width="4"/>
        <line x1="40" y1="90" x2="360" y2="90" stroke="#000" stroke-width="3"/>
      </g>
      <g class="layer-inner">
        <!-- Deep Piles -->
        <rect x="130" y="90" width="35" height="240" fill="none" stroke="#000" stroke-width="3"/>
        <rect x="235" y="90" width="35" height="240" fill="none" stroke="#000" stroke-width="3"/>
        <!-- Bedrock Stratigraphy Lines -->
        <path d="M 40,160 Q 150,180 360,150" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="4,4"/>
        <path d="M 40,240 Q 200,220 360,250" fill="none" stroke="#000" stroke-width="2" stroke-dasharray="6,3"/>
        <!-- Bedrock Anchor Claws -->
        <polygon points="125,330 168,330 147,355" fill="#000"/>
        <polygon points="230,330 273,330 252,355" fill="#000"/>
      </g>
    `
  },
  {
    id: "05",
    title: "PRECAST HIGH-DENSITY FAÇADE SYSTEMS",
    subtitle: "THERMAL MASS WALL PANELS & DEEP LOUVER MATRICES",
    description: "Instead of glass curtain walls that leak energy, we fabricate massive precast concrete façade panels weighing up to 18 tonnes each. Deep angled louvers cast directly into the panel geometry block high-angle summer solar radiation while letting low-angle winter sunlight penetrate deep into interior floors, cutting cooling demands by 64%.",
    specs: [
      { label: "SINGLE PANEL WEIGHT MASS", value: "UP TO 18.5 TONNES" },
      { label: "SOLAR HEAT GAIN CUT", value: "-64% PASSIVE SHIELD" },
      { label: "THERMAL STORAGE LAG", value: "11.5 HOURS DIURNAL" },
      { label: "INTERLOCK MOUNTING JOINT", value: "DOUBLE NEOPRENE SEAL" }
    ],
    svgContent: `
      <!-- Precast Façade Louver Matrix Blueprint -->
      <g class="layer-outer">
        <rect x="80" y="40" width="240" height="280" fill="none" stroke="#000" stroke-width="4"/>
      </g>
      <g class="layer-inner">
        <!-- Angled Louvers -->
        <polygon points="80,70 320,110 320,140 80,100" fill="none" stroke="#000" stroke-width="3"/>
        <polygon points="80,150 320,190 320,220 80,180" fill="none" stroke="#000" stroke-width="3"/>
        <polygon points="80,230 320,270 320,300 80,260" fill="none" stroke="#000" stroke-width="3"/>
        <!-- Solar Ray Vectors -->
        <line x1="360" y1="60" x2="280" y2="100" stroke="#000" stroke-width="2" stroke-dasharray="4,4"/>
        <line x1="360" y1="140" x2="280" y2="180" stroke="#000" stroke-width="2" stroke-dasharray="4,4"/>
        <circle cx="280" cy="100" r="5" fill="#000"/>
        <circle cx="280" cy="180" r="5" fill="#000"/>
      </g>
    `
  },
  {
    id: "06",
    title: "ACOUSTIC & THERMAL MASS ISOLATION",
    subtitle: "ANECHOIC CONCRETE BUNKERING & VIBRATION DAMPING",
    description: "Designed for sovereign data installations and research vaults requiring complete electromagnetic and acoustic isolation. By casting dual-skin concrete walls separated by a 300mm evacuated acoustic air gap and heavy basalt rock wool, exterior sonic pressure (up to 120 dB) is completely neutralized inside the core.",
    specs: [
      { label: "SONIC DAMPENING RATING", value: "100 dB+ TRANSMISSION LOSS" },
      { label: "DUAL WALL THICKNESS", value: "800 MM TOTAL MATRIX" },
      { label: "AIR GAP VACUUM SEPARATION", value: "300 MM ISOLATED CAVITY" },
      { label: "ELECTROMAGNETIC SHIELDING", value: "MIL-STD-188-125 EMP" }
    ],
    svgContent: `
      <!-- Dual Skin Acoustic Bunker Blueprint -->
      <g class="layer-outer">
        <rect x="60" y="50" width="80" height="260" fill="none" stroke="#000" stroke-width="4"/>
        <rect x="260" y="50" width="80" height="260" fill="none" stroke="#000" stroke-width="4"/>
      </g>
      <g class="layer-inner">
        <!-- Acoustic Dampening Waves in Air Gap -->
        <path d="M 160,80 Q 180,60 200,80 Q 220,100 240,80" fill="none" stroke="#000" stroke-width="2"/>
        <path d="M 160,150 Q 180,130 200,150 Q 220,170 240,150" fill="none" stroke="#000" stroke-width="2"/>
        <path d="M 160,220 Q 180,200 200,220 Q 220,240 240,220" fill="none" stroke="#000" stroke-width="2"/>
        <!-- Acoustic Absorption Wedges inside walls -->
        <polygon points="140,90 160,100 140,110" fill="#000"/>
        <polygon points="260,90 240,100 260,110" fill="#000"/>
        <polygon points="140,160 160,170 140,180" fill="#000"/>
        <polygon points="260,160 240,170 260,180" fill="#000"/>
        <polygon points="140,230 160,240 140,250" fill="#000"/>
        <polygon points="260,230 240,240 260,250" fill="#000"/>
      </g>
    `
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderHeader('capabilities');
  initSmoothScroll();
  renderFooter();
  initMaskedText('.mask-text');
  initTracedGrid();

  const servicesListEl = document.getElementById('services-list');
  const serviceIdEl = document.getElementById('service-id');
  const serviceTitleEl = document.getElementById('service-title');
  const serviceSubEl = document.getElementById('service-subtitle');
  const serviceDescEl = document.getElementById('service-description');
  const serviceSvgEl = document.getElementById('service-svg');
  const specTableBodyEl = document.getElementById('spec-table-body');

  function selectService(index) {
    const data = SERVICES_DATA[index];
    
    // Update active UI states
    const rows = servicesListEl.querySelectorAll('.service-row');
    rows.forEach((row, i) => {
      if (i === index) row.classList.add('active');
      else row.classList.remove('active');
    });

    // Update text content with quick fade animation
    gsap.to(['#service-title', '#service-subtitle', '#service-description', '#spec-table-container'], {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        serviceIdEl.textContent = `[ SERVICE SPECIFICATION // #${data.id} ]`;
        serviceTitleEl.textContent = data.title;
        serviceSubEl.textContent = data.subtitle;
        serviceDescEl.textContent = data.description;

        // Update specs table
        specTableBodyEl.innerHTML = data.specs.map(s => `
          <tr>
            <td style="font-weight: 700;">${s.label}</td>
            <td>${s.value}</td>
          </tr>
        `).join('');

        gsap.to(['#service-title', '#service-subtitle', '#service-description', '#spec-table-container'], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    // Animate blueprint vector drawing
    serviceSvgEl.innerHTML = data.svgContent;
    const paths = serviceSvgEl.querySelectorAll('path, line, rect, circle, polygon');
    
    paths.forEach(p => {
      const length = p.getTotalLength ? p.getTotalLength() : 800;
      p.style.strokeDasharray = length;
      p.style.strokeDashoffset = length;
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.4,
      stagger: 0.05,
      ease: 'power3.inOut'
    });
  }

  // Populate Services List
  if (servicesListEl) {
    servicesListEl.innerHTML = SERVICES_DATA.map((s, idx) => `
      <div class="service-row ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <div class="service-index">[${s.id}]</div>
        <div class="service-title">${s.title}</div>
      </div>
    `).join('');

    const rows = servicesListEl.querySelectorAll('.service-row');
    rows.forEach((row, idx) => {
      row.addEventListener('click', () => selectService(idx));
    });

    // Initial load selection
    selectService(0);
  }
});
