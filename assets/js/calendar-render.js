/* globals $ */
import * as dateHelper from './date-helper.js';

const drawCalendarGrid = (id, eventHandler) => {
    const calendarContainer = $(id);
    for (let count = 0; count < 31; count++) {
        const element = $(`<div class="cell" id="c${count + 1}"></div>`);
        const insideElement = $(`<div class="cell-content" id="d${count + 1}">
                                    ${count + 1}</div>`);
        element.append(insideElement);
        insideElement.click(eventHandler);
        calendarContainer.append(element);
    }
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

export {
    drawCalendarGrid,
    setMarginOfFirstDay,
};
