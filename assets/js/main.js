/* global $ */
import { DatabaseProcesses } from './dbProcesses.js';
import { connectionsEventHandler } from './eventHandler.js';
import { constants } from './constants.js';
import * as calendar from './calendar-common.js';

$( document ).ready(function() {
    calendar.initializeCalendar(constants.CALENDAR_CONTAINER_ID);
    calendar.setCalendarButtonsEvents();
    connectionsEventHandler.openToDoHandler();
});
