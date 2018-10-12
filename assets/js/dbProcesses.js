import { toDosDataInfo } from './databse.js';
let toDoElement;
const gP = {
searchForDate: function(stringId) {
  toDoElement= toDosDataInfo.filter((x) => x.key === stringId)[0];
  if (toDoElement !== Object) {
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
    editToDo: function(li, str) {
      toDoElement.toDo[li].value = str;
    },
    deleteToDo: function(li) {
      toDoElement.toDo.splice([li], 1);
    },
    editImportance: function(li) {
      toDoElement.toDo[li].important = !toDoElement.toDo[li].important;
    },
};
export { gP };
