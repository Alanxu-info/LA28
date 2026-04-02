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

  // Duplicate cards in each row for seamless looping
  rows.forEach(row => {
    const cards = Array.from(row.children);
    cards.forEach(card => row.appendChild(card.cloneNode(true)));
  });

  // Per-row scroll offset
  const offsets = Array.from(rows).map(() => 0);
  const autoSpeed = 0.5; // px per frame
  const directions = [1, -1, 1]; // alternate directions per row

  // Drag state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragVelocity = 0;
  let lastDragX = 0;
  const wrapper = document.querySelector('.sports-scroll-wrapper');

  wrapper.addEventListener('mousedown', e => {
    isDragging = true;
    lastDragX = e.clientX;
    dragVelocity = 0;
    document.body.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastDragX;
    dragVelocity = dx;
    lastDragX = e.clientX;
    // Move all rows by drag delta (accounting for rotation)
    rows.forEach((row, i) => {
      offsets[i] -= dx;
    });
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = '';
  });

  // Touch support
  wrapper.addEventListener('touchstart', e => {
    isDragging = true;
    lastDragX = e.touches[0].clientX;
    dragVelocity = 0;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - lastDragX;
    dragVelocity = dx;
    lastDragX = e.touches[0].clientX;
    rows.forEach((row, i) => {
      offsets[i] -= dx;
    });
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Animation loop
  function animate() {
    rows.forEach((row, i) => {
      // Auto-scroll when not dragging
      if (!isDragging) {
        // Apply momentum decay
        if (Math.abs(dragVelocity) > 0.5) {
          offsets[i] -= dragVelocity;
          dragVelocity *= 0.95;
        } else {
          dragVelocity = 0;
          offsets[i] += autoSpeed * directions[i];
        }
      }

      // Get the width of half the content (original cards) for seamless reset
      const halfWidth = row.scrollWidth / 2;
      if (offsets[i] >= halfWidth) offsets[i] -= halfWidth;
      if (offsets[i] < 0) offsets[i] += halfWidth;

      row.style.transform = `translateX(${-offsets[i]}px)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
