import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Export instances so individual pages can use them
export let lenis;

/* ==========================================================================
   01. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER INTEGRATION
   ========================================================================== */
export function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0, 0);

  // Re-enable ScrollTrigger refresh when resizing
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

/* ==========================================================================
   02. NAVIGATION HEADER & FOOTER RENDERING
   ========================================================================== */
export function renderHeader(activePage = 'home') {
  const headerHtml = `
    <header class="nav-header">
      <a href="index.html" class="nav-logo">
        STRUCT <span>// MONOLITH ARCH.</span>
      </a>
      <nav class="nav-links">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">[01] HOME</a>
        <a href="archive.html" class="nav-link ${activePage === 'archive' ? 'active' : ''}">[02] ARCHIVE</a>
        <a href="capabilities.html" class="nav-link ${activePage === 'capabilities' ? 'active' : ''}">[03] CAPABILITIES</a>
        <a href="manifesto.html" class="nav-link ${activePage === 'manifesto' ? 'active' : ''}">[04] MANIFESTO</a>
        <a href="estimate.html" class="nav-link ${activePage === 'estimate' ? 'active' : ''}">[05] ESTIMATE</a>
      </nav>
      <button id="mobile-nav-toggle" class="mobile-nav-toggle font-mono" aria-label="Toggle Navigation Menu">
        <span>[ MENU // + ]</span>
      </button>
    </header>

    <!-- Full-Screen Neobrutalist Mobile Navigation Overlay -->
    <div id="mobile-nav-overlay" class="mobile-nav-overlay">
      <div class="mobile-nav-header">
        <a href="index.html" class="nav-logo" style="color: #FFF;">
          STRUCT <span>// MONOLITH ARCH.</span>
        </a>
        <button id="mobile-nav-close" class="btn-neo-white font-mono" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">
          [ CLOSE // X ]
        </button>
      </div>
      <div class="mobile-nav-links">
        <a href="index.html" class="mobile-nav-link ${activePage === 'home' ? 'active' : ''}">
          <span class="mobile-num">[01]</span>
          <span class="mobile-title">HOME</span>
          <span class="mobile-sub">// LANDING PROTOCOL</span>
        </a>
        <a href="archive.html" class="mobile-nav-link ${activePage === 'archive' ? 'active' : ''}">
          <span class="mobile-num">[02]</span>
          <span class="mobile-title">ARCHIVE</span>
          <span class="mobile-sub">// GLOBAL COMMISSIONS LEDGER</span>
        </a>
        <a href="capabilities.html" class="mobile-nav-link ${activePage === 'capabilities' ? 'active' : ''}">
          <span class="mobile-num">[03]</span>
          <span class="mobile-title">CAPABILITIES</span>
          <span class="mobile-sub">// ENGINEERING & BLUEPRINTS</span>
        </a>
        <a href="manifesto.html" class="mobile-nav-link ${activePage === 'manifesto' ? 'active' : ''}">
          <span class="mobile-num">[04]</span>
          <span class="mobile-title">MANIFESTO</span>
          <span class="mobile-sub">// THE ETHICS OF RAW MASS</span>
        </a>
        <a href="estimate.html" class="mobile-nav-link ${activePage === 'estimate' ? 'active' : ''}">
          <span class="mobile-num">[05]</span>
          <span class="mobile-title">ESTIMATE</span>
          <span class="mobile-sub">// BESPOKE INITIATION SPEC</span>
        </a>
      </div>
      <div class="mobile-nav-footer">
        <div class="font-mono text-mono-xs" style="color: #AAA; margin-bottom: 0.6rem;">LAT: 34°03'N / LON: 118°15'W • SAN ANDREAS HQ</div>
        <div class="font-mono text-mono-xs" style="color: #00FF66; font-weight: 700;">● SYSTEM TERMINAL ONLINE // V4.8</div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHtml);
  startLiveClock();
  initMobileNav();
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const closeBtn = document.getElementById('mobile-nav-close');
  const overlay = document.getElementById('mobile-nav-overlay');
  const navLinks = overlay ? overlay.querySelectorAll('.mobile-nav-link') : [];

  if (!toggleBtn || !closeBtn || !overlay) return;

  function openMenu() {
    if (overlay.parentElement !== document.body) {
      document.body.appendChild(overlay);
    }
    gsap.killTweensOf(overlay);
    gsap.set(overlay, { display: 'flex', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999999, yPercent: -100 });
    gsap.to(overlay, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power4.out',
      onStart: () => {
        if (lenis && typeof lenis.stop === 'function') lenis.stop();
        document.body.style.overflow = 'hidden';
      }
    });
    gsap.fromTo(navLinks,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );
  }

  function closeMenu() {
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
        if (lenis && typeof lenis.start === 'function') lenis.start();
        document.body.style.overflow = '';
      }
    });
  }

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

function startLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;
  setInterval(() => {
    const now = new Date();
    const timeStr = now.toISOString().slice(11, 19);
    clockEl.textContent = `LAT: 34°03'N • ${timeStr} UTC`;
  }, 1000);
}

