let timeFlag, flag = 0;
 let mobileMenu = document.querySelector(".navbar img")

let menu = document.querySelector("ul.menu");

mobileMenu.addEventListener("click",()=>{
 menu.classList.toggle("open")
})

/* select elements from landing page */

let startRecord = document.getElementById("start-record");

startRecord.addEventListener("click",()=>{
 setTimeout(()=>{
  window.location.href="camerapp/main.html";
 },300)
})

let header = document.querySelector("header");
let hero = document.querySelector("main .hero-section");
let option = document.querySelector(".categories");
let about = document.querySelector(".container")
let footer = document.querySelector("footer")
let cameraChange = document.getElementById("cam-change");

let cam = document.querySelector(".cam");

cameraChange.addEventListener("click",()=>{
 setTimeout(()=>{
  cam.classList.add("open");
  header.classList.add("blur")
  hero.classList.add("blur")
  option.classList.add("blur")
  about.classList.add("blur")
  footer.classList.add("blur")
  let img1 = document.querySelector(".cam .img1")
  let img2 = document.querySelector(".cam .img2")
  if(localStorage.getItem("id")=="rear"){
   img1.classList.add("active")
   img2.classList.remove("active")
  }else if(localStorage.getItem("id")=="front"){
   img2. classList.add("active")
   img1.classList.remove("active")
  }else{
   img1.classList.add("active")
   img2.classList.remove("active")
  }
  let rear = document.getElementById("rear");
let front = document.getElementById("front")
//let timeFlag, flag = 0;
rear.addEventListener("click",()=>{
 img1.classList.add("active")
 img2.classList.remove("active")
 localStorage.setItem("id","rear")
});

front.addEventListener("click",()=>{
 img2.classList.add("active")
 img1.classList.remove("active")
 localStorage.setItem("id","front")
})

let okBtn = document.getElementById("okBtn");

okBtn.addEventListener("click",()=>{
 cam.classList.remove("open");
  header.classList.remove("blur")
  hero.classList.remove("blur")
  option.classList.remove("blur")
  about.classList.remove("blur")
  footer.classList.remove("blur")
})

 },300)
})

let setTime = document.getElementById("setTime");
let time = document.querySelector(".time")
setTime.addEventListener("click",()=>{
 setTimeout(()=>{
  time.classList.add("open");
  header.classList.add("blur")
  hero.classList.add("blur")
  option.classList.add("blur")
  about.classList.add("blur")
  footer.classList.add("blur")
 
const kill = setInterval(() => {
    
    let getStartHour = localStorage.getItem("startHour");
    let getStartMinute = localStorage.getItem("startMinute");
    let getStartAmPm = localStorage.getItem("startAmPm");
    
    if (getStartHour != null && getStartMinute != null && getStartAmPm != null) {
     // console.log(getStartHour+" "+getStartMinute+" "+getStartAmPm)
   let date = new Date(),
     h = date.getHours(),
     m = date.getMinutes(),
     s = date.getSeconds(),
     ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;//12-12 case set h=12
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    //currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (getStartHour==h && getStartMinute==m && getStartAmPm==ampm) {
        clearInterval(kill);
        starRec(function(){
         checkToStop(function(){
          stopTriggered()
         })
        })
    }
    }},2000);
 },300)
})

const parts = [];
 let mediaRecorder;
 let constraints;
 if (localStorage.getItem("id") == "rear") {
  constraints = {
   video: {
    width: {
     min: 1280,
     ideal: 1920,
     max: 2560,
    },
    height: {
     min: 720,
     ideal: 1080,
     max: 1440,
    },
    facingMode: "environment"
   },
   audio: true
  }
 } else if (localStorage.getItem("id") == "front") {
  console.log("front")
  constraints = {
   video: {
    width: {
     min: 1280,
     ideal: 1920,
     max: 2560,
    },
    height: {
     min: 720,
     ideal: 1080,
     max: 1440,
    },
    facingMode: "user"
   },
   audio: true
  }
 }else{
  constraints = {
   video: {
    width: {
     min: 1280,
     ideal: 1920,
     max: 2560,
    },
    height: {
     min: 720,
     ideal: 1080,
     max: 1440,
    },
    facingMode: "environment"
   },
   audio: true
  }
 }
 
function starRec(callback) {
 console.log("starRec");
 navigator.mediaDevices.getUserMedia(constraints)
 .then(stream => {
 
  mediaRecorder = new MediaRecorder(stream);
 
  mediaRecorder.start(1000);
 
  mediaRecorder.ondataavailable = function(e) {
   parts.push(e.data);
  }
  console.log("recording....");
 callback()
 })
 .catch((err) => {
    console.log(err)
    location.reload(true)
   });
}

