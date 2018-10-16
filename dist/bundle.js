/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/calendar-common.js":
/*!**************************************!*\
  !*** ./assets/js/calendar-common.js ***!
  \**************************************/
/*! exports provided: initializeCalendar, setCalendarButtonsEvents, updateCellFromToDo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initializeCalendar\", function() { return initializeCalendar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCalendarButtonsEvents\", function() { return setCalendarButtonsEvents; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateCellFromToDo\", function() { return updateCellFromToDo; });\n/* harmony import */ var _date_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date-helper.js */ \"./assets/js/date-helper.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./assets/js/constants.js\");\n/* harmony import */ var _calendar_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-render.js */ \"./assets/js/calendar-render.js\");\n/* harmony import */ var _dbProcesses_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dbProcesses.js */ \"./assets/js/dbProcesses.js\");\n/* globals $ */\n\n\n\n\nvar clicked;\n\nvar initializeCalendar = function initializeCalendar(id) {\n  var today = new Date();\n  _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setTodaysMonthYear\"](today);\n  _calendar_render_js__WEBPACK_IMPORTED_MODULE_2__[\"drawCalendarGrid\"](id, viewDayInfo);\n  _calendar_render_js__WEBPACK_IMPORTED_MODULE_2__[\"setMarginOfFirstDay\"](today);\n  fillDataToCalendar();\n};\n\nvar setCalendarButtonsEvents = function setCalendarButtonsEvents() {\n  $('#prev').click(function () {\n    displayNewMonth(-1);\n  });\n  $('#next').click(function () {\n    displayNewMonth(1);\n  });\n};\n\nvar displayNewMonth = function displayNewMonth(dir) {\n  var updateCurrentMY = function updateCurrentMY() {\n    var y = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentYear\"];\n    var m = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"];\n    _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setCurrentMonth\"](m + dir);\n    m = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"];\n\n    if (_date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"] < 0) {\n      _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setCurrentYear\"](y - 1);\n      _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setCurrentMonth\"](11);\n    } else {\n      _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setCurrentYear\"](y + Math.floor(m / 12));\n      _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setCurrentMonth\"](m % 12);\n    }\n  };\n\n  updateCurrentMY(dir);\n  fillDataToCalendar();\n  _calendar_render_js__WEBPACK_IMPORTED_MODULE_2__[\"setMarginOfFirstDay\"](new Date(_date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentYear\"], _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"], 1));\n};\n\nvar viewDayInfo = function viewDayInfo(event) {\n  clicked = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentYear\"] + '-' + (_date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"] + 1) + '-' + event.delegateTarget.id.slice(1); //  console.log('show TODO data for '+clicked);\n\n  $(_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"constants\"].CALENDAR_CONTAINER_ID).trigger('opentodo', clicked);\n};\n\nvar fillDataToCalendar = function fillDataToCalendar() {\n  var y = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentYear\"];\n  var m = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"];\n  var allDaysInMonth = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"getDaysInMonth\"](_date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"], _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentYear\"]);\n\n  for (var count = 0; count < allDaysInMonth; count++) {\n    insertDayInfoInCell(y, m + 1, count + 1);\n  }\n\n  _calendar_render_js__WEBPACK_IMPORTED_MODULE_2__[\"hideUnusedCells\"](allDaysInMonth);\n};\n\nvar insertDayInfoInCell = function insertDayInfoInCell(y, m, d) {\n  var date = y + '-' + m + '-' + d;\n  var tasksForDay = _dbProcesses_js__WEBPACK_IMPORTED_MODULE_3__[\"DatabaseProcesses\"].getNumberOfTasks(date);\n  fillInfoToCell(d, tasksForDay);\n};\n\nvar updateCellFromToDo = function updateCellFromToDo() {\n  var updatedDay = clicked.split('-')[2]; // date format yyyy-m-d\n\n  var tasksForDay = _dbProcesses_js__WEBPACK_IMPORTED_MODULE_3__[\"DatabaseProcesses\"].getNumberOfTasks(clicked);\n  fillInfoToCell(updatedDay, tasksForDay);\n};\n\nvar fillInfoToCell = function fillInfoToCell(updatedDay, tasksForDay) {\n  $(\"#d\".concat(updatedDay)).html(updatedDay);\n\n  if (tasksForDay !== 0) {\n    var tasksHTML = \"<div><button type=\\\"button\\\" \\n        class=\\\"btn btn-info btn-primary btn-sm\\\">\\n        <span class=\\\"hidden-xs\\\">Tasks: </span><span \\n        class=\\\"badge badge-light visible-xs-block\\\">\".concat(tasksForDay, \"</span>\\n        </button></div>\");\n    $(\"#d\".concat(updatedDay)).append($(tasksHTML));\n    $(\"#c\".concat(updatedDay)).addClass('cell-with-tasks');\n  } else {\n    $(\"#c\".concat(updatedDay)).removeClass('cell-with-tasks');\n  }\n};\n\n\n\n//# sourceURL=webpack:///./assets/js/calendar-common.js?");

