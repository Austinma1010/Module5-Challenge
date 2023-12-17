
$(function () {
   
    for (var i = 9; i <= 17; i++) {  // for loop iterates through each block and adds an event listener to every save button.
      var saveButton = document.querySelector('#hour-' + i + ' .btn');
      if (saveButton) { //confirms that querySelector found the ID
        saveButton.addEventListener('click', save); //adds event listener to each block
      }
    }
    
    updateBlocks();
   
    updateBlockText();
    
    showCurrentTime();
  });

  function updateBlocks() { // changes color of blocks depending on time of day
    var currentHour = dayjs().format('H'); // gets the current hour

    for (var i = 9; i <= 17; i++) { // iterates through every block
      var block = document.getElementById('hour-' + i); // gets each id
      if (i < currentHour) {
        block.classList.remove('present', 'future'); // removes any current classes
        block.classList.add('past'); // adds the needed class
      } else if (i == currentHour) {
        block.classList.remove('past', 'future');
        block.classList.add('present');
      } else {
        block.classList.remove('past', 'present');
        block.classList.add('future');
      }
    }
  }

  function save() { // saves any entered text to local storage
    var parent = this.closest('.time-block'); // navigates to the parent block of the save button that was clicked
    var text = parent.querySelector('.description'); // selects the text element within the block
    var saveText = text.value; // stores the value found within the text element
    localStorage.setItem(parent.id, saveText); // saves that value to local storage under the blocks id
  }

  function updateBlockText() { // writes text saved in local storage to the correct text box
    for (var i = 9; i <= 17; i++) {
      var textEl = document.querySelector('#hour-' + i + ' .description'); // selects text element of a block by id using the for loop to iterate through each block
      var text = localStorage.getItem('hour-' + i); // searches local storage for stored text with matching id
      if (text) { // checks to see if text was found in local storage
        textEl.innerHTML = text; // writes text from local storage to textEl
      }

    }
  }

  function showCurrentTime() { // displays the current date at the top of the page
    var today = dayjs().format('MMM[ ]D[, ]YYYY'); // gets the current date and formats it
    var showToday = document.getElementById('currentDay'); // grabs the element where the date will be stored
    showToday.textContent = today; // writes the date into the element
  }
