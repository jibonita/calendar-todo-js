/* global $ */
import { DatabaseProcesses } from './dbProcesses.js';
import { connectionsEventHandler } from './eventHandler.js';
import { constants } from './constants.js';
import * as calendar from './calendar-common.js';
import { setToDoEvents } from './todos.js';
import { startTime } from './clock.js';

$( document ).ready(function() {
    calendar.initializeCalendar(constants.CALENDAR_CONTAINER_ID);
    calendar.setCalendarButtonsEvents();
    setToDoEvents();
    connectionsEventHandler.openToDoHandler();
    connectionsEventHandler.openCalendarHandler();
    startTime();
});
