import TaskList from './class-task-list.js';

const taskList = new TaskList();
const task1 = 'This is task 1';
const task2 = 'This is task 2';

beforeAll(() => {
  taskList.addTask(task1);
});

describe('Check add-remove values:', () => {
  test('task object is properly created', () => {
    expect(taskList.data).toEqual([{ description: task1, id: 1, completed: false }]);
  });
});

describe('Check whether local storage is being called on:', () => {
  test('add a task', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('remove a task', () => {
    taskList.removeTask(3);

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
