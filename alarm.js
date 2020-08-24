// Display Current Time
let currentTimeDiv = document.querySelector(".current-time-box");
setInterval(displayTime, 1000);
function displayTime() {
  let d = new Date();
  let hours = d.getHours() - 12; //getting time in 12 format
  hours = hours < 0 ? d.getHours() : hours; //Changing time at night 12

  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ampm = d.getHours() >= 12 ? "PM" : "AM";
  minutes = minutes < 10 ? "0" + minutes : minutes; //Placing 0 before minutes
  let currentTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

  currentTimeDiv.innerHTML = `<p style="text-align:center;color:#ecf0f1">Time is ${currentTime}</p>`;
}

//Set Alarm

function setAlarm() {
  // Validating Input fields
  let inputHour = document.querySelector("#hour").value;
  let inputMinutes = document.querySelector("#minutes").value;
  let alarmBox = document.querySelector(".alarm-box");
  alarmBox.style.visibility = "visible";

  if (inputHour == "" || inputMinutes == "") {
    document.querySelector("#hour").value = "";
    document.querySelector("#minutes").value = "";

    var msg = "You can't leave input fields blank. Please fill the value.";

    document.querySelector(".error-msg").innerHTML = `<h3>${msg}</h3>`;
  } else if (isNaN(inputHour) || isNaN(inputHour)) {
    document.querySelector("#hour").value = "";
    document.querySelector("#minutes").value = "";

    var msg =
      "You can fill only numbers in input fields.Please fill numeric value.";

    document.querySelector(".error-msg").innerHTML = `<h3>${msg}</h3>`;
  } else {
    //If Erros msg is present the Hide the Error msg
    document.querySelector(".error-msg").style.display = "none";
    // Disabling Inputs fields and buttons
    document.querySelector("#hour").setAttribute("disabled", true);
    document.querySelector("#minutes").setAttribute("disabled", true);
    document.querySelector(".set-btn").setAttribute("disabled", true);
    document.querySelector("#am-pm").setAttribute("disabled", true);
    document.querySelector("#hour").style.backgroundColor = "#e74c3c";
    document.querySelector("#minutes").style.backgroundColor = "#e74c3c";
    document.querySelector(".set-btn").style.backgroundColor = "#e74c3c";
    document.querySelector("#am-pm").style.backgroundColor = "#e74c3c";

    // Get the alarm time
    let uHours = document.querySelector("#hour").value;
    let uMinutes = document.querySelector("#minutes").value;
    let uAmPm = document.querySelector("#am-pm").value;
    uMinutes = uMinutes < 10 ? "0" + uMinutes : uMinutes;

    // Save data to localstorgae
    localStorage.setItem("uHours", uHours);
    localStorage.setItem("uMinutes", uMinutes);
    localStorage.setItem("uamPm", uAmPm);
    console.log(localStorage);

    // Display alarm box
    let alarmBox = document.querySelector(".alarm-box");
    alarmBox.style.visibility = "visible";
    let alarmTimeText = document.querySelector(".alarm-box h1");
    alarmTimeText.innerText = uHours + " " + ": " + uMinutes + " " + uAmPm;

    // Play sound on alarm time

    let d = new Date();
    let hours = d.getHours() - 12;
    // hours = hours < 0 ? d.getHours() : hours; //Changing time at night 12
    if (hours == 0) {
      hours = 12;
    } else if (hours < 0) {
      hours = d.getHours();
    }
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let ampm = d.getHours() >= 12 ? "PM" : "AM";
    minutes = minutes < 10 ? "0" + minutes : minutes; //Placing 0 before minutes

    let uH = localStorage.getItem("uHours");
    let uM = localStorage.getItem("uMinutes");
    let uAP = localStorage.getItem("uamPm");
    let timeToAlarm = (parseInt(uH) * 60 + parseInt(uM)) * 60 * 1000;
    let timeWhenAlarmIsSet =
      (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000;
    let timeToPlay =
      timeToAlarm - timeWhenAlarmIsSet - parseInt(seconds) * 1000;
    console.log(uH, uM);
    console.log(hours);
    console.log(minutes);
    console.log(seconds);
    console.log(timeToAlarm);
    console.log(timeWhenAlarmIsSet);
    console.log(timeToPlay);

    if (timeToPlay >= 0 && uAP == ampm) {
      setTimeout(() => {
        let sound = new Audio();
        sound.src = "ringtone1.mp3";
        sound.loop = true;
        sound.play();

        // Stop Alarm
        let stopBtn = document.createElement("button");
        stopBtn.classList.add("delete-btn");
        stopBtn.innerText = "Stop Alarm";
        document.querySelector(".alarm-box").appendChild(stopBtn);
        stopBtn.addEventListener("click", function () {
          sound.pause();
        });
      }, Math.abs(timeToPlay));
    } else if (timeToPlay < 0 && uAP == ampm) {
      document.querySelector(".alarm-box").innerHTML =
        "<h4 style='color:red'>Please Set proper alarm. You Can't set alarm for past time.</h4>";
      let refreshBtn = document.createElement("button");
      refreshBtn.classList.add("delete-btn");
      refreshBtn.innerText = "Refresh";
      document.querySelector(".alarm-box").appendChild(refreshBtn);
      refreshBtn.addEventListener("click", function () {
        window.location.href = "index.html";
      });
    }
  }
}

//Delete btn reset local storage
function deleteAlarm() {
  localStorage.clear();
  window.location.href = "index.html";
}
