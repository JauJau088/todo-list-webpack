// ### 0. Imports
import './style.css';
import addElem from './modules/add-elem.js';
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
};

// 2.3. Dynamic list
taskList.data.forEach((e) => {
  let isChecked;
  let strikeThrough;
  if (e.completed === true) {
    isChecked = 'checked';
    strikeThrough = 'strike-through';
  }

  // listContainer.innerHTML += `<div class="row todo-list">
  // <input class="checkbox" type="checkbox" ${isChecked}>
  // <input class="${strikeThrough}" value="${e.description}">
  // <i class="fa-solid fa-ellipsis-vertical fa-lg font-awesome-icon"></i>
  // </div>`;

  const todoList = addElem('div', ['row', 'todo-list'], listContainer);
  const listCheckBox = addElem('input', ['checkbox'], todoList);
  listCheckBox.setAttribute('type', 'checkbox');
  listCheckBox.setAttribute(isChecked, '');
  const listText = addElem('input', ['list-text', strikeThrough], todoList);
  listText.value = e.description;
  const listIconDots = addElem('i', ['fa-solid', 'fa-ellipsis-vertical', 'fa-lg', 'font-awesome-icon'], todoList);
  const listIconTrash = addElem('i', ['fa-solid', 'fa-trash-can', 'fa-lg', 'font-awesome-icon', 'hide'], todoList);

  // Event listener
  listContainer.addEventListener('click', () => {
    if (listText === document.activeElement) {
      listIconDots.classList.add('hide');
      listIconTrash.classList.remove('hide');
      todoList.style.backgroundColor = '#fffdcc';
    } else {
      listIconDots.classList.remove('hide');
      listIconTrash.classList.add('hide');
      todoList.style.backgroundColor = 'transparent';
    }
  });
});