export function renderFooter() {
  const footerHtml = `
    <footer class="footer-section">
      <!-- Grid Border Divider -->
      <div class="grid-line-h" style="top: 0; transform: scaleX(1);"></div>
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">STRUCT</div>
          <div class="footer-sub">AVANT-GARDE NEOBRUTALIST MONOLITHIC CONSTRUCTION FIRM • EST. 1998 ZURICH / LA / TOKYO</div>
          <a href="estimate.html" class="btn-neo">INITIATE BESPOKE PROJECT ➔</a>
        </div>
        <div class="footer-col">
          <div class="footer-heading">[ DIRECT INDEX ]</div>
          <ul class="footer-list">
            <li><a href="index.html">01 // Home (Landing Page)</a></li>
            <li><a href="archive.html">02 // Archive (Projects Index)</a></li>
            <li><a href="capabilities.html">03 // Capabilities (Engineering)</a></li>
            <li><a href="manifesto.html">04 // Manifesto (Philosophy)</a></li>
            <li><a href="estimate.html">05 // Estimate / Contact Form</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <div class="footer-heading">[ TECHNICAL STANDARDS ]</div>
          <ul class="footer-list font-mono" style="font-size: 0.85rem; color: var(--text-secondary);">
            <li>• ISO-9001 SEISMIC CERTIFIED</li>
            <li>• ASTM C1856 UHPC CONCRETE</li>
            <li>• TENSILE STEEL GRADE 80</li>
            <li>• HIGH-DENSITY THERMAL MASS</li>
            <li>• CAD/BIM BLUEPRINT DIRECT</li>
          </ul>
        </div>
        <div class="footer-col">
          <div class="footer-heading">[ BLUEPRINT TERMINAL DISPATCH ]</div>
          <p class="font-mono" style="font-size: 0.85rem; margin-bottom: 1.2rem; color: var(--text-secondary);">
            Receive quarterly architectural dispatches, structural load analytics, and concrete formulation papers.
          </p>
          <div style="display: flex; gap: 0.5rem;">
            <input type="email" placeholder="ARCHITECT@FIRM.COM" class="neo-input" style="padding: 0.8rem; font-size: 0.8rem;" />
            <button class="btn-neo-black" style="padding: 0.8rem 1.2rem; font-size: 0.8rem;">JOIN</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 STRUCT MONOLITH ARCHITECTURE GMBH. ALL RIGHTS RESERVED.</div>
        <div>SYS_BUILD: V4.8.2 // RAW_MASS_PROTOCOL</div>
      </div>
    </footer>
  `;

  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.insertAdjacentHTML('beforeend', footerHtml);
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHtml);
  }
}

/* ==========================================================================
   03. FLICKER / TICKER TEXT REVEAL ENGINE
   ========================================================================== */
export function initFlickerReveal(selector = '.flicker-text') {
  const elements = document.querySelectorAll(selector);
  const glyphs = ['+', '-', '|', '/', '[', ']', '#', '0', '1', '4', '8', '9', 'X', 'K', 'Z'];

  elements.forEach((el) => {
    const originalText = el.getAttribute('data-original') || el.textContent.trim();
    el.setAttribute('data-original', originalText);
    
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => runFlicker(el, originalText, glyphs)
    });
  });
}

export function runFlicker(el, text, glyphs = ['+', '-', '|', '/', '#', '0', '1', '9', 'X', 'Z']) {
  let iterations = 0;
  const maxIterations = text.length * 2.5;
  const interval = setInterval(() => {
    el.textContent = text
      .split('')
      .map((letter, index) => {
        if (letter === ' ') return ' ';
        if (index < iterations / 2.5) {
          return letter;
        }
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');

    if (iterations >= maxIterations) {
      clearInterval(interval);
      el.textContent = text;
    }
    iterations += 1;
  }, 25);
}

/* ==========================================================================
   04. MASKED CHARACTER SLIDE-UP WRAPPER & ANIMATION
   ========================================================================== */
export function initMaskedText(selector = '.mask-text') {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el) => {
    // If already wrapped, skip
    if (el.querySelector('.split-mask-inner')) return;
    
    const lines = el.innerHTML.split('<br>').map(line => line.trim()).filter(Boolean);
    if (lines.length > 1) {
      el.innerHTML = lines.map(line => `
        <span class="split-mask-wrapper">
          <span class="split-mask-inner">${line}</span>
        </span>
      `).join('<br>');
    } else {
      const text = el.textContent.trim();
      // Split words or lines
      const words = text.split(' ');
      el.innerHTML = words.map(word => `
        <span class="split-mask-wrapper">
          <span class="split-mask-inner">${word}</span>
        </span>
      `).join(' ');
    }

    const inners = el.querySelectorAll('.split-mask-inner');
    gsap.to(inners, {
      y: '0%',
      duration: 1.1,
      stagger: 0.08,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });
}

/* ==========================================================================
   05. TRACED LAYOUT GRID ANIMATIONS (ScrollTrigger scaleX / scaleY)
   ========================================================================== */
export function initTracedGrid() {
  const hLines = document.querySelectorAll('.grid-line-h:not([style*="scaleX(1)"])');
  const vLines = document.querySelectorAll('.grid-line-v:not([style*="scaleY(1)"])');

  hLines.forEach((line) => {
    gsap.fromTo(line, 
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: line.parentElement || line,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  vLines.forEach((line) => {
    gsap.fromTo(line, 
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: line.parentElement || line,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
