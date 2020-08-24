let timeToAlarm = (parseInt(uH) * 60 + parseInt(uM)) * 60 * 1000;
let timeWhenAlarmIsSet = (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000;
let timeToPlay = Math.abs(
  timeToAlarm - timeWhenAlarmIsSet - parseInt(seconds) * 1000
);
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
  }, timeToPlay);
} else if (timeToPlay < 0 && uAP == ampm) {
  alert("Please Set proper alarm. You Can't set alarm for past.");
}
// Other way
let H = 12 - Math.abs(parseInt(hours) + parseInt(uH));
let M = H * 60;
let mMlarm = parseInt([M - parseInt(minutes)]) + parseInt(uM);
let timeToAlarm = mMlarm * 60 * 60 * 1000 - parseInt(seconds) * 1000;
console.log(hours);
console.log(minutes);
console.log(seconds);
console.log(uH);
console.log(uM);
console.log(H);
console.log(M);
console.log(mMlarm);
console.log(timeToAlarm);

if (timeToAlarm >= 0 && uAP == ampm) {
  setTimeout(() => {
    let sound = new Audio();
    sound.src = "ringtone1.mp3";
    sound.loop = true;
    sound.play();
  }, timeToAlarm);
} else if (timeToAlarm < 0 && uAP == ampm) {
  alert("Please Set proper alarm. You Can't set alarm for past.");
}
