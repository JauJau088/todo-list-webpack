// ### 0. Imports
import './style.css';
import addElem from './modules/add-elem.js';
import isStorageAvailable from './modules/local-storage-checker.js';
import Task from './modules/class-task.js';
import TaskList from './modules/class-task-list.js';

// ### 1. Data
const taskList = new TaskList();

// ### 2. DOM Manipulations
const mainContainer = document.querySelector('.todo-list-container');

// 2.1. HTML skeleton
// Header (Title and input)
mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-lg font-awesome-icon"></i>
</div>`;
const inputContainer = addElem('form', [], mainContainer);
const inputText = addElem('input', [], inputContainer);
inputText.setAttribute('placeholder', 'Add to your list...');
// Main (list)
const listContainer = addElem('div', [], mainContainer);
// Bottom (button)
const clearButton = addElem('button', ['button'], mainContainer);
clearButton.textContent = 'Clear all completed';

// 2.2. Input functionalities
inputContainer.onsubmit = (e) => {
  e.preventDefault();
  taskList.addTask(inputText.value);

  inputContainer.reset();
};

// 2.3. Dynamic list
taskList.data.forEach((e) => {
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
