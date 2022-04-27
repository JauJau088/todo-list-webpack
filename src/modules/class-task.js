export default class Task {
  constructor(_description, _index, _completed = false) {
    this.description = _description;
    this.index = _index;
    this.completed = _completed;
  }
}
