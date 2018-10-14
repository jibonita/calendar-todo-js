/* globals $ */
import * as dateHelper from './date-helper.js';
import { constants } from './constants.js';
import { toDoElement, DatabaseProcesses } from './dbProcesses.js';

let calendarContainer;
let clicked;

const initializeCalendar = function (id) {
    const today = new Date();
    dateHelper.setTodaysMonthYear(today);

    calendarContainer = $(id);
    for (let count = 0; count < 31; count++) {
        const element = $(`<div class="cell" ></div>`);
        element
            .append(`<div class="cell-content" id="d${count + 1}">${count + 1}</div>`);
        element.click(viewDayInfo);
        calendarContainer.append(element);
    }

    fillDataToCalendar();

    setMarginOfFirstDay(today);

    // $(calendarContainer,'dataUpdate');
};

const setCalendarButtonsEvents = () => {
    $('#prev').click(() => {
        displayNewMonth(-1);
    });
    $('#next').click(() => {
        displayNewMonth(1);
    });
    $('#triggerclose').click(() => {
        $(constants.CALENDAR_CONTAINER_ID).trigger('todoclosed');
    });

    $(constants.CALENDAR_CONTAINER_ID).on('todoclosed', () => {
        updateCellFromToDo(clicked);
    });
};

const setMarginOfFirstDay = (date) => {
    let dayOfWeekOf1st = dateHelper.getThe1stOfMonth(date);
    dateHelper.setCurrentMonth(date.getMonth());
    if (dayOfWeekOf1st === 0) dayOfWeekOf1st = 7;

    $('.cell:first-child')
        .css('margin-left', (dayOfWeekOf1st - 1) * constants.CELL_PERCENTAGE_WIDTH + '%');
    $('#month-name')
        .text(dateHelper
            .getMonthName(dateHelper.currentMonth) + ' ' + dateHelper.currentYear);
};

const displayNewMonth = (dir) => {
    const updateCurrentMY = () => {
        const y = dateHelper.currentYear;
        let m = dateHelper.currentMonth;

        dateHelper.setCurrentMonth(m + dir);
        m = dateHelper.currentMonth;

        if (dateHelper.currentMonth < 0) {
            dateHelper.setCurrentYear(y - 1);
            dateHelper.setCurrentMonth(11);
        } else {
            dateHelper.setCurrentYear(y + Math.floor(m / 12));
            dateHelper.setCurrentMonth(m % 12);
        }
    };
    updateCurrentMY(dir);
    fillDataToCalendar();
    setMarginOfFirstDay(new Date(dateHelper
        .currentYear, dateHelper.currentMonth, 1));
};
const viewDayInfo = function (event) {

    clicked = dateHelper
        .currentYear + '-' + (dateHelper.currentMonth + 1) + '-' + event.target.id.slice(1);
    // console.log('show TODO data for '+clicked);
    $(constants.CALENDAR_CONTAINER_ID).trigger('opentodo', clicked);
};

const fillDataToCalendar = () => {
    const y = dateHelper.currentYear;
    const m = dateHelper.currentMonth;
    const allDaysInMonth = dateHelper.getDaysInMonth(dateHelper
        .currentMonth, dateHelper.currentYear);
    for (let count = 0; count < allDaysInMonth; count++) {
        const data = insertDayInfoInCell(y, m, count + 1);
        // TODO: info from DB here
        const cID = `#d${count + 1}`;
        $(cID).text(data);
    }
    hideUnusedCells(allDaysInMonth);
};

const insertDayInfoInCell = (y, m, d) => {
    return d;
};

const hideUnusedCells = (days) => {
    if (days > 28) {
        $('#d29').show();
    } else {
        $('#d29').hide();
    }
    if (days > 29) {
        $('#d30').show();
    } else {
        $('#d30').hide();
    }
    if (days > 30) {
        $('#d31').show();
    } else {
        $('#d31').hide();
    }
};

const updateCellFromToDo = () => {
    console.log('updated');
    const tasksForDay = DatabaseProcesses.getNumberOfTasks();
    const updatedDay = clicked.split('-')[2]; // date format yyyy-m-d

    $(`#d${updatedDay}`).html(updatedDay);
    if (tasksForDay !== 0) {
        $(`#d${updatedDay}`)
        .append($(`<div class="tasks-per-day">Tasks: ${tasksForDay}</div>`));
    }
};

export {
    initializeCalendar,
    setCalendarButtonsEvents,
    updateCellFromToDo,
};
