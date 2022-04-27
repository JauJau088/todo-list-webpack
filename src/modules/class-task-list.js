import Task from './class-task.js';
import isStorageAvailable from './local-storage-checker.js';

const storageName = 'taskList';

export default class TaskList {
  constructor() {
    this.data = [];
    this.id = 0;
    this.initUpdate();
  }

  initUpdate() {
    // If there's local data available,
    if (isStorageAvailable('localStorage')) {
      const data = JSON.parse(localStorage.getItem(storageName));
      // and if it's not empty, update it
      if (data) {
        this.data = JSON.parse(localStorage.getItem(storageName));
        // Update id according to the biggest one from storage
        const lastItem = this.data.reduce((prev, current) => {
          const val = prev.id > current.id ? prev : current;
          return val;
        });
        this.id = lastItem.id + 1;
      }
    }
  }

  addTask(task) {
    if (isStorageAvailable) {
      const taskObj = new Task(task, this.id);

      this.data.push(taskObj);
      localStorage.setItem(storageName, JSON.stringify(this.data));

      this.id += 1;
    }
  }

  removeTask(taskID) {
    this.data = this.data.filter((i) => i.id !== taskID);
    localStorage.setItem(storageName, JSON.stringify(this.data));
  }

  updateStatus(taskID, status) {
    this.data = this.data.map((obj) => {
      if (obj.id === taskID) {
        return { ...obj, completed: status };
      }

      return obj;
    });
    localStorage.setItem(storageName, JSON.stringify(this.data));
  }

  renameTask(taskID, newTask) {
    const target = this.data.find((i) => i.id === taskID);
  }
}
