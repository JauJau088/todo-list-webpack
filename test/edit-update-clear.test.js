/**
 * @jest-environment jsdom
 */

import TaskList, { storageName } from '../src/modules/class-task-list.js';
import refreshList from '../src/modules/refresh-list.js';

const taskList = new TaskList();
const task1 = 'This is task 1';
const task2 = 'This is task 2';
const task3 = 'This is task 3';
const task2New = 'Edit task 2';

beforeAll(() => {
  taskList.addTask(task1);
  taskList.addTask(task2);
  taskList.addTask(task3);
  refreshList(taskList, document.body);
});

describe('Check if edit, update, and clear are working as intended:', () => {
  // 1. Edit
  describe('Edit', () => {
    // Local storage
    test(`localStorage edit task: "${task2}" to "${task2New}"`, () => {
      taskList.renameTask(2, task2New);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2New, id: 2, completed: false },
          { description: task3, id: 3, completed: false },
        ]);
    });
    // DOM
    test(`DOM edit task: "${task2}" to "${task2New}"`, () => {
      refreshList(taskList, document.body);

      const task2NewElement = document.querySelectorAll('.todo-list')[1];
      const task2NewText = task2NewElement.querySelector('.list-text');

      expect(task2NewText.value)
        .toBe(task2New);
    });
  });
  // 2. Update status
  describe('Update status of task :', () => {
    // local storage
    test(`localStorage update task: "${task2New}" to completed`, () => {
      taskList.updateStatus(2, true);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2New, id: 2, completed: true },
          { description: task3, id: 3, completed: false },
        ]);
    });
    // DOM
    test(`DOM update status of the task: "${task2New}" to completed`, () => {
      refreshList(taskList, document.body);

      const task2NewElement = document.querySelectorAll('.todo-list')[1];
      const task2NewCheckBox = task2NewElement.querySelector('.checkbox');

      expect(task2NewCheckBox.checked)
        .toBe(true);
    });
  });
  // 3. Clear all completed
  describe('Clear all completed tasks:', () => {
    // Local storage
    test(`localStorage clear completed tasks ("${task2New}")`, () => {
      taskList.clearCompleted();

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task3, id: 2, completed: false },
        ]);
    });
    // DOM
    test(`DOM clear completed tasks ("${task2New}")`, () => {
      refreshList(taskList, document.body);

      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(2);
    });
  });
});
