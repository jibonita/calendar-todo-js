import { gP } from './dbProcesses.js';
import { eH } from './eventHandler.js';
import { constants } from './constants.js';
import * as calendar from './calendar-common.js';

$( document ).ready(function() {
    calendar.initializeCalendar(constants.CALENDAR_CONTAINER_ID);
    calendar.setCalendarButtonsEvents();
    eH.openToDoHandler();
});

