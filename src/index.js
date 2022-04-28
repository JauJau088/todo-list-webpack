// ### 0. Imports
import './style.css';
import addElem from './modules/add-elem.js';
import TaskList from './modules/class-task-list.js';
import refreshList from './modules/refresh-list.js';
import aboveThisElem from './modules/drag-n-drop.js';
import moveInArray from './modules/move-in-array.js';

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
// All of main's functionalities are handled by refreshList module
const listContainer = addElem('div', [], mainContainer);
// Bottom (button)
const clearButton = addElem('button', ['button'], mainContainer);
clearButton.textContent = 'Clear all completed';
// End of body
document.body.innerHTML += '<script src="https://kit.fontawesome.com/a11f8b435e.js" crossorigin="anonymous"></script>';

// 2.1.1. Input functionalities
inputContainer.onsubmit = (e) => {
  e.preventDefault();
  taskList.addTask(inputText.value);

  inputContainer.reset();
  refreshList(taskList, listContainer);
};

// 2.1.2. clear button
clearButton.onclick = () => {
  // console.log('clear');
  taskList.clearCompleted();
  refreshList(taskList, listContainer);
};

// 2.1.3. When there is something being dragged in mainCtr
mainContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  // Get data
  const data = JSON.parse(localStorage.getItem('taskList'));

  // Identify which object is being dragged
  // Noticable from having .dragging class attached to it from
  // the dragstart event listener in refresh-list.js
  const dragged = document.querySelector('.dragging');
  const draggedData = data.find((e) => e.description === dragged.querySelector('.list-text').value);

  // Then call this function here to get information
  // above which element is this element currently at
  const aboveElem = aboveThisElem(e.clientY);
  // If elem === null, so, it's above nothing
  // meaning it's at the bottom
  let a;
  if (aboveElem === undefined) {
    moveInArray(data, draggedData.id - 1, data.length);
  } else {
    const aboveElemData = data.find((e) => e.description === aboveElem.querySelector('.list-text').value);
    moveInArray(data, draggedData.id - 1, aboveElemData.id - 1);
  }
  taskList.updateData(data);
  refreshList(taskList, listContainer);
});

// On load
refreshList(taskList, listContainer);
