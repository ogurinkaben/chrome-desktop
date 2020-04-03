// Time and Date
function digitalClock() {
  var todayHTML = document.getElementById('today');
  var monthHTML = document.getElementById('month');
  var timeHTML = document.getElementById('time');
  var dateHTML = document.getElementById('date');
  var yearHTML = document.getElementById('year');
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
  var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  timeHTML.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
  todayHTML.innerHTML = dayName[today];
  dateHTML.innerHTML = date;
  monthHTML.innerHTML = monthName[month];
  yearHTML.innerHTML = year;
}

function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

setInterval(digitalClock, 1000);


// Todo List
var filters = {
  all: function(todos) {
    return todos;
  },
  complete: function(todos) {
    return todos.filter(function(todo) {
      return todo.complete;
    });
  },
  incomplete: function(todos) {
    return todos.filter(function(todo) {
      return !todo.complete;
    });
  }
}

var STORAGE_KEY = 'vue-js-todo-P7oZi9sL'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}

var app = new Vue({
  el: '#app',
  data: {
    inputVal: '',
    todos: todoStorage.fetch(),
    visibility: 'all',
    active: false,
    errors: [],
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      }
    }
  },
  computed: {
    filteredTodos: function() {
      return filters[this.visibility](this.todos);
    }
  },
  methods: {
    addTodo: function(e) {
      e.preventDefault();
      this.errors = []
      if (this.inputVal) {
        this.todos.push({
          text: this.inputVal,
          complete: false
        });
      } else {

        this.errors.push('Enter an item.');
      }
      this.inputVal = '';
    },
    toggleTodo: function(todo) {
      todo.complete = !todo.complete;
    },
    filterTodos: function(filter) {
      this.visibility = filter;
      this.active = true;
    },
    deleteTodo: function(index) {
      this.todos.splice(index, 1);
    }
  }
});