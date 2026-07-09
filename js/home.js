import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, renderHeader, renderFooter, initFlickerReveal, initMaskedText, initTracedGrid } from './main.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize common elements
  renderHeader('home');
  initSmoothScroll();
  renderFooter();
  initMaskedText('.mask-text');
  initFlickerReveal('.flicker-text');
  initTracedGrid();

  // 1. Hero Side Data Stagger Animation
  gsap.from('.data-box', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3
  });

  // 2. Infinite Monospaced Marquee Animation
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    // Duplicate track content for seamless loop
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    const trackWidth = marqueeTrack.scrollWidth / 2;

    const marqueeTween = gsap.to(marqueeTrack, {
      x: -trackWidth,
      duration: 25,
      ease: 'none',
      repeat: -1
    });

    // Speed up or slow down on scroll
    window.addEventListener('scroll', () => {
      gsap.to(marqueeTween, { timeScale: 3, duration: 0.2, onComplete: () => {
        gsap.to(marqueeTween, { timeScale: 1, duration: 0.8 });
      }});
    });
  }

  // 3. Split-Screen Contra-Scroll Animation
  const contraSection = document.querySelector('.contra-section');
  const contraLeft = document.querySelector('.contra-scroll-inner-left');
  const contraRight = document.querySelector('.contra-scroll-inner-right');

  if (contraSection && contraLeft && contraRight) {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1201px)", () => {
      // Calculate distances so left scrolls up and right scrolls down in opposite direction
      const leftDist = contraLeft.scrollHeight - window.innerHeight;
      const rightDist = contraRight.scrollHeight - window.innerHeight;

      gsap.fromTo(contraLeft, 
        { y: 0 },
        {
          y: -leftDist - 100,
          ease: 'none',
          scrollTrigger: {
            trigger: contraSection,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1
          }
        }
      );

      gsap.fromTo(contraRight, 
        { y: -rightDist - 100 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: contraSection,
            start: 'top top',
            end: '+=180%',
            scrub: 1
          }
        }
      );
    });
  }

  // 4. Horizontal Grid Project Slider (Scrubbed horizontal translation)
  const worksWrapper = document.querySelector('.works-showcase-wrapper');
  const worksTrack = document.querySelector('.works-slider-track');
  const slides = gsap.utils.toArray('.works-slide');

  if (worksWrapper && worksTrack && slides.length > 0) {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.to(worksTrack, {
        x: () => -(worksTrack.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: worksWrapper,
          start: 'top top',
          end: () => `+=${worksTrack.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });
  }

  // 5. Vertical Strip Stack Carousel (Film strip style)
  const stripTrack = document.getElementById('strip-track');
  const prevBtn = document.getElementById('strip-prev');
  const nextBtn = document.getElementById('strip-next');
  const frameIndicator = document.getElementById('strip-frame-idx');

  if (stripTrack && prevBtn && nextBtn) {
    const stripSlides = stripTrack.querySelectorAll('.strip-slide');
    let currentFrame = 0;
    const totalFrames = stripSlides.length;

    function updateStripSlide(idx) {
      if (idx < 0) currentFrame = totalFrames - 1;
      else if (idx >= totalFrames) currentFrame = 0;
      else currentFrame = idx;

      gsap.to(stripTrack, {
        yPercent: -100 * currentFrame,
        duration: 0.7,
        ease: 'power4.inOut'
      });

      if (frameIndicator) {
        const numStr = (currentFrame + 1).toString().padStart(2, '0');
        const totalStr = totalFrames.toString().padStart(2, '0');
        frameIndicator.textContent = `[ FRAME: ${numStr} / ${totalStr} ]`;
      }
    }

    prevBtn.addEventListener('click', () => updateStripSlide(currentFrame - 1));
    nextBtn.addEventListener('click', () => updateStripSlide(currentFrame + 1));
  }
});
