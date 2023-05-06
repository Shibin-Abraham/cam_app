//import {flag} from'../Landing page/js/index.js';

let h, m, day, d, y;
let h1 = document.getElementById("h1")
let label = document.getElementById("label")
setInterval(()=>{
 
 let date = new Date();
 h = date.getHours()
 m = date.getMinutes()
 var hm
 if(h>12){
  if(m<10){
    hm= h-12+":0"+m
  }else{
    hm= h-12+":"+m
  }
 }
 else if(h==12){
  if (m < 10) {
   hm = h + ":0" + m
  } else {
   hm = h + ":" + m
  }
 }else if(h==0){
 if (m < 10) {
  hm = "12:0" + m
 } else {
  hm = "12:" + m
 }
 }else{
  if (m < 10) {
   hm = h+ ":0" + m
  } else {
   hm = h+ ":" + m
  }
 }
 h1.innerHTML=hm
 day = date.getDay()
 d = date.getDate()
 y = date.getFullYear()
 
 switch(day){
  case 0:d<10?label.innerHTML =` Sunday 0${d}/${y}`:label.innerHTML=` Sunday ${d}/${y}`
  break;
  case 1:d<10?label.innerHTML =` Monday  0${d}/${y}`:label.innerHTML=` Monday  ${d}/${y}`
  break;
  case 2: d < 10 ? label.innerHTML = ` Tuesday  0${d}/${y}` : label.innerHTML = ` Tuesday  ${d}/${y}`
  break;
  case 3: d < 10 ? label.innerHTML = ` Wednesday  0${d}/${y}` : label.innerHTML = ` Wednesday  ${d}/${y}`
  break;
  case 4: d < 10 ? label.innerHTML = ` Thursday  0${d}/${y}` : label.innerHTML = ` Thursday  ${d}/${y}`
  break;
  case 5: d < 10 ? label.innerHTML = ` Friday  0${d}/${y}` : label.innerHTML = ` Friday  ${d}/${y}`
  break;
  case 6: d < 10 ? label.innerHTML = ` Saturday  0${d}/${y}` : label.innerHTML = ` Saturday  ${d}/${y}`
  break;
 }
})
const parts = [];
let mediaRecorder;
let constraints
if(localStorage.getItem("id")=="rear"){
 if(localStorage.getItem("cam")=="ON"&&localStorage.getItem("mic")=="ON"){
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
}else if(localStorage.getItem("cam")=="ON"&&localStorage.getItem("mic")==null){
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
 audio: false
}
}else if (localStorage.getItem("cam") == null && localStorage.getItem("mic") == "ON") {
 constraints = {
  video: false,
  audio: true
 }
}else{
 constraints = {
  video: false,
  audio: false
 }
}
}else if(localStorage.getItem("id")=="front"){
 if(localStorage.getItem("cam")=="ON"&&localStorage.getItem("mic")=="ON"){
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
}else if(localStorage.getItem("cam")=="ON"&&localStorage.getItem("mic")==null){
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
 audio: false
}
}else if (localStorage.getItem("cam") == null && localStorage.getItem("mic") == "ON") {
 constraints = {
  video: false,
  audio: true
 }
}else{
 constraints = {
  video: false,
  audio: false
 }
}
}else{
  if(localStorage.getItem("cam")=="ON"&&localStorage.getItem("mic")=="ON"){
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
}else if(localStorage.getItem("cam")=="ON"&&localStorage.getItem("mic")==null){
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
 audio: false
}
}else if (localStorage.getItem("cam") == null && localStorage.getItem("mic") == "ON") {
 constraints = {
  video: false,
  audio: true
 }
}else{
 constraints = {
  video: false,
  audio: false
 }

}
}
document.getElementById("camera").ondblclick = function() {
 localStorage.getItem("vibrate")=="ON"? 
 navigator.vibrate([200]): console.log("vibrater is off");
navigator.mediaDevices.getUserMedia(constraints).then(stream => {
 //document.getElementById("video").srcObject = stream;
 // var options = {mimeType: 'video/webm; codecs=vp9'};
 
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start(1000);

  mediaRecorder.ondataavailable = function(e) {
   if(localStorage.getItem("cam")!=null&&localStorage.getItem("id")=="rear"||localStorage.getItem("id")== null&&localStorage.getItem("flash")=="ON"){
   const track = stream.getVideoTracks()[0];
   track.applyConstraints({
    advanced: [{ torch: true }]
   });
  }
   parts.push(e.data);
   }
  console.log("recording....");
  
  document.getElementById("leaf").ondblclick = function() {
   localStorage.getItem("vibrate") == "ON" ?
    navigator.vibrate([200]) : console.log("vibrater is off");
   mediaRecorder.stop();
   if(localStorage.getItem("cam")==null){
   var blob = new Blob(parts,{
    type: "audio/mp3"
   });
   }else{
   var blob = new Blob(parts,{
    type: "video/mp4"
   });
   }
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   document.body.appendChild(a);
   a.style = "display:none";
   a.href = url;
   a.download = "test"+Math.floor(Math.random() * 1000);
   a.click();
   console.log("stop");
   location.reload(true)
  }
  
 
})
.catch((error)=>{
 console.log(error)
 location.reload(true)
 alert("please allow camera permission or turn-on camera toggle in settings")
})
}
/*
document.getElementById("leaf").ondblclick = function() {
 mediaRecorder.stop();
 const blob = new Blob(parts, {
  type: "video/mp4"
 });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 document.body.appendChild(a);
 a.style = "display:none";
 a.href = url;
 a.download = "test";
 a.click();
 console.log("stop");
}
*/
const bckGround = document.querySelector(".hero img")
if(localStorage.getItem("background") == "black"){
 bckGround.src = "images/bg-black.jpg"
}
