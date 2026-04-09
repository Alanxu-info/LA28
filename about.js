/* ── About Page: overlapping layers with fade-in ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const layer1 = document.querySelector('.about-layer-1');
  const layer2 = document.querySelector('.about-layer-2');
  const layer3 = document.querySelector('.about-layer-3');
  const text1 = document.querySelector('.about-text-1');
  const text2 = document.querySelector('.about-text-2');
  const text3 = document.querySelector('.about-text-3');
  if (!aboutPage || !layer1) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageH = aboutPage.offsetHeight;

    // Layer 1 + Text 1 always visible
    layer1.style.opacity = 1;
    text1.style.opacity = 1;

    // Layer 2 + Text 2 fade in together (5%-15% of scroll)
    const fade2Start = pageH * 0.05;
    const fade2End = pageH * 0.15;
    const opacity2 = Math.min(Math.max((scrollY - fade2Start) / (fade2End - fade2Start), 0), 1);
    layer2.style.opacity = opacity2;
    text2.style.opacity = opacity2;

    // Layer 3 + Text 3 fade in together (25%-35% of scroll)
    const fade3Start = pageH * 0.25;
    const fade3End = pageH * 0.35;
    const opacity3 = Math.min(Math.max((scrollY - fade3Start) / (fade3End - fade3Start), 0), 1);
    layer3.style.opacity = opacity3;
    text3.style.opacity = opacity3;
  });
})();
