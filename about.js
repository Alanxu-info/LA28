/* ── About Page: overlapping layers with fade-in ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const layer1 = document.querySelector('.about-layer-1');
  const layer2 = document.querySelector('.about-layer-2');
  const layer3 = document.querySelector('.about-layer-3');
  if (!aboutPage || !layer1) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageH = aboutPage.offsetHeight;

    // No parallax movement — layers stay in place and stack on top

    // Layer 1 always visible
    layer1.style.opacity = 1;

    // Layer 2 fades in quickly (5%-15% of scroll)
    const fade2Start = pageH * 0.05;
    const fade2End = pageH * 0.15;
    if (scrollY < fade2Start) {
      layer2.style.opacity = 0;
    } else {
      layer2.style.opacity = Math.min((scrollY - fade2Start) / (fade2End - fade2Start), 1);
    }

    // Layer 3 fades in quickly (25%-35% of scroll)
    const fade3Start = pageH * 0.25;
    const fade3End = pageH * 0.35;
    if (scrollY < fade3Start) {
      layer3.style.opacity = 0;
    } else {
      layer3.style.opacity = Math.min((scrollY - fade3Start) / (fade3End - fade3Start), 1);
    }
  });
})();
