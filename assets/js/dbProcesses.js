import { toDosDataInfo } from './databse.js';
let toDoElement;
const DatabaseProcesses = {
  searchForDate: function(stringId) {
    toDoElement = toDosDataInfo.filter((x) => x.key === stringId)[0];
    console.log(toDoElement);
    if (toDoElement === undefined) {
      toDoElement = {
        key: stringId,
        toDo: [],
      };
      toDosDataInfo.push(toDoElement);
    }
    return toDoElement;
  },
  pushToDate: function(str) {
    toDoElement.toDo.push({
      value: str,
      important: false,
    });
  },
  editToDo: function(indexOfTask, str) {
    toDoElement.toDo[indexOfTask].value = str;
  },
  deleteToDo: function(indexOfTask) {
    toDoElement.toDo.splice([indexOfTask], 1);
  },
  editImportance: function(indexOfTask) {
    toDoElement.toDo[indexOfTask].important = !toDoElement
      .toDo[indexOfTask].important;
  },
  getNumberOfTasks: function(stringId) {
    const date = this.searchForDate(stringId);
    return date.toDo.length;
  },
};
export { toDoElement, DatabaseProcesses };
