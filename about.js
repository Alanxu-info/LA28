/* ── About Page: fixed layers that fade in on scroll ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const layer2 = document.querySelector('.about-layer-2');
  const layer3 = document.querySelector('.about-layer-3');
  if (!aboutPage) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // Layer 2 fades in between 0.5-1.0 viewport heights of scroll
    const fade2Start = vh * 0.5;
    const fade2End = vh * 1.0;
    layer2.style.opacity = Math.min(Math.max((scrollY - fade2Start) / (fade2End - fade2Start), 0), 1);

    // Layer 3 fades in between 1.5-2.0 viewport heights of scroll
    const fade3Start = vh * 1.5;
    const fade3End = vh * 2.0;
    layer3.style.opacity = Math.min(Math.max((scrollY - fade3Start) / (fade3End - fade3Start), 0), 1);
  });
})();
