// Time and Date
function digitalClock() {
  var todayHTML = document.getElementById("today");
  var monthHTML = document.getElementById("month");
  var timeHTML = document.getElementById("time");
  var dateHTML = document.getElementById("date");
  var yearHTML = document.getElementById("year");
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var date = d.getDate();
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
  todayHTML.innerHTML = dayName[today];
  dateHTML.innerHTML = date;
  monthHTML.innerHTML = monthName[month];
  yearHTML.innerHTML = year;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

setInterval(digitalClock, 1000);

//Task List App
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const msg = document.querySelector(".msg");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fas fa-trash"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    msg.innerHTML = "Please add a task";
    msg.style.display = "block";
    setTimeout(function () {
      msg.innerHTML = "";
      msg.style.display = "none";
    }, 3000);
  } else {
    msg.innerHTML = "Task added";
    msg.style.display = "block";
    setTimeout(function () {
      msg.innerHTML = "";
      msg.style.display = "none";
    }, 3000);
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fas fa-trash"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
  }
  taskInput.value = "";

  e.preventDefault();
}
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    msg.innerHTML = "Task Removed";
    msg.style.display = "block";
    setTimeout(function () {
      msg.innerHTML = "";
      msg.style.display = "none";
    }, 3000);
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    msg.innerHTML = "All Tasks cleared";
    msg.style.display = "block";
    setTimeout(function () {
      msg.innerHTML = "";
      msg.style.display = "none";
    }, 3000);
  }
  clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
