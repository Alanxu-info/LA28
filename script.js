const athlete1 = document.querySelector('.athlete-1');
const athlete2 = document.querySelector('.athlete-2');
const athlete3 = document.querySelector('.athlete-3');
const centerText = document.querySelector('.center-text');
const olympicRings = document.querySelector('.olympic-rings');
const hero = document.querySelector('.hero');

// Smooth interpolation targets
let currentY = { a1: 0, a2: 0, a3: 0, ct: 0, fade1: 1, fade2: 1, fade3: 1, fadeCt: 1, fadeRings: 1 };
let targetY = { ...currentY };
const lerp = (a, b, t) => a + (b - a) * t;
const ease = 0.08;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  // Different fade rates per layer
  targetY.fade1 = Math.max(1 - scrollY / (heroHeight * 0.4), 0);   // fastest fade
  targetY.fadeCt = Math.max(1 - scrollY / (heroHeight * 0.5), 0);
  targetY.fade2 = Math.max(1 - scrollY / (heroHeight * 0.6), 0);
  targetY.fade3 = Math.max(1 - scrollY / (heroHeight * 0.8), 0);   // slowest fade
  targetY.fadeRings = Math.max(1 - scrollY / (heroHeight * 0.7), 0);

  // Parallax targets
  targetY.a1 = scrollY * 0.6;
  targetY.ct = scrollY * 0.4;
  targetY.a2 = scrollY * 0.25;
  targetY.a3 = scrollY * 0.1;

  // Olympic rings lock
  const ringsNaturalTop = heroHeight - 20 - olympicRings.offsetHeight;
  const lockTop = 65;
  if (scrollY >= ringsNaturalTop - lockTop) {
    olympicRings.classList.add('locked');
  } else {
    olympicRings.classList.remove('locked');
  }
});

function animateHero() {
  currentY.a1 = lerp(currentY.a1, targetY.a1, ease);
  currentY.a2 = lerp(currentY.a2, targetY.a2, ease);
  currentY.a3 = lerp(currentY.a3, targetY.a3, ease);
  currentY.ct = lerp(currentY.ct, targetY.ct, ease);
  currentY.fade1 = lerp(currentY.fade1, targetY.fade1, ease);
  currentY.fade2 = lerp(currentY.fade2, targetY.fade2, ease);
  currentY.fade3 = lerp(currentY.fade3, targetY.fade3, ease);
  currentY.fadeCt = lerp(currentY.fadeCt, targetY.fadeCt, ease);
  currentY.fadeRings = lerp(currentY.fadeRings, targetY.fadeRings, ease);

  athlete1.style.transform = `translateY(${currentY.a1}px)`;
  athlete1.style.opacity = currentY.fade1;

  centerText.style.transform = `translateY(calc(-50% + ${currentY.ct}px))`;
  centerText.style.opacity = currentY.fadeCt;

  athlete2.style.transform = `translateY(${currentY.a2}px)`;
  athlete2.style.opacity = currentY.fade2;

  athlete3.style.transform = `translateY(${currentY.a3}px)`;
  athlete3.style.opacity = currentY.fade3;

  if (!olympicRings.classList.contains('locked')) {
    olympicRings.style.opacity = currentY.fadeRings;
  } else {
    olympicRings.style.opacity = 1;
  }

  requestAnimationFrame(animateHero);
}
requestAnimationFrame(animateHero);

/* ── Section 2: Diagonal infinite sport scroll ── */
(() => {
  const rows = document.querySelectorAll('.sports-row');
  if (!rows.length) return;

  // Duplicate cards for seamless loop
  rows.forEach(row => {
    const cards = Array.from(row.children);
    cards.forEach(card => row.appendChild(card.cloneNode(true)));
  });

  const offsets = Array.from(rows).map(() => 0);
  const autoSpeed = 0.5;
  const directions = [1, -1, 1];

  // JS hover — CSS :hover breaks with constant rAF transforms
  document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
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
