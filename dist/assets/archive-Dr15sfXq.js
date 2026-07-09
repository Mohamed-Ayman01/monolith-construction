import{g as o,S,r as R,i as O,a as p,b as C,c as y}from"./main-DpI-GIT5.js";o.registerPlugin(S);const I=[{id:"ST-101",title:"KYOTO MONOLITH TOWER",typology:"MEGAPROJECT // TOWER",material:"REINFORCED CONCRETE / CORTEN",location:"ASIA // KYOTO",year:"2024",mass:"48,200 MT",category:"MEGAPROJECT CONCRETE ASIA",image:"assets/img/kyoto-tower.svg",spec:"38 Floors • Seismic Exoskeleton Class IX"},{id:"ST-102",title:"REYKJAVIK THERMAL VAULT",typology:"SUBTERRANEAN // VAULT",material:"UHPC CONCRETE / BASALT",location:"EUROPE // REYKJAVIK",year:"2025",mass:"62,000 MT",category:"CONCRETE EUROPE",image:"assets/img/reykjavik-vault.svg",spec:"-45m Subsurface • Geothermal Containment"},{id:"ST-103",title:"BRUTALIST DATA FORTRESS",typology:"INDUSTRIAL // FORTRESS",material:"PRECAST CONCRETE / STEEL",location:"EUROPE // ZURICH",year:"2023",mass:"34,500 MT",category:"CONCRETE STEEL EUROPE",image:"assets/img/data-fortress.svg",spec:"EMP Hardened • Passive Updraft Cooling"},{id:"ST-104",title:"VALLETTA COASTAL SEAWALL",typology:"INFRASTRUCTURE // COASTAL",material:"SALTWATER RESIST CONCRETE",location:"EUROPE // MALTA",year:"2026",mass:"115,000 MT",category:"MEGAPROJECT CONCRETE EUROPE",image:"assets/img/valletta-seawall.svg",spec:"18.5m Wave Surge Shield • Tetrapod Matrix"},{id:"ST-105",title:"OSLO SUBTERRANEAN SILO",typology:"SUBTERRANEAN // SILO",material:"POST-TENSIONED CONCRETE",location:"EUROPE // OSLO",year:"2022",mass:"29,800 MT",category:"CONCRETE EUROPE",image:"assets/img/strip-1.svg",spec:"Underground Deep Storage • High Tensile Core"},{id:"ST-106",title:"LOS ANGELES SEISMIC PIER",typology:"INFRASTRUCTURE // BRIDGE",material:"HEAVY STEEL FABRICATION",location:"AMERICAS // LA",year:"2024",mass:"84,000 MT",category:"MEGAPROJECT STEEL AMERICAS",image:"assets/img/strip-2.svg",spec:"Elastomeric Base Isolators • San Andreas Rated"},{id:"ST-107",title:"BERLIN MONOLITH CANOPY",typology:"CIVIC // CANOPY",material:"CORTEN STEEL / UHPC",location:"EUROPE // BERLIN",year:"2021",mass:"18,400 MT",category:"STEEL CONCRETE EUROPE",image:"assets/img/strip-3.svg",spec:"Cantilever 28m Span • Oxidized Corten Trusses"},{id:"ST-108",title:"SÃO PAULO HIGH-DENSITY GRID",typology:"MEGAPROJECT // TOWER",material:"REINFORCED CONCRETE",location:"AMERICAS // SÃO PAULO",year:"2025",mass:"92,000 MT",category:"MEGAPROJECT CONCRETE AMERICAS",image:"assets/img/strip-4.svg",spec:"44 Stories • Monolithic Shear Core"},{id:"ST-109",title:"SEOUL ACOUSTIC BUNKER",typology:"INSTITUTIONAL // BUNKER",material:"HIGH-DENSITY MASS CONCRETE",location:"ASIA // SEOUL",year:"2023",mass:"41,000 MT",category:"CONCRETE ASIA",image:"assets/img/strip-5.svg",spec:"100dB Sound Isolation • 800mm Walls"},{id:"ST-110",title:"SANTIAGO ALPINE SEED VAULT",typology:"SUBTERRANEAN // VAULT",material:"UHPC CONCRETE / BASALT",location:"AMERICAS // SANTIAGO",year:"2026",mass:"54,000 MT",category:"CONCRETE AMERICAS",image:"assets/img/photo-mass.svg",spec:"3,200m Altitude • Permafrost Preservation"},{id:"ST-111",title:"TOKYO ORBITAL LAUNCH PAD",typology:"MEGAPROJECT // AEROSPACE",material:"HEAT-RESIST CONCRETE / STEEL",location:"ASIA // TOKYO",year:"2026",mass:"140,000 MT",category:"MEGAPROJECT STEEL CONCRETE ASIA",image:"assets/img/kyoto-tower.svg",spec:"Refractory Thermal Shielding • 1,500°C Rated"},{id:"ST-112",title:"MONTREAL BRUTALIST LIBRARY",typology:"CIVIC // MONOLITH",material:"EXPOSED BOARD-FORM CONCRETE",location:"AMERICAS // MONTREAL",year:"2020",mass:"26,500 MT",category:"CONCRETE AMERICAS",image:"assets/img/reykjavik-vault.svg",spec:"Natural Sky-Grid Lighting • Raw Pine Textures"}];document.addEventListener("DOMContentLoaded",()=>{R("archive"),O(),p(),C(".mask-text"),y();const s=document.getElementById("ledger-container"),E=document.querySelectorAll(".filter-btn"),l=document.querySelectorAll(".toggle-btn"),i=document.getElementById("hover-preview-popup"),c=document.getElementById("popup-img"),d=document.getElementById("popup-title"),m=document.getElementById("popup-spec");let T="list",r="ALL",g=o.quickTo(i,"left",{duration:.15,ease:"power3"}),A=o.quickTo(i,"top",{duration:.15,ease:"power3"});window.addEventListener("mousemove",a=>{g(a.clientX),A(a.clientY)});function n(){if(!s)return;const a=I.filter(t=>r==="ALL"?!0:t.category.includes(r));T==="list"?(s.className="ledger-container",s.innerHTML=`
        <div class="ledger-header-row">
          <span>PROJECT_ID</span>
          <span>COMMISSION TITLE</span>
          <span>TYPOLOGY</span>
          <span>MATERIAL MATRIX</span>
          <span>LOCATION</span>
          <span>MASS (MT)</span>
          <span>YEAR</span>
        </div>
        ${a.map((e,L)=>`
          <div class="ledger-row" data-id="${e.id}" data-image="${e.image}" data-title="${e.title}" data-spec="${e.spec}">
            <span class="badge-mono">${e.id}</span>
            <span class="project-title">${e.title}</span>
            <span class="text-mono-xs">${e.typology}</span>
            <span class="text-mono-xs">${e.material}</span>
            <span class="text-mono-xs">${e.location}</span>
            <span class="font-mono" style="font-weight: 700;">${e.mass}</span>
            <span class="badge-mono-outline">${e.year}</span>
          </div>
        `).join("")}
      `,s.querySelectorAll(".ledger-row").forEach(e=>{e.addEventListener("mouseenter",()=>{c.src=e.getAttribute("data-image"),d.textContent=`${e.getAttribute("data-id")} // ${e.getAttribute("data-title")}`,m.textContent=`SPEC: ${e.getAttribute("data-spec")}`,i.classList.add("active")}),e.addEventListener("mouseleave",()=>{i.classList.remove("active")})})):(s.className="ledger-grid-view",s.innerHTML=a.map(t=>`
        <div class="grid-project-card">
          <div>
            <div class="grid-card-img-wrapper">
              <img src="${t.image}" alt="${t.title}" />
            </div>
            <div class="grid-card-body">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span class="badge-mono">${t.id}</span>
                <span class="text-mono-xs">${t.year} • ${t.location}</span>
              </div>
              <h3 class="font-header" style="font-size: 1.6rem; margin-bottom: 1rem;">${t.title}</h3>
              <div class="font-mono text-mono-xs" style="color: var(--text-muted); margin-bottom: 1rem;">
                <div>TYPOLOGY: ${t.typology}</div>
                <div>MATERIAL: ${t.material}</div>
                <div>STRUCTURAL MASS: ${t.mass}</div>
              </div>
              <div class="badge-mono-outline" style="font-size: 0.7rem; width: 100%; text-align: center;">
                SPEC: ${t.spec}
              </div>
            </div>
          </div>
          <div style="padding: 1.5rem 2rem; border-top: var(--border-thick); background: var(--bg-secondary); display: flex; justify-content: space-between; align-items: center;">
            <span class="font-mono text-mono-xs">STATUS: COMMISSIONED</span>
            <span class="font-mono" style="font-weight: 800;">[ VIEW BLUEPRINT ➔ ]</span>
          </div>
        </div>
      `).join("")),o.from(s.children,{opacity:0,y:15,duration:.4,stagger:.04,ease:"power2.out"})}E.forEach(a=>{a.addEventListener("click",()=>{E.forEach(t=>t.classList.remove("active")),a.classList.add("active"),r=a.getAttribute("data-filter"),n()})}),l.forEach(a=>{a.addEventListener("click",()=>{l.forEach(t=>t.classList.remove("active")),a.classList.add("active"),T=a.getAttribute("data-view"),n()})}),n()});
