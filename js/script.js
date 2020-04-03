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
class Note {
  constructor(noteTitle, shortNote, year) {
    this.noteTitle = noteTitle;
    this.shortNote = shortNote;
    this.year = year;
  }
}

class UI {
  addNote(note) {
    const
      noteList = document.querySelector('#note-list'),
      list = document.createElement('div');
    list.innerHTML = `
    <div class="ui-list">
        <p>Title: ${note.noteTitle} </p>
      <p>Note: ${note.shortNote} </p>
      <p> <a href="#" class="delete"> Delete Note </a> </p>
      </div>
      `;
    noteList.appendChild(list);
  }

  deleteNote(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    } else {

    }
  }

  clearFields() {
    document.querySelector('#noteTitle').value = "";
    document.querySelector('#shortNote').value = "";
  }
}

class Store {
  static fetchNotes() {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }

    return notes;
  }
  static displayNotes() {
    const notes = Store.fetchNotes();
    notes.forEach(function(note) {
      const ui = new UI;

      ui.addNote(note)
    })
  }

  static addNotes(note) {
    const notes = Store.fetchNotes();
    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));
  }
  static removeNote(year) {
    const notes = Store.fetchNotes();
    notes.forEach(function(note, index) {
      if (note.year = year) {
        notes.splice(index, 1)
      }
    })

    localStorage.setItem('notes', JSON.stringify(notes));

  }
}
document.addEventListener('DOMContentLoaded', Store.displayNotes);
document.querySelector('#note-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const
    noteTitle = document.querySelector('#noteTitle').value,
    shortNote = document.querySelector('#shortNote').value,
    year = document.querySelector('#year').value,

    note = new Note(noteTitle, shortNote, year),
    ui = new UI();

  if (noteTitle === '' || shortNote === '' || year === '') {
    alert("Fill all Fields")
  } else {
    ui.addNote(note);

    Store.addNotes(note);
    ui.clearFields();
  }

});

document.getElementById('note-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.deleteNote(e.target);
  Store.removeNote(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
})