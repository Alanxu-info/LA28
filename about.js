/* ── Olympic Rings: lock under LA logo on scroll (same as home page) ── */
const olympicRings = document.querySelector('.olympic-rings');
const aboutPage = document.querySelector('.about-page');

if (olympicRings) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const ringsNaturalTop = vh - 60;
    const lockTop = 65;

    if (scrollY >= ringsNaturalTop - lockTop) {
      olympicRings.classList.add('locked');
    } else {
      olympicRings.classList.remove('locked');
    }
  });
}

/* ── About Page: overlapping layers + text fade in/out ── */
(() => {
  const layer2 = document.querySelector('.about-layer-2');
  const layer3 = document.querySelector('.about-layer-3');
  const text1 = document.querySelector('.about-text-1');
  const text2 = document.querySelector('.about-text-2');
  const text3 = document.querySelector('.about-text-3');
  if (!aboutPage) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageH = aboutPage.offsetHeight;
    const vh = window.innerHeight;

    // Background layer 2 fades in (8%-18%)
    const fade2Start = pageH * 0.08;
    const fade2End = pageH * 0.18;
    const t2 = Math.min(Math.max((scrollY - fade2Start) / (fade2End - fade2Start), 0), 1);
    layer2.style.opacity = t2;

    // Background layer 3 fades in (45%-55%)
    const fade3Start = pageH * 0.45;
    const fade3End = pageH * 0.55;
    const t3 = Math.min(Math.max((scrollY - fade3Start) / (fade3End - fade3Start), 0), 1);
    layer3.style.opacity = t3;

    // Text fade in/out based on viewport position (text1 excluded)
    [text2, text3].forEach(block => {
      const rect = block.getBoundingClientRect();
      const blockCenter = rect.top + rect.height / 2;
      const fadeInPoint = vh * 0.85;
      const fadeOutPoint = vh * 0.1;

      if (blockCenter < fadeInPoint && blockCenter > fadeOutPoint) {
        const distFromEdge = Math.min(blockCenter - fadeOutPoint, fadeInPoint - blockCenter);
        const fadeZone = vh * 0.2;
        const opacity = Math.min(distFromEdge / fadeZone, 1);
        block.style.opacity = opacity;
        block.style.transform = `translateY(${(1 - opacity) * 30}px)`;
      } else {
        block.style.opacity = 0;
        block.style.transform = 'translateY(30px)';
      }
    });
  });
})();
