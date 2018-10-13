/* globals $ */
import { constants } from './constants.js';
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
            $(constants.CALENDAR_MAIN_CONTAINER).show();
            $(constants.TODO_CONTAINER).hide();
            //
            }
        );
    },
};
export { connectionsEventHandler };
