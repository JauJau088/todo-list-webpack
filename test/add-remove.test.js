import TaskList, { storageName } from '../src/modules/class-task-list.js';

const taskList = new TaskList();
const task1 = 'This is task 1';
const task2 = 'This is task 2';
const task3 = 'This is task 3';

// Local storage testing
describe('Check if localStorage is being used properly:', () => {
  describe('Add items:', () => {
    test(`add task: "${task1}"`, () => {
      taskList.addTask(task1);

      // Check the value in local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([{ description: task1, id: 1, completed: false }]);
    });

    test(`add task: "${task2}"`, () => {
      taskList.addTask(task2);

      // Check the value in local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2, id: 2, completed: false },
        ]);
    });

    test(`add task: "${task3}"`, () => {
      taskList.addTask(task3);

      // Check the value in local storage
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: task1, id: 1, completed: false },
          { description: task2, id: 2, completed: false },
          { description: task3, id: 3, completed: false },
        ]);
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
