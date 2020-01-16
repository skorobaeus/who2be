const wrap = document.querySelector('.wrap');
const movementStrength = 25;
const height = movementStrength / window.innerHeight;
const width = movementStrength / window.innerWidth;
const switcher = document.querySelector('.switch.label');
const switcherCheckbox = document.querySelector('#switch');

wrap.addEventListener('mousemove', event => {
  let pageX = event.pageX - (window.innerWidth / 2);
  let pageY = event.pageY - (window.innerHeight / 2);
  let newvalueX = width * pageX * - 1 - 25;
  let newvalueY = height * pageY * - 1 - 50;
  wrap.style.backgroundPosition = `${newvalueX}px ${newvalueY}px`;
});


switcher.addEventListener('click', event => {
  if (switcherCheckbox.checked) {
    wrap.classList.toggle('violet');
    wrap.classList.toggle('orange');
  } else {
    wrap.classList.toggle('violet');
    wrap.classList.toggle('orange');
  }
});