function checkToStop(callback){
 
 let getStopHour = localStorage.getItem("stopHour");
 let getStopMinute = localStorage.getItem("stopMinute");
 let getStopAmPm = localStorage.getItem("stopAmPm");
 
const kill = setInterval(()=>{
  
  let date = new Date(),
   h = date.getHours(),
   m = date.getMinutes(),
   s = date.getSeconds(),
   ampm = "AM";
  if (h >= 12) {
   h = h - 12;
   ampm = "PM";
  }
  h = h == 0 ? h = 12 : h; //12-12 case set h=12
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  
  if (getStopHour == h && getStopMinute == m && getStopAmPm == ampm) {
   clearInterval(kill);
   callback()
  }
 },2000)
 console.log("checkToStop");
}

function stopTriggered(){
 /*constraints = {
  video: false, 
  audio: false
 }*/
 mediaRecorder.stop();
 const blob = new Blob(parts, {
  type: "video/mp4"
 });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 document.body.appendChild(a);
 a.style = "display:none";
 a.href = url;
 a.download = "settime"+Math.floor(Math.random() * 1000);
 a.click();
 console.log("stop");
 location.reload(true)
}


//console.log(localStorage.getItem("id")) 
/* select elements from landing page end */
//window.exports = {flag};
//export {flag};

/******** handle set time section **********/

let selectMenu = document.querySelectorAll("select")
console.log(selectMenu);
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
 i = i < 10 ? `0${i}` : i;
 let option = `<option value="${i}">${i}</option>`;
 selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
 let ampm = i == 1 ? "AM" : "PM";
 let option = `<option value="${ampm}">${ampm}</option>`;
 selectMenu[5].firstElementChild.insertAdjacentHTML("afterend", option);
}

let setBtn = document.getElementById("setBtn");
let settimeStart = document.querySelector(".settime-start");

let settimeStop = document.querySelector(".settime-stop");
let btnFlag =()=>{
 if(btnFlag){
  return btnFlag = false;
 }
}

function setORreset(){
 
 if(timeFlag){
  localStorage.removeItem("startHour")
  localStorage.removeItem("stopHour")
  localStorage.removeItem("startMinute")
  localStorage.removeItem("stopMinute")
  localStorage.removeItem("startAmPm")
  localStorage.removeItem("stopAmPm")
  
  settimeStart.classList.remove("disable")
  settimeStop.classList.remove("disable")
  setBtn.innerHTML="SET TIME"
  console.log("inside")
  return timeFlag = false;
  
 }
 
  let startHour = selectMenu[0].value;
  console.log(startHour);
  let startMinute = selectMenu[1].value;
  console.log(startMinute);
  let startAmPm = selectMenu[2].value;
  console.log(startAmPm)
 
  let stopHour = selectMenu[3].value;
  console.log(startHour);
  let stopMinute = selectMenu[4].value;
  console.log(startMinute);
  let stopAmPm = selectMenu[5].value;
  console.log(startAmPm)
 
  if (startHour == "Hour" || startMinute == "Minute" || startAmPm == "AM/PM" || stopHour == "Hour" || stopMinute == "Minute" || stopAmPm == "AM/PM") {
 
   alert("Please Select Valid Time");
 
  } else {
 
   localStorage.setItem("startHour", startHour)
   localStorage.setItem("startMinute", startMinute)
   localStorage.setItem("startAmPm", startAmPm)
 
   localStorage.setItem("stopHour", stopHour)
   localStorage.setItem("stopMinute", stopMinute)
   localStorage.setItem("stopAmPm", stopAmPm)
 
   settimeStart.classList.add("disable");
   settimeStop.classList.add("disable");
   setBtn.innerHTML = "CLEAR"
   timeFlag = true;
   console.log("else block")
   
  }
 }

setBtn.addEventListener("click",setORreset)

let backBtn = document.getElementById("back-arrow");
backBtn.addEventListener("click",()=>{
 
  time.classList.remove("open");
  header.classList.remove("blur")
  hero.classList.remove("blur")
  option.classList.remove("blur")
  about.classList.remove("blur")
  footer.classList.remove("blur")
  
})

let HTMLheader = document.querySelector(".header")
let HTMLmain = document.querySelector(".main")
let HTMLfooter = document.querySelector(".footerTag")
let setting = document.querySelector(".setting")
let settings = document.getElementById("settings")
settings.addEventListener("click",()=>{
 /* prevent window scroll *
 let scrollTop = window. pageYOffset || document.documentElement.scrollTop
 let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
 window.onscroll = function() {
  window.scrollTo(scrollLeft, scrollTop);
 };
 ****** end ********/
 setting.classList.add("active")
 HTMLheader.classList.add("blur")
 HTMLmain.classList.add("blur")
 HTMLfooter.classList.add("blur")
 
})
const toggleCBtn = document.querySelector(".setting ul img")
toggleCBtn.addEventListener("click",()=>{
 setting.classList.remove("active")
 HTMLheader.classList.remove("blur")
 HTMLmain.classList.remove("blur")
 HTMLfooter.classList.remove("blur")
})

