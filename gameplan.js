/* ── Olympic Rings: lock under LA logo on scroll ── */
const olympicRings = document.querySelector('.olympic-rings');
const hero = document.querySelector('.gameplan-hero');

if (olympicRings && hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const ringsNaturalTop = heroHeight - 20 - olympicRings.offsetHeight;
    const lockTop = 65;

    if (scrollY >= ringsNaturalTop - lockTop) {
      olympicRings.classList.add('locked');
    } else {
      olympicRings.classList.remove('locked');
    }
  });
}
