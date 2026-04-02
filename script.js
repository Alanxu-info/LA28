const athlete1 = document.querySelector('.athlete-1');
const athlete2 = document.querySelector('.athlete-2');
const athlete3 = document.querySelector('.athlete-3');
const centerText = document.querySelector('.center-text');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Bottom layer slowest, top layer fastest
  athlete1.style.transform = `translateY(${scrollY * 0.1}px)`;
  centerText.style.transform = `translateY(calc(-50% + ${scrollY * 0.25}px))`;
  athlete2.style.transform = `translateY(${scrollY * 0.4}px)`;
  athlete3.style.transform = `translateY(${scrollY * 0.6}px)`;
});
