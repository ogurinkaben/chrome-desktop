var morningBg = [
  'img/morning/morning1.jpg',
  'img/morning/morning2.jpg',
  'img/morning/morning3.jpg',
  'img/morning/morning4.jpg',
  'img/morning/morning5.jpg',


]
var dayBg = [
  'img/day/day1.jpg',
  'img/day/day2.jpg',
  'img/day/day3.jpg',
  'img/day/day4.jpg',
  'img/day/day5.jpg',

]


var nightBackground =
  ['/img/night/night-bg.jpg',
    '/img/night/mojave-night.jpg',
    'img/night/night1.jpg',
    'img/night/night2.jpg',
    'img/night/night3.jpg']
    


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
      setTimeout(updateTime, 1000);
    }
    updateTime();
  }
  
  check();
  var time = new Date();
  var ch = time.getHours();
if (ch >= 18 && ch <= 23) {
  document.getElementById("msg").innerHTML = "Having a sublime night?";
  document.querySelector("body").style.backgroundImage = "url(" + nightBackground[Math.floor(Math.random() * nightBackground.length)] + ")";
}
else if (ch >= 12 && ch < 18) {
  document.getElementById("msg").innerHTML = "Having a good day?";
  document.querySelector("body").style.backgroundImage = "url(" + dayBg[Math.floor(Math.random() * dayBg.length)] + ")";
  } 
  else {
  document.getElementById("msg").innerHTML = "Good Morning";
  document.querySelector("body").style.backgroundImage = "url(" + morningBg[Math.floor(Math.random() * morningBg.length)] + ")";
}
