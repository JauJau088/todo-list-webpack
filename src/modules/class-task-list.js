import Task from './class-task.js';
import isStorageAvailable from './local-storage-checker.js';

const storageName = 'taskList';

export default class TaskList {
  constructor() {
    this.data = [];
    this.length = 0;
    this.initUpdate();
  }

  initUpdate() {
    // If there's local data available,
    if (isStorageAvailable('localStorage')) {
      const data = JSON.parse(localStorage.getItem(storageName));
      // and if it's not empty, update it
      if (data) {
        this.data = JSON.parse(localStorage.getItem(storageName));
      }
    }
  }

  addTask(task) {
    if (isStorageAvailable) {
      const taskObj = new Task(task, this.length);

      this.data.push(taskObj);
      localStorage.setItem(storageName, JSON.stringify(this.data));

      this.length += 1;
    }
  }
}
