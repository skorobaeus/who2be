const wrap = document.querySelector('.wrap');
const movementStrength = 25;
const height = movementStrength / window.innerHeight;
const width = movementStrength / window.innerWidth;
const switcher = document.querySelector('.switch.label');
const switcherCheckbox = document.querySelector('.switch.input');
const buttons = document.querySelectorAll('.test.button');

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
  detectTheme();
});

Array.from(buttons).forEach(button => {
  button.addEventListener('click', event => {
    button.blur();                        
  })
});

window.addEventListener('load', detectColorScheme());
function detectColorScheme() {
  let scheme = 'orange';
  if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    scheme = 'violet';
  }
  wrap.classList.toggle(scheme);
}

/* Pie result */
// Create chart instance
var chart = am4core.create("pie", am4charts.PieChart);
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

//Add data
chart.data = [];
const dataList = document.querySelectorAll('#legend li');
dataList.forEach(li => {
  chart.data.push({
    profession: li.querySelector('.profession').innerHTML,
    points: li.querySelector('.points').innerHTML
  });
});

// Add and configure Series
chart.innerRadius = am4core.percent(40);
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "points";
pieSeries.dataFields.category = "profession";
pieSeries.labels.template.maxWidth = 120;
pieSeries.labels.template.wrap = true;
pieSeries.labels.template.truncard = true;
detectTheme();

function detectTheme() {
  wrap.classList.contains('orange') ? pieSeries.labels.template.fill="#000000" : pieSeries.labels.template.fill="#FFFFFF";
}