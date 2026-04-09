/* ── About Page: overlapping layers with fade-in animation ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const layer2 = document.querySelector('.about-layer-2');
  const layer3 = document.querySelector('.about-layer-3');
  const text2 = document.querySelector('.about-text-2');
  const text3 = document.querySelector('.about-text-3');
  if (!aboutPage) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageH = aboutPage.offsetHeight;

    // Layer 2 + Text 2 fade in and slide up (5%-15%)
    const fade2Start = pageH * 0.05;
    const fade2End = pageH * 0.15;
    const t2 = Math.min(Math.max((scrollY - fade2Start) / (fade2End - fade2Start), 0), 1);
    const offset2 = (1 - t2) * 40;
    layer2.style.opacity = t2;
    layer2.style.transform = `translateY(${offset2}px)`;
    text2.style.opacity = t2;
    text2.style.transform = `translateY(${offset2}px)`;

    // Layer 3 + Text 3 fade in and slide up (25%-35%)
    const fade3Start = pageH * 0.25;
    const fade3End = pageH * 0.35;
    const t3 = Math.min(Math.max((scrollY - fade3Start) / (fade3End - fade3Start), 0), 1);
    const offset3 = (1 - t3) * 40;
    layer3.style.opacity = t3;
    layer3.style.transform = `translateY(${offset3}px)`;
    text3.style.opacity = t3;
    text3.style.transform = `translateY(${offset3}px)`;
  });
})();
