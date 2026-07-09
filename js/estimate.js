import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, renderHeader, renderFooter, initMaskedText, initTracedGrid } from './main.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  renderHeader('estimate');
  initSmoothScroll();
  renderFooter();
  initMaskedText('.mask-text');
  initTracedGrid();

  const widthInput = document.getElementById('slider-width');
  const lengthInput = document.getElementById('slider-length');
  const floorsInput = document.getElementById('slider-floors');
  const widthValEl = document.getElementById('val-width');
  const lengthValEl = document.getElementById('val-length');
  const floorsValEl = document.getElementById('val-floors');

  const typologyInputs = document.querySelectorAll('input[name="typology"]');
  const materialInputs = document.querySelectorAll('input[name="material"]');
  const hardnessInput = document.getElementById('select-hardness');

  // Receipt output elements
  const recVolumeEl = document.getElementById('rec-volume');
  const recTonnageEl = document.getElementById('rec-tonnage');
  const recRatingEl = document.getElementById('rec-rating');
  const recTimelineEl = document.getElementById('rec-timeline');
  const recCostEl = document.getElementById('rec-cost');
  const recSerialEl = document.getElementById('rec-serial');
  const recDateEl = document.getElementById('rec-date');

  // Generate random receipt serial once
  if (recSerialEl) {
    const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
    recSerialEl.textContent = `RECEIPT // #EST-${randomHex}-ST`;
  }
  if (recDateEl) {
    const now = new Date();
    recDateEl.textContent = `DISPATCH_DATE: ${now.toISOString().slice(0, 10)}`;
  }

  function calculateEstimate() {
    if (!widthInput || !lengthInput || !floorsInput) return;

    const width = parseFloat(widthInput.value) || 50;
    const length = parseFloat(lengthInput.value) || 50;
    const floors = parseFloat(floorsInput.value) || 10;

    // Update slider label readouts
    if (widthValEl) widthValEl.textContent = `${width} METERS`;
    if (lengthValEl) lengthValEl.textContent = `${length} METERS`;
    if (floorsValEl) floorsValEl.textContent = `${floors} LEVELS (${floors * 4.2}M)`;

    // Find active typology multiplier
    let typologyMult = 1.0;
    let typologyName = "COMMERCIAL TOWER";
    typologyInputs.forEach(radio => {
      if (radio.checked) {
        typologyMult = parseFloat(radio.getAttribute('data-mult')) || 1.0;
        typologyName = radio.value;
      }
    });

    // Find active material additions and rating
    let materialMult = 1.0;
    let checkedCount = 0;
    let hasSeismic = false;
    materialInputs.forEach(chk => {
      if (chk.checked) {
        checkedCount++;
        materialMult += parseFloat(chk.getAttribute('data-add')) || 0.15;
        if (chk.value.includes("SEISMIC")) hasSeismic = true;
      }
    });

    // Terrain Hardness Index
    const hardnessMult = parseFloat(hardnessInput ? hardnessInput.value : 1.0) || 1.0;

    // Calculate Volume M³ (assuming floor height 4.2m and structural concrete factor ~18% of footprint * floors)
    const footprintArea = width * length;
    const totalVolumeM3 = Math.round(footprintArea * floors * 4.2 * 0.18 * typologyMult);

    // Calculate Steel Tonnage (approx 120 kg of steel per M³ of concrete * hardness/material factor)
    const steelTonnageMT = Math.round((totalVolumeM3 * 0.125) * materialMult * (hardnessMult * 0.9));

    // Calculate Timeline (Months) based on volume and complexity
    const baseMonths = Math.max(12, Math.round(Math.pow(totalVolumeM3, 0.38) * typologyMult * hardnessMult));

    // Calculate Budget ($M USD) based on $1,400 per M³ UHPC + $4,500 per Tonne Corten + Engineering fees
    const rawCostUSD = (totalVolumeM3 * 1400) + (steelTonnageMT * 4500);
    const totalCostM = ((rawCostUSD * typologyMult * hardnessMult * materialMult) / 1000000).toFixed(1);

    // Structural Rating calculation
    let rating = "CLASS VIII // HEAVY LOAD";
    if (hasSeismic || hardnessMult > 1.3 || checkedCount >= 3) {
      rating = "CLASS IX-EX // SOVEREIGN MONOLITH";
    } else if (typologyName.includes("SUBTERRANEAN")) {
      rating = "CLASS X // SUBTERRANEAN BUNKER";
    }

    // Animate updates into receipt box
    if (recVolumeEl && recVolumeEl.textContent !== `${totalVolumeM3.toLocaleString()} M³`) {
      recVolumeEl.textContent = `${totalVolumeM3.toLocaleString()} M³`;
      gsap.fromTo(recVolumeEl, { backgroundColor: "#000", color: "#FFF" }, { backgroundColor: "transparent", color: "#000", duration: 0.3 });
    }
    if (recTonnageEl && recTonnageEl.textContent !== `${steelTonnageMT.toLocaleString()} MT`) {
      recTonnageEl.textContent = `${steelTonnageMT.toLocaleString()} MT`;
      gsap.fromTo(recTonnageEl, { backgroundColor: "#000", color: "#FFF" }, { backgroundColor: "transparent", color: "#000", duration: 0.3 });
    }
    if (recRatingEl) recRatingEl.textContent = rating;
    if (recTimelineEl) recTimelineEl.textContent = `${baseMonths} - ${baseMonths + 4} MONTHS`;
    if (recCostEl && recCostEl.textContent !== `$${totalCostM}M - $${(parseFloat(totalCostM) * 1.25).toFixed(1)}M USD`) {
      recCostEl.textContent = `$${totalCostM}M - $${(parseFloat(totalCostM) * 1.25).toFixed(1)}M USD`;
      gsap.fromTo(recCostEl, { backgroundColor: "#000", color: "#FFF" }, { backgroundColor: "transparent", color: "#000", duration: 0.3 });
    }
  }

  // Attach event listeners
  if (widthInput) widthInput.addEventListener('input', calculateEstimate);
  if (lengthInput) lengthInput.addEventListener('input', calculateEstimate);
  if (floorsInput) floorsInput.addEventListener('input', calculateEstimate);
  if (hardnessInput) hardnessInput.addEventListener('change', calculateEstimate);

  typologyInputs.forEach(el => el.addEventListener('change', calculateEstimate));
  materialInputs.forEach(el => el.addEventListener('change', calculateEstimate));

  // Initial calculation
  calculateEstimate();

  // Handle PDF / Spec button clicks
  const pdfBtn = document.getElementById('btn-generate-pdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const origText = pdfBtn.textContent;
      pdfBtn.textContent = "[ COMPILE_CAD_VECTOR... ]";
      gsap.to(pdfBtn, {
        scale: 0.98,
        duration: 0.1,
        onComplete: () => {
          setTimeout(() => {
            pdfBtn.textContent = "[ ✔ SPECIFICATION PDF BLUEPRINT GENERATED ]";
            alert("STRUCTURAL BLUEPRINT GENERATED:\nReceipt #EST-SPEC-2026 saved to client memory buffer.\nOur chief structural engineers will review dimensions within 24 hours.");
            setTimeout(() => { pdfBtn.textContent = origText; }, 3000);
          }, 800);
        }
      });
    });
  }
});
