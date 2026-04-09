const athlete1 = document.querySelector('.athlete-1');
const athlete2 = document.querySelector('.athlete-2');
const athlete3 = document.querySelector('.athlete-3');
const centerText = document.querySelector('.center-text');
const olympicRings = document.querySelector('.olympic-rings');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;
  const fade = Math.max(1 - scrollY / (heroHeight * 0.6), 0);

  // Reversed: bottom layer fastest, top layer slowest
  athlete1.style.transform = `translateY(${scrollY * 0.6}px)`;
  athlete1.style.opacity = fade;

  centerText.style.transform = `translateY(calc(-50% + ${scrollY * 0.4}px))`;
  centerText.style.opacity = fade;

  athlete2.style.transform = `translateY(${scrollY * 0.25}px)`;
  athlete2.style.opacity = fade;

  athlete3.style.transform = `translateY(${scrollY * 0.1}px)`;
  athlete3.style.opacity = fade;

  // Olympic rings: lock 20px below LA logo when scrolled to that point
  // Rings start at bottom:20px in the hero, so their top = heroHeight - 20 - ringsHeight
  const ringsNaturalTop = heroHeight - 20 - olympicRings.offsetHeight;
  const lockTop = 65; // ~10px below LA logo bottom
  if (scrollY >= ringsNaturalTop - lockTop) {
    olympicRings.classList.add('locked');
  } else {
    olympicRings.classList.remove('locked');
  }
});

/* ── Section 2: Diagonal infinite sport scroll ── */
(() => {
  const rows = document.querySelectorAll('.sports-row');
  if (!rows.length) return;

  // Duplicate cards for seamless loop
  rows.forEach(row => {
    const cards = Array.from(row.children);
    cards.forEach(card => row.appendChild(card.cloneNode(true)));
  });

  const autoSpeed = 0.5;
  const directions = [1, -1, 1];

  // Initialize offsets — reverse rows start at halfWidth so they appear filled
  const offsets = Array.from(rows).map((row, i) => {
    if (directions[i] === -1) {
      return row.scrollWidth / 2;
    }
    return 0;
  });

  function animate() {
    rows.forEach((row, i) => {
      offsets[i] += autoSpeed * directions[i];
      const halfWidth = row.scrollWidth / 2;
      if (offsets[i] >= halfWidth) offsets[i] -= halfWidth;
      if (offsets[i] < 0) offsets[i] += halfWidth;
      row.style.transform = `translateX(${-offsets[i]}px)`;
    });
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();

/* ── About Page: parallax text + fade in/out ── */
(() => {
  const aboutPage = document.querySelector('.about-page');
  const aboutText = document.querySelector('.about-page-text');
  const blocks = document.querySelectorAll('.about-block');
  if (!aboutPage || !blocks.length) return;

  window.addEventListener('scroll', () => {
    const rect = aboutPage.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Parallax: text scrolls slower than background (0.4x speed)
    if (rect.top < windowH && rect.bottom > 0) {
      const scrolled = windowH - rect.top;
      const parallaxOffset = scrolled * 0.15;
      aboutText.style.transform = `translateY(${parallaxOffset}px)`;
    }

    // Fade in/out each block
    blocks.forEach(block => {
      const bRect = block.getBoundingClientRect();
      const blockCenter = bRect.top + bRect.height / 2;
      // Visible when center is between 15% and 85% of viewport
      const fadeInPoint = windowH * 0.85;
      const fadeOutPoint = windowH * 0.15;

      if (blockCenter < fadeInPoint && blockCenter > fadeOutPoint) {
        // Calculate opacity based on distance from edges
        const distFromEdge = Math.min(blockCenter - fadeOutPoint, fadeInPoint - blockCenter);
        const fadeZone = windowH * 0.15;
        const opacity = Math.min(distFromEdge / fadeZone, 1);
        block.style.opacity = opacity;
        block.style.transform = `translateY(${(1 - opacity) * 30}px)`;
        block.classList.add('visible');
      } else {
        block.style.opacity = 0;
        block.style.transform = `translateY(40px)`;
        block.classList.remove('visible');
      }
    });
  });
})();
