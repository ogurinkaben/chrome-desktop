// Time and Date
function digitalClock() {
  let todayHTML = document.getElementById("today"),
    monthHTML = document.getElementById("month"),
    timeHTML = document.getElementById("time"),
    dateHTML = document.getElementById("date"),
    yearHTML = document.getElementById("year"),
    d = new Date(),
    year = d.getFullYear(),
    month = d.getMonth(),
    date = d.getDate();
  date = addZero(date);
  var hours = d.getHours();
  hours = addZero(hours);
  var minutes = d.getMinutes();
  minutes = addZero(minutes);
  var seconds = d.getSeconds();
  seconds = addZero(seconds);
  var today = d.getDay();
  var dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  timeHTML.innerHTML = hours + " : " + minutes + " : " + seconds;
  todayHTML.innerHTML = `${dayName[today]},`;
  dateHTML.innerHTML = date;
  monthHTML.innerHTML = `${monthName[month]},`;
  yearHTML.innerHTML = year;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
setInterval(digitalClock, 1000);