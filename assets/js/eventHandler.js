/* globals $ */
import { constants } from './constants.js';
import { updateCellFromToDo } from './calendar-common.js';
import { DatabaseProcesses } from './dbProcesses.js';
import { todoDataVisualization } from './todos.js';

const connectionsEventHandler = {
    openToDoHandler: function() {
        $(constants.CALENDAR_CONTAINER_ID).on('opentodo', (e, dateString) =>{
            $(constants.CALENDAR_MAIN_CONTAINER).hide();
            $(constants.TODO_CONTAINER).show();
            todoDataVisualization(DatabaseProcesses.searchForDate(dateString));
            }
        );
    },
    openCalendarHandler: function() {
        $('body').on('todoclosed', () =>{
            updateCellFromToDo();
            $(constants.TODO_CONTAINER).hide();
            $(constants.CALENDAR_MAIN_CONTAINER).show();
            }
        );
    },
};
export { connectionsEventHandler };
