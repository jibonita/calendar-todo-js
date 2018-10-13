/* globals $ */
import { constants } from './constants.js';
import { updateCellFromToDo } from './calendar-common.js';
const connectionsEventHandler = {
    openToDoHandler: function() {
        $(constants.CALENDAR_CONTAINER_ID).on('opentodo', '#', () =>{
            $(constants.CALENDAR_MAIN_CONTAINER).hide();
            $(constants.TODO_CONTAINER).show();
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
