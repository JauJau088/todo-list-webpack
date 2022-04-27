// ### 0. Imports
import './style.css';
import addElem from './modules/add-elem.js';
import isStorageAvailable from './modules/local-storage-checker.js';
import Task from './modules/class-task.js';

// ### 1. Data
let taskList = [];
// If there's local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('taskList'));
  // and if it's not empty, update it
  if (data) {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }
}

// ### 2. DOM Manipulations
const mainContainer = document.querySelector('.todo-list-container');

// HTML skeleton
// Header (Title and input)
mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-lg font-awesome-icon"></i>
</div>`;
const inputContainer = addElem('div', [], mainContainer);
const inputText = addElem('input', [], inputContainer);
inputText.setAttribute('placeholder', 'Add to your list...');
// Main (list)
const listContainer = addElem('div', [], mainContainer);
// Bottom (button)
const clearButton = addElem('button', ['button'], mainContainer);
clearButton.textContent = 'Clear all completed';

// 

// Dynamic list
taskList.forEach((e) => {
  let isChecked;
  let strikeThrough;
  if (e.completed === true) {
    isChecked = 'checked';
    strikeThrough = 'strike-through';
  }

  listContainer.innerHTML += `<div class="row">
  <input class="checkbox" type="checkbox" ${isChecked}>
  <p class="${strikeThrough}">${e.description}</p>
  <i class="fa-solid fa-ellipsis-vertical fa-lg font-awesome-icon"></i>
  </div>`;
});
