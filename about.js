/* ── About Page: parallax text + fade in/out ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const aboutText = document.querySelector('.about-page-text');
  const blocks = document.querySelectorAll('.about-block');
  if (!aboutPage || !blocks.length) return;

  window.addEventListener('scroll', () => {
    const rect = aboutPage.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Parallax: text scrolls slower than background
    if (rect.top < windowH && rect.bottom > 0) {
      const scrolled = windowH - rect.top;
      const parallaxOffset = scrolled * 0.15;
      aboutText.style.transform = `translateY(${parallaxOffset}px)`;
    }

    // Fade in/out each block
    blocks.forEach(block => {
      const bRect = block.getBoundingClientRect();
      const blockCenter = bRect.top + bRect.height / 2;
      const fadeInPoint = windowH * 0.85;
      const fadeOutPoint = windowH * 0.15;

      if (blockCenter < fadeInPoint && blockCenter > fadeOutPoint) {
        const distFromEdge = Math.min(blockCenter - fadeOutPoint, fadeInPoint - blockCenter);
        const fadeZone = windowH * 0.15;
        const opacity = Math.min(distFromEdge / fadeZone, 1);
        block.style.opacity = opacity;
        block.style.transform = `translateY(${(1 - opacity) * 30}px)`;
      } else {
        block.style.opacity = 0;
        block.style.transform = `translateY(40px)`;
      }
    });
  });
})();