/***/ }),

/***/ "./assets/js/calendar-render.js":
/*!**************************************!*\
  !*** ./assets/js/calendar-render.js ***!
  \**************************************/
/*! exports provided: drawCalendarGrid, setMarginOfFirstDay, hideUnusedCells */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawCalendarGrid\", function() { return drawCalendarGrid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setMarginOfFirstDay\", function() { return setMarginOfFirstDay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideUnusedCells\", function() { return hideUnusedCells; });\n/* harmony import */ var _date_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date-helper.js */ \"./assets/js/date-helper.js\");\n/* globals $ */\n\n\nvar drawCalendarGrid = function drawCalendarGrid(id, eventHandler) {\n  var calendarContainer = $(id);\n\n  for (var count = 0; count < 31; count++) {\n    var element = $(\"<div class=\\\"cell\\\" id=\\\"c\".concat(count + 1, \"\\\"></div>\"));\n    var insideElement = $(\"<div class=\\\"cell-content\\\" id=\\\"d\".concat(count + 1, \"\\\">\\n                                    \").concat(count + 1, \"</div>\"));\n    element.append(insideElement);\n    insideElement.click(eventHandler);\n    calendarContainer.append(element);\n  }\n};\n\nvar setMarginOfFirstDay = function setMarginOfFirstDay(date) {\n  var dayOfWeekOf1st = _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"getThe1stOfMonth\"](date);\n  _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"setCurrentMonth\"](date.getMonth());\n  if (dayOfWeekOf1st === 0) dayOfWeekOf1st = 7;\n  $('.cell:first-child').attr('class', \"cell margin-\".concat(dayOfWeekOf1st - 1, \"-cell\"));\n  $('#month-name').text(_date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"getMonthName\"](_date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentMonth\"]) + ' ' + _date_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"currentYear\"]);\n};\n\nvar hideUnusedCells = function hideUnusedCells(days) {\n  if (days > 28) {\n    $('#c29').show();\n  } else {\n    $('#c29').hide();\n  }\n\n  if (days > 29) {\n    $('#c30').show();\n  } else {\n    $('#c30').hide();\n  }\n\n  if (days > 30) {\n    $('#c31').show();\n  } else {\n    $('#c31').hide();\n  }\n};\n\n\n\n//# sourceURL=webpack:///./assets/js/calendar-render.js?");

/***/ }),

/***/ "./assets/js/clock.js":
/*!****************************!*\
  !*** ./assets/js/clock.js ***!
  \****************************/
