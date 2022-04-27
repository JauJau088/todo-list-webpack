// ### 0. Imports
import './style.css';
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

mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-lg font-awesome-icon"></i>
</div>
<div>
<input placeholder="Add to your list...">
</div>`;

taskList.forEach((e) => {
  let isChecked;
  let strikeThrough;
  if (e.completed === true) {
    isChecked = 'checked';
    strikeThrough = 'strike-through';
  }

  mainContainer.innerHTML += `<div class="row">
  <input class="checkbox" type="checkbox" ${isChecked}>
  <p class="${strikeThrough}">${e.description}</p>
  <i class="fa-solid fa-ellipsis-vertical fa-lg font-awesome-icon"></i>
  </div>`;
});

mainContainer.innerHTML += '<button class="button">Clear all completed</button>';
