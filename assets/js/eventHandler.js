import { constants } from './constants.js';
const eH = {
    openToDoHandler: function() {
        $(document).on('opentodo', () =>{
            $(constants.CALENDAR_MAIN_CONTAINER).hide();
            $(constants.TODO_CONTAINER).show();
            //todo fill data
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
export { eH };