/*! exports provided: startTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startTime\", function() { return startTime; });\nvar startTime = function startTime() {\n  var checkTime = function checkTime(i) {\n    if (i < 10) {\n      i = '0' + i;\n    }\n\n    return i;\n  };\n\n  var today = new Date();\n  var h = today.getHours();\n  var m = today.getMinutes();\n  var s = today.getSeconds();\n  m = checkTime(m);\n  s = checkTime(s);\n  document.getElementById('txt').innerHTML = h + ':' + m + ':' + s;\n  setTimeout(startTime, 1000);\n};\n\n\n\n//# sourceURL=webpack:///./assets/js/clock.js?");

/***/ }),

/***/ "./assets/js/constants.js":
/*!********************************!*\
  !*** ./assets/js/constants.js ***!
  \********************************/
/*! exports provided: constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"constants\", function() { return constants; });\nvar constants = {\n  CELL_PERCENTAGE_WIDTH: 13,\n  CALENDAR_CONTAINER_ID: '#cal-container',\n  CALENDAR_MAIN_CONTAINER: '#main-calendar-container',\n  TODO_CONTAINER: '#todo-container',\n  ENTER_BUTTON_EVENT_CODE: 13\n};\n\n\n//# sourceURL=webpack:///./assets/js/constants.js?");

/***/ }),

/***/ "./assets/js/databse.js":
/*!******************************!*\
  !*** ./assets/js/databse.js ***!
  \******************************/
/*! exports provided: toDosDataInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toDosDataInfo\", function() { return toDosDataInfo; });\nvar toDosDataInfo = [{\n  key: '2018-10-10',\n  toDo: [{\n    value: 'buy tobacco',\n    important: false\n  }, {\n    value: 'make shisha',\n    important: true\n  }, {\n    value: 'chill',\n    important: false\n  }]\n}, {\n  key: '2018-10-13',\n  toDo: [{\n    value: 'team meet at the Academy',\n    important: false\n  }, {\n    value: 'Stef upload latest changes',\n    important: false\n  }, {\n    value: 'Kids Academy happening',\n    important: false\n  }]\n}, {\n  key: '2018-10-1',\n  toDo: [{\n    value: 'buy tobacco',\n    important: false\n  }, {\n    value: 'make shisha',\n    important: false\n  }, {\n    value: 'chill',\n    important: false\n  }, {\n    value: 'chill out',\n    important: false\n  }, {\n    value: 'burn out',\n    important: false\n  }]\n}, {\n  key: '2018-11-25',\n  toDo: [{\n    value: 'Subscribe for the Uni Year',\n    important: false\n  }, {\n    value: 'Ask for individual protocol',\n    important: false\n  }]\n}, {\n  key: '2018-10-25',\n  toDo: [{\n    value: '25. buy tobacco',\n    important: false\n  }, {\n    value: 'make shisha',\n    important: true\n  }, {\n    value: 'chill',\n    important: false\n  }, {\n    value: 'JS Advanced Team Work',\n    important: true\n  }, {\n    value: 'chill out',\n    important: false\n  }, {\n    value: 'burn out',\n    important: false\n  }, {\n    value: 'lorem aspum',\n    important: false\n  }, {\n    value: 'lorelli',\n    important: false\n  }, {\n    value: 'Tula Baby Carrier buy Toddler size',\n    important: true\n  }, {\n    value: 'Integra size 2',\n    important: false\n  }]\n}];\n\n\n//# sourceURL=webpack:///./assets/js/databse.js?");

/***/ }),

/***/ "./assets/js/date-helper.js":
/*!**********************************!*\
  !*** ./assets/js/date-helper.js ***!
  \**********************************/
