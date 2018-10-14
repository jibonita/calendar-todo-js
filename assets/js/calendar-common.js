/* globals $ */
import * as dateHelper from './date-helper.js';
import { constants } from './constants.js';
import { DatabaseProcesses } from './dbProcesses.js';
// import { calendarRender } from 'calendar-render.js';

let clicked;

const initializeCalendar = (id) => {
    const today = new Date();
    dateHelper.setTodaysMonthYear(today);

    // calendarRender.drawCalendarGrid(id, viewDayInfo);
    let calendarContainer = $(id);
    for (let count = 0; count < 31; count++) {
        const element = $(`<div class="cell" id="c${count + 1}"></div>`);
        const insideElement = $(`<div class="cell-content" id="d${count + 1}">
                                ${count + 1}</div>`);
        element.append(insideElement);
        insideElement.click(viewDayInfo);
        calendarContainer.append(element);
    }
    setMarginOfFirstDay(today);

    fillDataToCalendar();
};

const setCalendarButtonsEvents = () => {
    $('#prev').click(() => {
        displayNewMonth(-1);
    });
    $('#next').click(() => {
        displayNewMonth(1);
    });
};

const setMarginOfFirstDay = (date) => {
    let dayOfWeekOf1st = dateHelper.getThe1stOfMonth(date);
    dateHelper.setCurrentMonth(date.getMonth());
    if (dayOfWeekOf1st === 0) dayOfWeekOf1st = 7;

    $('.cell:first-child')
        .attr('class', `cell margin-${(dayOfWeekOf1st - 1)}-cell`);
    $('#month-name')
        .text(dateHelper.getMonthName(dateHelper.currentMonth) + ' '
            + dateHelper.currentYear);
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
const viewDayInfo = (event) => {
    clicked = dateHelper.currentYear + '-'
        + (dateHelper.currentMonth + 1) +'-'
        + event.delegateTarget.id.slice(1);
    //  console.log('show TODO data for '+clicked);
    $(constants.CALENDAR_CONTAINER_ID).trigger('opentodo', clicked);
};

const fillDataToCalendar = () => {
    const y = dateHelper.currentYear;
    const m = dateHelper.currentMonth;
    const allDaysInMonth = dateHelper.getDaysInMonth(dateHelper
        .currentMonth, dateHelper.currentYear);
    for (let count = 0; count < allDaysInMonth; count++) {
        insertDayInfoInCell(y, m + 1, count + 1);
    }
    hideUnusedCells(allDaysInMonth);
};

const insertDayInfoInCell = (y, m, d) => {
    const date = y+'-'+m+'-'+d;
    const tasksForDay = DatabaseProcesses.getNumberOfTasks(date);
    fillInfoToCell(d, tasksForDay);
};

const updateCellFromToDo = () => {
    const updatedDay = clicked.split('-')[2]; // date format yyyy-m-d
    const tasksForDay = DatabaseProcesses.getNumberOfTasks(clicked);
    fillInfoToCell(updatedDay, tasksForDay);
};

const hideUnusedCells = (days) => {
    if (days > 28) {
        $('#c29').show();
    } else {
        $('#c29').hide();
    }
    if (days > 29) {
        $('#c30').show();
    } else {
        $('#c30').hide();
    }
    if (days > 30) {
        $('#c31').show();
    } else {
        $('#c31').hide();
    }
};

const fillInfoToCell = (updatedDay, tasksForDay)=> {
    $(`#d${updatedDay}`).html(updatedDay);
    if (tasksForDay !== 0) {
        const tasksHTML = `<div><button type="button" class="btn btn-info btn-primary btn-sm">
        <span class="hidden-xs">Tasks: </span><span class="badge badge-light visible-xs-block">${tasksForDay}</span>
        </button></div>`;
        $(`#d${updatedDay}`).append($(tasksHTML));
    }
};

export {
    initializeCalendar,
    setCalendarButtonsEvents,
    updateCellFromToDo,
};
