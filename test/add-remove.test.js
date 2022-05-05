/**
 * @jest-environment jsdom
 */

import TaskList, { storageName } from '../src/modules/class-task-list.js';
import refreshList from '../src/modules/refresh-list.js';

const taskList = new TaskList();
const task1 = 'This is task 1';
const task2 = 'This is task 2';
const task3 = 'This is task 3';

// Local storage testing
describe('Check if the localStorage and the DOM are being used as intended:', () => {
  describe('Add items:', () => {
    // Add Local storage 1
    test(`localStorage add task: "${task1}"`, () => {
      taskList.addTask(task1);

      // Check the value in local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([{ description: task1, id: 1, completed: false }]);
    });

    // Add DOM 1
    test(`DOM add task: "${task1}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(1);
    });

    // Add Local storage 2
    test(`localStorage add task: "${task2}"`, () => {
      taskList.addTask(task2);

      // Check the value in local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2, id: 2, completed: false },
        ]);
    });

    // Add DOM 2
    test(`DOM add task: "${task2}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(2);
    });

    // Add Local storage 3
    test(`localStorage add task: "${task3}"`, () => {
      taskList.addTask(task3);

      // Check the value in local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2, id: 2, completed: false },
          { description: task3, id: 3, completed: false },
        ]);
    });

    // Add DOM 3
    test(`DOM add task: "${task3}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(3);
    });
  });

  describe('Remove items:', () => {
    test(`remove task: "${task1}"`, () => {
      taskList.removeTask(1);
      // check the value in the local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        . toEqual([
          { description: task2, id: 1, completed: false },
          { description: task3, id: 2, completed: false },
        ]);
    });
    test(`remove task: "${task3}"`, () => {
      taskList.removeTask(2);
      // check the value in the local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        . toEqual([
          { description: task2, id: 1, completed: false },
        ]);
    });
  });
});