let toggle = document.querySelector(".toggle")
if(localStorage.getItem("cam") == "ON"){
 toggle.classList.add("active")
}else{
 toggle.classList.remove("active")
}
toggle.addEventListener("click",()=>{
 
 if(toggle.classList.contains("active")){
  localStorage.removeItem("cam")
  toggle.classList.remove("active")
 }else {
  toggle.classList.add("active")
  localStorage.setItem("cam","ON")
 }
})

let toggleMic = document.querySelector(".toggle-mic")
if(localStorage.getItem("mic") == "ON"){
 toggleMic.classList.add("active")
}else{
 toggleMic.classList.remove("active")
}
toggleMic.addEventListener("click",()=>{
 
 if(toggleMic.classList.contains("active")){
  localStorage.removeItem("mic")
  toggleMic.classList.remove("active")
 }else {
  toggleMic.classList.add("active")
  localStorage.setItem("mic","ON")
 }
})
let toggleFlash = document.querySelector(".toggle-flash")
if (localStorage.getItem("flash") == "ON") {
 toggleFlash.classList.add("active")
} else {
 toggleFlash.classList.remove("active")
}
toggleFlash.addEventListener("click", () => {

 if (toggleFlash.classList.contains("active")) {
  localStorage.removeItem("flash")
  toggleFlash.classList.remove("active")
 } else {
  toggleFlash.classList.add("active")
  localStorage.setItem("flash", "ON")
 }
})

let toggleVibrate = document.querySelector(".toggle-vibrate")
if (localStorage.getItem("vibrate") == "ON") {
 toggleVibrate.classList.add("active")
} else {
 toggleVibrate.classList.remove("active")
}
toggleVibrate.addEventListener("click", () => {

 if (toggleVibrate.classList.contains("active")) {
  localStorage.removeItem("vibrate")
  toggleVibrate.classList.remove("active")
 } else {
  toggleVibrate.classList.add("active")
  localStorage.setItem("vibrate", "ON")
 }
})

let clearTimer = document.getElementById("clear-timer")
clearTimer.addEventListener("click",()=>{
 localStorage.removeItem("startAmPm")
 localStorage.removeItem("stopAmPm")
 localStorage.removeItem("startMinute")
 localStorage.removeItem("stopMinute")
 localStorage.removeItem("startHour")
 localStorage.removeItem("stopHour")
 setTimeout(()=>{alert("Timer data cleared")}, 500) 
})
let clearAll = document.getElementById("clear-all")
clearAll.addEventListener("click",()=>{
 setTimeout(()=>{
  localStorage.clear()
  alert("application data cleared and redirected to main page")
  location.reload(true)}, 600) 
})
let template = document.querySelector(".template")
let templateBtn = document.getElementById("template")
templateBtn.addEventListener("click",()=>{
 setTimeout(()=>{
   template.classList.add("active")
   HTMLheader.classList.add("blur")
   HTMLmain.classList.add("blur")
   HTMLfooter.classList.add("blur")
  
   let box1 = document.querySelector(".template.active .box1")
   let box2 = document.querySelector(".template.active .box2")
   if (localStorage.getItem("background") == "black") {
    box1.classList.add("active")
    box2.classList.remove("active")
   } else {
    box1.classList.remove("active")
    box2.classList.add("active")
   }
   box1.addEventListener("click", () => {
    box1.classList.add("active")
    box2.classList.remove("active")
    localStorage.setItem("background", "black")
   })
   box2.addEventListener("click", () => {
    box2.classList.add("active")
    box1.classList.remove("active")
    localStorage.removeItem("background")
   })
   const backArrow2 = document.getElementById("back-arrow2")
   backArrow2.addEventListener("click", () => {
    template.classList.remove("active")
    HTMLheader.classList.remove("blur")
    HTMLmain.classList.remove("blur")
    HTMLfooter.classList.remove("blur")
   })
 },300)
})

const overViewBtn = document.getElementById("overview")
let overviewPopUp = document.querySelector(".overview")
overViewBtn.addEventListener("click",()=>{
  /* prevent window scroll */
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  window.scrollTo(0, 0);
 overviewPopUp.classList.add("active")
 HTMLheader.classList.add("backgroundBlur")
 HTMLmain.classList.add("backgroundBlur")
 HTMLfooter.classList.add("backgroundBlur")
})

let overviewCBtn = document.querySelector(".overview .box button")
overviewCBtn.addEventListener("click",()=>{
 overviewPopUp.classList.remove("active")
 HTMLheader.classList.remove("backgroundBlur")
 HTMLmain.classList.remove("backgroundBlur")
 HTMLfooter.classList.remove("backgroundBlur")
 window.onscroll = function(){}
 
})
