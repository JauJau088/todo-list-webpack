// ### 0. Imports
import './style.css';

// ### 1. Functions
// 1.1. Shorthand function for creating generic elements
// elem = string, classes = array of string(s), parent = DOM element
const addElem = (elem, classes, parent) => {
  const createdElem = document.createElement(elem);
  if (classes !== undefined) {
    classes.forEach((cl) => createdElem.classList.add(cl));
  }
  parent.appendChild(createdElem);

  return createdElem;
};

// ### 2. Data
const taskList = [
  {
    description: 'Grocery shopping',
    completed: false,
    index: 0,
  },
  {
    description: 'Study Webpack',
    completed: true,
    index: 1,
  },
  {
    description: 'Complete Webpack projects',
    completed: false,
    index: 2,
  },
  {
    description: 'Exercise',
    completed: true,
    index: 3,
  },
];

// ### 3. DOM Manipulations
const mainContainer = document.querySelector('.todo-list-container');
// const titleContainer = addElem('div', [], mainContainer);
// const title = addElem('h1', )
// title.textContent = 'Today\'s To Do';
mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-xl font-awesome-icon"></i>
</div>`;

taskList.forEach(() => {
  mainContainer.innerHTML += ``;
});
