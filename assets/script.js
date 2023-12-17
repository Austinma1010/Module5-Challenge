// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    for (var i = 9; i <= 17; i++) {
      var saveButton = document.querySelector('#hour-' + i + ' .btn');
      if (saveButton) {
        saveButton.addEventListener('click', save);
      }
    }
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    updateBlocks();
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    updateBlockText();
    // TODO: Add code to display the current date in the header of the page.
    showCurrentTime();
  });

  function updateBlocks() {
    var currentHour = dayjs().format('H');

    for (var i = 9; i <= 17; i++) {
      var block = document.getElementById('hour-' + i);
      if (i < currentHour) {
        block.classList.remove('present', 'future');
        block.classList.add('past');
      } else if (i === currentHour) {
        block.classList.remove('past', 'future');
        block.classList.add('present');
      } else {
        block.classList.remove('past', 'present');
        block.classList.add('future');
      }
    }
  }

  function save() {
    var parent = this.closest('.time-block');
    var text = parent.querySelector('.description');
    var saveText = text.value;
    localStorage.setItem(parent.id, saveText);
  }

  function updateBlockText() {
    for (var i = 9; i <= 17; i++) {
      var textEl = document.querySelector('#hour-' + i + ' .description');
      var text = localStorage.getItem('hour-' + i);
      if (text) {
        textEl.innerHTML = text;
      }

    }
  }

  function showCurrentTime() {
    var today = dayjs().format('MMM[ ]D[, ]YYYY');
    var showToday = document.getElementById('currentDay');
    showToday.textContent = today;
  }
