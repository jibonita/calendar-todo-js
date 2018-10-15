/* globals $ */
import * as dateHelper from './date-helper.js';
import { constants } from './constants.js';
import * as calendarRender from './calendar-render.js';
import { DatabaseProcesses } from './dbProcesses.js';

let clicked;

const initializeCalendar = (id) => {
    const today = new Date();
    dateHelper.setTodaysMonthYear(today);

    calendarRender.drawCalendarGrid(id, viewDayInfo);
    calendarRender.setMarginOfFirstDay(today);

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
    calendarRender.setMarginOfFirstDay(new Date(dateHelper
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
    calendarRender.hideUnusedCells(allDaysInMonth);
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

const fillInfoToCell = (updatedDay, tasksForDay)=> {
    $(`#d${updatedDay}`).html(updatedDay);
    if (tasksForDay !== 0) {
        const tasksHTML = `<div><button type="button" 
        class="btn btn-info btn-primary btn-sm">
        <span class="hidden-xs">Tasks: </span><span 
        class="badge badge-light visible-xs-block">${tasksForDay}</span>
        </button></div>`;
        $(`#d${updatedDay}`).append($(tasksHTML));

        $(`#c${updatedDay}`).addClass('cell-with-tasks');
    } else {
        $(`#c${updatedDay}`).removeClass('cell-with-tasks');
    }
};

export {
    initializeCalendar,
    setCalendarButtonsEvents,
    updateCellFromToDo,
};
