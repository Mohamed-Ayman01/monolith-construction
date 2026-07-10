import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, renderHeader, renderFooter, initMaskedText, initTracedGrid } from './main.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  renderHeader('manifesto');
  initSmoothScroll();
  renderFooter();
  initMaskedText('.mask-text');
  initTracedGrid();

  // 1. Vertical Timeline Traced Line Animation
  const timelineLine = document.getElementById('timeline-center-line');
  const timelineContainer = document.getElementById('timeline-container');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineLine && timelineContainer) {
    gsap.fromTo(timelineLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer,
          start: 'top 100%',
          end: 'bottom 30%',
          scrub: 0.5
        }
      }
    );
  }

  // 2. Timeline Item Node Highlight & Card Reveal
  timelineItems.forEach((item) => {
    const node = item.querySelector('.timeline-node');
    const card = item.querySelector('.timeline-card');

    ScrollTrigger.create({
      trigger: item,
      start: 'top 75%',
      onEnter: () => {
        item.classList.add('active');
        gsap.fromTo(card,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      },
      onLeaveBack: () => {
        item.classList.remove('active');
      }
    });
  });

  // 3. Leadership Bio Cards Stagger Reveal
  gsap.from('.bio-card', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.bio-section',
      start: 'top 80%'
    }
  });
});
