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

  // Olympic rings: lock under LA logo when scrolled to threshold
  const ringsBottom = hero.offsetHeight - 20 - olympicRings.offsetHeight;
  if (scrollY >= ringsBottom - 90) {
    olympicRings.classList.add('locked');
  } else {
    olympicRings.classList.remove('locked');
  }
});
