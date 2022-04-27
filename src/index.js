// ### 0. Imports
import './style.css';
import addElem from './modules/add-elem.js';
import TaskList from './modules/class-task-list.js';
import refreshList from './modules/refresh-list.js';

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
const inputText = addElem('input', ['input-add-task'], inputContainer);
inputText.setAttribute('placeholder', 'Add to your list...');
addElem('i', ['fa-solid', 'fa-arrow-right-to-bracket', 'fa-sm', 'font-awesome-icon'], inputContainer);
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
  refreshList(taskList, listContainer);
};

// 2.3. Dynamic list
refreshList(taskList, listContainer);
