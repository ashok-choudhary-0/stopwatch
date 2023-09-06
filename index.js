let startTime, stopWatchInterval, lapStartTime;
let elapsedPausedTime = 0;
let lapArray = [];
let displayTimeArray = [];


function startFunction() {
  document.getElementById("stop").style.display = "flex"
  document.getElementById("start").style.display = "none"
  document.getElementById("lap").style.display = "flex"
  customStopWatch();
}


function customStopWatch() {
  startTime = new Date().getTime() - elapsedPausedTime;
  stopWatchInterval = setInterval(updateStopWatch, 100);
}

function format(number) {
  return (number < 10 ? "0" : "") + number;
}


function timeCorrectFormat(time) {
  const milliSeconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const hours = Math.floor(time / 1000 / 60 / 60);
  const displayTime = format(hours) + ":" + format(minutes) + ":" + format(seconds) + ":" + format(milliSeconds);
  return displayTime;
}

function updateStopWatch() {
  const timer = document.getElementById("timer")
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;
  const displayTime = timeCorrectFormat(elapsedTime);
  timer.innerHTML = displayTime;
  timer.style.color = "black"
  timer.style.fontSize = "2rem"
}


// adding onClick instead of addEventListener bcz here we need only one event 
// rather then multiple events on a single element

function resetFunction() {
  stopFunction();
  elapsedPausedTime = 0;
  document.getElementById("timer").innerHTML = "00:00:00";
  timer.style.color = "white"
  timer.style.fontSize = "1.5rem"
  lapArray = [];
  document.getElementById("lapContainer").innerHTML = "";
  displayTimeArray = []
}


function stopFunction() {
  document.getElementById("start").style.display = "flex"
  document.getElementById("stop").style.display = "none"
  document.getElementById("lap").style.display = "none"
  clearInterval(stopWatchInterval);
  elapsedPausedTime = new Date().getTime() - startTime;
  stopWatchInterval = null;
}



function lapFunction() {
  lapStartTime = new Date().getTime() - startTime;
  lapArray.push(lapStartTime)
  let showLap;
  if (lapArray.length == 1) {
    showLap = lapArray[0];
  }

  if (lapArray.length > 1) {
    for (let index = lapArray.length; index >= lapArray.length - 1; index--) {
      showLap = lapArray[index] - lapArray[index - 1];
    }
  }


  const displayTime = timeCorrectFormat(showLap);
  displayTimeArray.push(displayTime);

  let displayLapString = "";
  for (let i = 0; i < displayTimeArray.length; i++) {
    displayLapString += "lap" + i + " = " + displayTimeArray[i] + "<br/>"

  }
  document.getElementById("lapContainer").innerHTML = displayLapString;
}






