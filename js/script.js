var bg =
  ['/img/bg/bg-1.jpg',
    'img/bg/bg-3.jpg',
    'img/bg/bg-4.jpg',
    'img/bg/bg-5.jpg'];

document.querySelector("body").style.backgroundImage = "url(" + bg[Math.floor(Math.random() * bg.length)] + ")";
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');
  function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = seconds * 6;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    const mins = now.getMinutes();
    const minsDegrees = mins * 6;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;
    const hour = now.getHours();
    const hourDegrees = hour * 30;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }
  setInterval(setDate, 1000);
  setDate();

    


function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function check() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById("date").innerHTML=today.toLocaleDateString("en-US", options);
    t = setInterval(function() {
      check()
    }, 60000);
    var currentTime = document.getElementById("time");
    function timer(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }
    function updateTime() {
      var timeNow = new Date(),
        hh = timeNow.getHours(),
        mm = timeNow.getMinutes(),
        ss = timeNow.getSeconds(),
        formatAMPM = (hh >= 12 ? 'PM' : 'AM');
      hh = hh % 12 || 12;
      currentTime.innerHTML = hh + "<span>:</span>" + timer(mm) + "<span>:</span>" + timer(ss) + " " + formatAMPM;
      setInterval(updateTime, 1000);
    }
    updateTime();
  }
  
  check();
  var time = new Date();
  var ch = time.getHours();
if (ch >= 18 && ch <= 23) {
  document.getElementById("msg").innerHTML = "Having a sublime night?";
 
}
else if (ch >= 12 && ch < 18) {
  document.getElementById("msg").innerHTML = "Having a good day?";
  } 
  else {
  document.getElementById("msg").innerHTML = "Good Morning";
}
