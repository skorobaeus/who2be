const wrap = document.querySelector('.wrap');
const movementStrength = 25;
const height = movementStrength / window.innerHeight;
const width = movementStrength / window.innerWidth;
const switcher = document.querySelector('.switch.label');
const switcherCheckbox = document.querySelector('.switch.input');
const buttons = document.querySelectorAll('.test.button');
const close = document.querySelector('.popup.close');
const popupWrap = document.querySelector('.popup.wrap');
const more = document.querySelector('.test.button.more');
const html = document.querySelector('html');

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
  paintPie();
});

Array.from(buttons).forEach(button => {
  button.addEventListener('click', event => {
    button.blur();                        
  })
});

close.addEventListener('click', event => {
  event.preventDefault();
  popupWrap.classList.toggle('hidden');
  html.classList.toggle('unscrollable');  
});

popupWrap.addEventListener('click', event => {
  if (event.target === popupWrap) {
    popupWrap.classList.toggle('hidden');
    html.classList.toggle('unscrollable');    
  }
});

more.addEventListener('click', event => {
  event.preventDefault();
  popupWrap.classList.toggle('hidden');
  html.classList.toggle('unscrollable');
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
/* Creating and configuring pie */
function createPie() {
  // Create chart instance
  const chart = am4core.create("pie", am4charts.PieChart);
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
  
  if (wrap.classList.contains('violet')) {
    pieSeries.labels.template.fill = am4core.color("#fff");  
    pieSeries.ticks.template.stroke = am4core.color("#fff");  
  } else {
    pieSeries.labels.template.fill = am4core.color("#000");  
    pieSeries.ticks.template.stroke = am4core.color("#000");  
  }
}

function paintPie() {
  const blackLetters = document.querySelectorAll('g[role="menu"] g[fill="#000000"]');
  const blackLines = document.querySelectorAll('g[role="menu"] g[stroke="#000000"]');
  const whiteLetters = document.querySelectorAll('g[role="menu"] g[fill="#ffffff"]');
  const whiteLines = document.querySelectorAll('g[role="menu"] g[stroke="#ffffff"]');
  
  if (blackLetters.length != 0 && blackLines.length != 0) {
    fill(blackLetters, "#ffffff");
    stroke(blackLines, "#ffffff");
  }
  if (whiteLetters.length != 0) {
    fill(whiteLetters, "#000000");
    stroke(whiteLines, "#000000");
  }   
}

function fill(list, color) {
  list.forEach(node => node.setAttribute("fill", color));
}

function stroke(list, color) {
  list.forEach(node => node.setAttribute("stroke", color));
}


/* Loading AmCharts scripts */
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));
    document.head.append(script);
  });
}

loadScript("https://www.amcharts.com/lib/4/core.js")
  .then(script => loadScript("https://www.amcharts.com/lib/4/charts.js"))
  .then(script => loadScript("https://www.amcharts.com/lib/4/themes/animated.js"))
  .then(script => loadScript("https://www.amcharts.com/lib/4/themes/material.js"))
  .then(script => {
    createPie();
  });