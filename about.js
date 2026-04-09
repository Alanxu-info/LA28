/* ── About Page: overlapping layers with parallax fade-in ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const layer1 = document.querySelector('.about-layer-1');
  const layer2 = document.querySelector('.about-layer-2');
  const layer3 = document.querySelector('.about-layer-3');
  if (!aboutPage || !layer1) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageH = aboutPage.offsetHeight;

    // Parallax: each layer moves at a different speed
    layer1.style.transform = `translateY(${scrollY * 0.05}px)`;
    layer2.style.transform = `translateY(${scrollY * 0.15}px)`;
    layer3.style.transform = `translateY(${scrollY * 0.3}px)`;

    // Layer 1 stays fully visible always
    layer1.style.opacity = 1;

    // Layer 2 fades in quickly (5%-15% of scroll)
    const fade2Start = pageH * 0.05;
    const fade2End = pageH * 0.15;
    if (scrollY < fade2Start) {
      layer2.style.opacity = 0;
    } else if (scrollY > fade2End) {
      layer2.style.opacity = 1;
    } else {
      layer2.style.opacity = (scrollY - fade2Start) / (fade2End - fade2Start);
    }

    // Layer 3 fades in quickly (25%-35% of scroll)
    const fade3Start = pageH * 0.25;
    const fade3End = pageH * 0.35;
    if (scrollY < fade3Start) {
      layer3.style.opacity = 0;
    } else if (scrollY > fade3End) {
      layer3.style.opacity = 1;
    } else {
      layer3.style.opacity = (scrollY - fade3Start) / (fade3End - fade3Start);
    }
  });
})();