/*! exports provided: currentMonth, currentYear, getDaysInMonth, getThe1stOfMonth, setTodaysMonthYear, setCurrentMonth, setCurrentYear, getMonthName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentMonth\", function() { return currentMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentYear\", function() { return currentYear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDaysInMonth\", function() { return getDaysInMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getThe1stOfMonth\", function() { return getThe1stOfMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTodaysMonthYear\", function() { return setTodaysMonthYear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCurrentMonth\", function() { return setCurrentMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCurrentYear\", function() { return setCurrentYear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMonthName\", function() { return getMonthName; });\nvar monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\nvar currentMonth;\nvar currentYear;\nvar daysInMonth = [];\n\nvar getDaysInMonth = function getDaysInMonth(m, y) {\n  if (daysInMonth[m] & m !== 1) {\n    return daysInMonth[m];\n  }\n\n  m = m + 1;\n  var allDays = m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);\n  daysInMonth[m - 1] = allDays;\n  return allDays;\n};\n\nvar getThe1stOfMonth = function getThe1stOfMonth(date) {\n  setTodaysMonthYear(date);\n  var firstDay = new Date(currentYear, currentMonth, 1);\n  return firstDay.getDay();\n};\n\nvar setTodaysMonthYear = function setTodaysMonthYear(date) {\n  currentMonth = date.getMonth();\n  currentYear = date.getFullYear();\n};\n\nvar setCurrentMonth = function setCurrentMonth(m) {\n  currentMonth = m;\n};\n\nvar setCurrentYear = function setCurrentYear(y) {\n  currentYear = y;\n};\n\nvar getMonthName = function getMonthName(m) {\n  return monthNames[m];\n};\n\n\n\n//# sourceURL=webpack:///./assets/js/date-helper.js?");

/***/ }),

/***/ "./assets/js/dbProcesses.js":
/*!**********************************!*\
  !*** ./assets/js/dbProcesses.js ***!
  \**********************************/
/*! exports provided: toDoElement, DatabaseProcesses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toDoElement\", function() { return toDoElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DatabaseProcesses\", function() { return DatabaseProcesses; });\n/* harmony import */ var _databse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./databse.js */ \"./assets/js/databse.js\");\n\nvar toDoElement;\nvar DatabaseProcesses = {\n  searchForDate: function searchForDate(stringId) {\n    toDoElement = _databse_js__WEBPACK_IMPORTED_MODULE_0__[\"toDosDataInfo\"].filter(function (x) {\n      return x.key === stringId;\n    })[0];\n\n    if (toDoElement === undefined) {\n      toDoElement = {\n        key: stringId,\n        toDo: []\n      };\n      _databse_js__WEBPACK_IMPORTED_MODULE_0__[\"toDosDataInfo\"].push(toDoElement);\n    }\n\n    return toDoElement;\n  },\n  pushToDate: function pushToDate(str) {\n    toDoElement.toDo.push({\n      value: str.trim(),\n      important: false\n    });\n  },\n  editToDo: function editToDo(indexOfTask, str) {\n    toDoElement.toDo[indexOfTask].value = str.trim();\n  },\n  deleteToDo: function deleteToDo(indexOfTask) {\n    toDoElement.toDo.splice([indexOfTask], 1);\n  },\n  editImportance: function editImportance(indexOfTask) {\n    toDoElement.toDo[indexOfTask].important = !toDoElement.toDo[indexOfTask].important;\n  },\n  getNumberOfTasks: function getNumberOfTasks(stringId) {\n    var date = this.searchForDate(stringId);\n    return date.toDo.length;\n  }\n};\n\n\n//# sourceURL=webpack:///./assets/js/dbProcesses.js?");

/***/ }),

/***/ "./assets/js/eventHandler.js":
/*!***********************************!*\
  !*** ./assets/js/eventHandler.js ***!
  \***********************************/
