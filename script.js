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

/* ── Section 2: Diagonal infinite sport scroll with 3D tilt ── */
(() => {
  const row = document.querySelector('.sports-row');
  if (!row) return;

  // Duplicate cards for seamless looping
  const cards = Array.from(row.children);
  cards.forEach(card => row.appendChild(card.cloneNode(true)));

  let offset = 0;
  const autoSpeed = 0.5;
  const diagAngle = 0.3; // vertical movement ratio (rise per horizontal px)

  // Drag state
  let isDragging = false;
  let dragVelocity = 0;
  let lastDragX = 0;
  const wrapper = document.querySelector('.sports-scroll-wrapper');

  wrapper.addEventListener('mousedown', e => {
    isDragging = true;
    lastDragX = e.clientX;
    dragVelocity = 0;
    wrapper.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastDragX;
    dragVelocity = dx;
    lastDragX = e.clientX;
    offset -= dx * 1.5; // scale up drag since perspective shrinks apparent motion
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = '';
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
    offset -= dx * 1.5;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  function animate() {
    if (!isDragging) {
      if (Math.abs(dragVelocity) > 0.5) {
        offset -= dragVelocity;
        dragVelocity *= 0.95;
      } else {
        dragVelocity = 0;
        offset += autoSpeed;
      }
    }

    // Seamless loop
    const halfWidth = row.scrollWidth / 2;
    if (offset >= halfWidth) offset -= halfWidth;
    if (offset < 0) offset += halfWidth;

    // Diagonal path: translate both X and Y
    const tx = -offset;
    const ty = -offset * diagAngle;
    row.style.transform = `translate(${tx}px, ${ty}px)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
