/**
 * @jest-environment jsdom
 */

import TaskList, { storageName } from './class-task-list.js';
import refreshList from './refresh-list.js';

const taskList = new TaskList();
const task1 = 'This is task 1';
const task2 = 'This is task 2';

beforeAll(() => {

});

describe('Check whether add and remove methods update the local storage properly:', () => {
  describe(`Add task: "${task1}"`, () => {
    test('localStorage is updated', () => {
      taskList.addTask(task1);

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    test('localStorage.getItem returns the correct value', () => {
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([{ description: task1, id: 1, completed: false }]);
    });
  });

  describe(`Add task: "${task2}"`, () => {
    test('localStorage is updated', () => {
      taskList.addTask(task2);

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    test('localStorage.getItem returns the correct value', () => {
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2, id: 2, completed: false },
        ]);
    });
  });

  // test('remove a task', () => {
  //   taskList.removeTask(3);

  //   expect(localStorage.setItem).toHaveBeenCalled();
  // });
});

test('should ', () => {
  refreshList(taskList, document.body);
  const validateElements = document.querySelectorAll('.todo-list');

  expect(validateElements.length)
    .toEqual(2);
});