/*! exports provided: connectionsEventHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"connectionsEventHandler\", function() { return connectionsEventHandler; });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./assets/js/constants.js\");\n/* harmony import */ var _calendar_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-common.js */ \"./assets/js/calendar-common.js\");\n/* harmony import */ var _dbProcesses_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dbProcesses.js */ \"./assets/js/dbProcesses.js\");\n/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todos.js */ \"./assets/js/todos.js\");\n/* globals $ */\n\n\n\n\nvar connectionsEventHandler = {\n  openToDoHandler: function openToDoHandler() {\n    $(_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"].CALENDAR_CONTAINER_ID).on('opentodo', function (e, dateString) {\n      $(_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"].CALENDAR_MAIN_CONTAINER).hide();\n      $(_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"].TODO_CONTAINER).show();\n      Object(_todos_js__WEBPACK_IMPORTED_MODULE_3__[\"todoDataVisualization\"])(_dbProcesses_js__WEBPACK_IMPORTED_MODULE_2__[\"DatabaseProcesses\"].searchForDate(dateString));\n    });\n  },\n  openCalendarHandler: function openCalendarHandler() {\n    $(_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"].TODO_CONTAINER).on('todoclosed', function () {\n      $(_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"].CALENDAR_MAIN_CONTAINER).show();\n      $(_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"].TODO_CONTAINER).hide();\n      Object(_calendar_common_js__WEBPACK_IMPORTED_MODULE_1__[\"updateCellFromToDo\"])();\n    });\n  }\n};\n\n\n//# sourceURL=webpack:///./assets/js/eventHandler.js?");

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbProcesses.js */ \"./assets/js/dbProcesses.js\");\n/* harmony import */ var _eventHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventHandler.js */ \"./assets/js/eventHandler.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./assets/js/constants.js\");\n/* harmony import */ var _calendar_common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calendar-common.js */ \"./assets/js/calendar-common.js\");\n/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todos.js */ \"./assets/js/todos.js\");\n/* harmony import */ var _clock_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clock.js */ \"./assets/js/clock.js\");\n/* global $ */\n\n\n\n\n\n\n$(document).ready(function () {\n  _calendar_common_js__WEBPACK_IMPORTED_MODULE_3__[\"initializeCalendar\"](_constants_js__WEBPACK_IMPORTED_MODULE_2__[\"constants\"].CALENDAR_CONTAINER_ID);\n  _calendar_common_js__WEBPACK_IMPORTED_MODULE_3__[\"setCalendarButtonsEvents\"]();\n  Object(_todos_js__WEBPACK_IMPORTED_MODULE_4__[\"setToDoEvents\"])();\n  _eventHandler_js__WEBPACK_IMPORTED_MODULE_1__[\"connectionsEventHandler\"].openToDoHandler();\n  _eventHandler_js__WEBPACK_IMPORTED_MODULE_1__[\"connectionsEventHandler\"].openCalendarHandler();\n  Object(_clock_js__WEBPACK_IMPORTED_MODULE_5__[\"startTime\"])();\n});\n\n//# sourceURL=webpack:///./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/todos.js":
/*!****************************!*\
  !*** ./assets/js/todos.js ***!
  \****************************/
/*! exports provided: todoDataVisualization, setToDoEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoDataVisualization\", function() { return todoDataVisualization; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setToDoEvents\", function() { return setToDoEvents; });\n/* harmony import */ var _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbProcesses.js */ \"./assets/js/dbProcesses.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./assets/js/constants.js\");\n/* global $ */\n\n\n\nvar getTaskHTMLCode = function getTaskHTMLCode(textToAdd, importancyFlag) {\n  var important = importancyFlag ? 'important' : '';\n  return '<li><span class=\\'trash\\'><i class=\\'fa fa-trash\\'></i></span>' + textToAdd + \"<span class='star \".concat(important, \">\") + \"<i class='fa fa-star'></i></span></li>\";\n};\n\nvar findClickedElementIndex = function findClickedElementIndex(textToFind) {\n  var ClickedElementIndex = 0;\n  _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"toDoElement\"].toDo.filter(function (element, i) {\n    if (element.value === textToFind.trim()) {\n      ClickedElementIndex = i;\n    }\n  });\n  return ClickedElementIndex;\n};\n\nvar todoDataVisualization = function todoDataVisualization(todoObj) {\n  if (todoObj.toDo.length !== 0) {\n    for (var i = 0; i < todoObj.toDo.length; i++) {\n      var isImportant = todoObj.toDo[i].important;\n      $('#toDos').append(getTaskHTMLCode(todoObj.toDo[i].value, isImportant));\n    }\n  }\n};\n\nvar editToDoHandler = function editToDoHandler(event) {\n  var newToDoTaskText = $(event.target).text();\n  var input = \"<input maxlength=\\\"35\\\" class='addToDo' id='editInput'\\n\\t\\t\\t\\ttype='text' value='\".concat(newToDoTaskText, \"' \\n\\t\\t\\t\\toldvalue='\").concat(newToDoTaskText.trim(), \"'>\");\n  $(event.target).replaceWith(input);\n  $('#editInput').focus();\n  $('#editInput').blur(function () {\n    var index = findClickedElementIndex(newToDoTaskText);\n    $('#editInput').replaceWith(getTaskHTMLCode(newToDoTaskText, _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"toDoElement\"].toDo[index].important));\n  });\n};\n\nvar endOfEditHandler = function endOfEditHandler(event) {\n  if (event.which === _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"constants\"].ENTER_BUTTON_EVENT_CODE) {\n    var toDoNewText = $(event.target).val();\n    var taskOldValue = $(event.target).attr('oldvalue');\n    var index = findClickedElementIndex(taskOldValue);\n    _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"DatabaseProcesses\"].editToDo(index, toDoNewText);\n    $(event.target).val('');\n    $(event.target).replaceWith(getTaskHTMLCode(toDoNewText, _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"toDoElement\"].toDo[index].important));\n  }\n};\n\nvar deleteToDoTaskHandler = function deleteToDoTaskHandler(event) {\n  var toDoToDelete = $(event.target).closest('li');\n  var toDoToDeleteContent = toDoToDelete.text();\n  var index = findClickedElementIndex(toDoToDeleteContent);\n  _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"DatabaseProcesses\"].deleteToDo(index);\n  toDoToDelete.fadeOut(500, function () {\n    $(this).remove();\n  });\n  event.stopPropagation();\n};\n\nvar addNewToDoHandler = function addNewToDoHandler(event) {\n  if (event.which === _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"constants\"].ENTER_BUTTON_EVENT_CODE) {\n    var todoText = $(event.target).val();\n    $(event.target).val('');\n    $('ul').append(getTaskHTMLCode(todoText, false));\n    _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"DatabaseProcesses\"].pushToDate(todoText);\n  }\n};\n\nvar toggleInputHandler = function toggleInputHandler() {\n  $('input.addToDo').fadeToggle(300, function () {\n    $(this).toggleClass('.hide');\n  });\n};\n\nvar toggleImportancyHandler = function toggleImportancyHandler(event) {\n  var importancyStarText = $(event.target).closest('li').text();\n  var index = findClickedElementIndex(importancyStarText);\n  _dbProcesses_js__WEBPACK_IMPORTED_MODULE_0__[\"DatabaseProcesses\"].editImportance(index);\n  $(event.target).closest('span').toggleClass('important');\n  event.stopPropagation();\n};\n\nvar toggleCalendar = function toggleCalendar() {\n  $('ul').empty();\n  $(_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"constants\"].TODO_CONTAINER).trigger('todoclosed');\n};\n\nvar setToDoEvents = function setToDoEvents() {\n  $('ul').on('click', 'li', editToDoHandler);\n  $('ul').on('keypress', 'input', endOfEditHandler);\n  $('ul').on('click', 'span.trash', deleteToDoTaskHandler);\n  $('input.addToDo').keypress(addNewToDoHandler);\n  $('#toggle-form').on('click', toggleInputHandler);\n  $('ul').on('click', '.svg-inline--fa.fa-star', toggleImportancyHandler);\n  $('#back-to-calendar').on('click', toggleCalendar);\n};\n\n\n\n//# sourceURL=webpack:///./assets/js/todos.js?");

/***/ })

/******/ });