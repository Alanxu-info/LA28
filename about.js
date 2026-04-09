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
    layer1.style.transform = `translateY(${scrollY * 0.1}px)`;
    layer2.style.transform = `translateY(${scrollY * 0.25}px)`;
    layer3.style.transform = `translateY(${scrollY * 0.4}px)`;

    // Layer 2 fades in between 20%-40% of scroll
    const fade2Start = pageH * 0.15;
    const fade2End = pageH * 0.35;
    if (scrollY < fade2Start) {
      layer2.style.opacity = 0;
    } else if (scrollY > fade2End) {
      layer2.style.opacity = 1;
    } else {
      layer2.style.opacity = (scrollY - fade2Start) / (fade2End - fade2Start);
    }

    // Layer 3 fades in between 45%-65% of scroll
    const fade3Start = pageH * 0.4;
    const fade3End = pageH * 0.6;
    if (scrollY < fade3Start) {
      layer3.style.opacity = 0;
    } else if (scrollY > fade3End) {
      layer3.style.opacity = 1;
    } else {
      layer3.style.opacity = (scrollY - fade3Start) / (fade3End - fade3Start);
    }
  });
})();
