let selected;
let data;
let oReq = new XMLHttpRequest();
let questNum = -1;
let answersArr = [];
let fullstackDeloveperScale = 0;
let qaSpecialistScale = 0;
let frontendDeloveperScale = 0; 
let mobileAppsDeveloperScale = 0;
let inp = document.getElementsByName("pair");
let variant1 = document.getElementsByName("answer")[0];
let variant2 = document.getElementsByName("answer")[1];
let qnum = document.getElementById("qnum"); 
let backButton = document.getElementById("back");
let nextButton = document.getElementById("next");
let questionForm = document.getElementById("questionForm");
let resArr;
let greeting = document.getElementById("greeting");
let points = document.getElementsByClassName("points");
let list = document.getElementsByClassName("list");

function resultCounting() {
  for(let i = 0; i < answersArr.length; i++) {
    switch(answersArr[i]) {
      case "front":
        frontendDeloveperScale++;
        break;
        case "qa":
        qaSpecialistScale++;
        break;
        case "mob":
        mobileAppsDeveloperScale++;
        break;
        case "full":
        fullstackDeloveperScale++;
        break;
    }
  }

  console.log(
    `Шкала Frontend - ${frontendDeloveperScale} баллов\nШкала QA - ${qaSpecialistScale} баллов \nШкала мобильной разработки - ${mobileAppsDeveloperScale} \nШкала Fullstac - ${fullstackDeloveperScale} баллов`);
    let resArr = [{name: "FRONTEND", score: frontendDeloveperScale}, {name: "MOBILE", score: mobileAppsDeveloperScale}, {name: "QA", score: qaSpecialistScale},{name: "FULLSTACK", score: fullstackDeloveperScale}];
console.log(resArr);
resArr.sort(function(a,b){
  return b.score - a.score;
}); 
resArr.splice(2);
resultDisplay(resArr);
}

function jsonLoading() {
oReq.onload = reqListener;
oReq.open("get", "data.json", true);
oReq.send();

  }
  function reqListener(e) {
    data = oReq.response;
    data = JSON.parse(data);
    console.log(data);
    console.log(typeof(data));
    console.log(data["answersArray"])
  }

  function reload() {
    window.location.reload();
  }

function showQuestion() {
  if (questNum === data["answersArray"].length) {
    resArr = resultCounting();
} else {
  document.getElementsByName("pair")[0].checked = false;
  document.getElementsByName("pair")[1].checked = false;
  qnum.textContent = `${questNum + 1}`;
  variant1.textContent = data["answersArray"][questNum]["firstAnswer"];
  variant2.textContent = data["answersArray"][questNum]["secondAnswer"];
  variant1.style = "color:white";
  variant2.style = "color:white";

  }
}

function radioupd() {
  for (let i = 0; i < inp.length; i++) {
    if (inp[i].type == "radio" && inp[i].checked) {
      selected = i;
    }
    inp[i].checked ? document.getElementsByName("answer")[i].style = "color:orange" : document.getElementsByName("answer")[i].style = "";
  }
  checkButtonAble();
}

function backClick() {
  answersArr.pop();
  questNum--;
  showQuestion();
  checkButtonAble();
  console.log(questNum);
}

function nextClick() {
if(questionForm.className === "test form hidden") {
  questionForm.classList = "test form";
  greeting.className = "test greeting message hidden";
}
  radioupd();
  if(questNum === -1) {
    questNum++;
  showQuestion(); 
  checkButtonAble();
  } else {
  answersArr.push(data["answersArray"][questNum]["sphere"][selected]);
  questNum++;
  showQuestion(); 
  checkButtonAble();
  console.log(answersArr);
  if(questNum <= data["answersArray"].length - 1 && questNum >= 0) {
 qnum.textContent = `${questNum + 1}`;
  }
    } 
  }

  //Функция проверялет, можно ли нажимать кнопку :)
  function checkButtonAble() {
    if(questNum === 0) {
        backButton.disabled = true;
    } else {
        backButton.disabled = false;
    }
    if (questNum === data["answersArray"].length || (document.getElementsByName("pair")[0].checked === false && document.getElementsByName("pair")[1].checked === false)) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;

    }
  }

function resultDisplay(resArr) {
  questionForm.hidden = true;
document.getElementById("resultForm").hidden = false;
backButton.hidden = true;
nextButton.hidden = true;
document.getElementById("resultProfession").textContent = data[`${resArr[0].name}DisplayName`] + ` - ${Math.round(resArr[0].score / 12 * 100)}%`; 
document.getElementById("firstProfParagraph").textContent = `${data[resArr[0].name]}`;
document.getElementById("secondProfParagraph").textContent = data[`${resArr[0].name}SecondParagraph`];
document.getElementById("modal").className = "test button more";
points[0].textContent = qaSpecialistScale;
points[1].textContent = mobileAppsDeveloperScale;
points[2].textContent = frontendDeloveperScale;
points[3].textContent = fullstackDeloveperScale;
createPie();
linkDisplay(resArr);
document.getElementById("secondprof").textContent = `Также обратите внимание на профессию ` + data[`${resArr[1].name}DisplayName`];

}
//Данная функция выводит список ссылок, без цикла тут не обойтись никак, 
//потому что количество курсов для каждой професии разное
function linkDisplay(resArr) {
  list[0].innerHTML = "";
  list[1].innerHTML ="";
  
for(let i = 0; i < resArr.length; i++) {
  for (let j= 0; j < data[`${resArr[i].name}links`].length; j++ ) {
    let li = document.createElement("li");
   li.id = `list${i}Item${j}`;
   let a = document.createElement("a");
    document.getElementsByClassName("list")[i].append(li);
    document.getElementById(`list${i}Item${j}`).append(a);
    a.href = data[`${resArr[i].name}links`][j];
    a.textContent = data[`${resArr[i].name}names`][j];

 }
}
}

function popupDisplay() {
  document.getElementById("popupwindow").hidden = "false";
  document.getElementsByName("front")[0].value =`${Math.round(frontendDeloveperScale / answersArr.length * 100)}%`
  document.getElementsByName("mob")[0].value = `${Math.round(mobileAppsDeveloperScale / answersArr.length * 100)}%`
  document.getElementsByName("qa")[0].value = `${Math.round(qaSpecialistScale / answersArr.length * 100)}%`
  document.getElementsByName("full")[0].value = `${Math.round(fullstackDeloveperScale / answersArr.length * 100)}%`
}

function submitHandler(e) {
  e.preventDefault();

  let request = new XMLHttpRequest();
  request.onreadystatechange = function() { 
    console.log("readyState=", this.readyState, "statis=", this.status);
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // success, show this.responseText here
        document.getElementById("confirm").className = "popup confirm container";
        document.getElementById("mailform").className = "hidden";

    }
  }
  
  request.open(this.method, this.action, true);
  
  let email = new FormData(mailform);
  console.log(email)
  console.log(email.has(name));
  for (let key of email.keys())
    console.log(key, email.get(key));
    
  request.send(email);
}

document.querySelectorAll("form").forEach(form =>
  form.addEventListener("submit", submitHandler)
);

function fieldCheck() {
  if(document.getElementsByName("name")[0].value !="" && (document.getElementsByName("phone")[0].value != "" || document.getElementsByName("mail")[0].value != "")) {
    document.getElementsByName("submit")[0].disabled = false;
  } else {
    document.getElementsByName("submit")[0].disabled = true;
  }
}