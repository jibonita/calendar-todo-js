import * as dateHelper from './date-helper.js';
import * as constants from './constants.js';



let calendarContainer;
let clicked;

$( document ).ready(function(){
    initializeCalendar(constants.CALENDAR_CONTAINER_ID);
    setCalendarButtonsEvents();
});

const setCalendarButtonsEvents = () => {
    $('#prev').click(() => {
        displayNewMonth(-1)
    });
    $('#next').click(() => {
        displayNewMonth(1)
    });
    $('#triggerclose').click(() => {
        $(constants.CALENDAR_CONTAINER_ID).trigger('todoclosed');
    });

    $(constants.CALENDAR_CONTAINER_ID).on('todoclosed', ()=>{
        updateCellFromToDo(clicked);
    })
};


const initializeCalendar = function(id){
    let today = new Date(2019, 1 , 1, 0,0,0,0);
    dateHelper.setTodaysMonthYear(today);
   
    calendarContainer = $(id);
    for (let count = 0; count < 31; count++) {
        const element = $('<div class="cell"></div>');
        element.append(`<div class="cell-content" id="d${count+1}">${count+1}</div>`);
        //const element = $(`<div class="cell"  id="d${count+1}">${count+1}</div>`);
        //element.append(`<div class="cell-content" id="d${count+1}">${count+1}</div>`);
        element.click(viewDayInfo);
        calendarContainer.append(element);
    }

    fillDataToCalendar();

    setMarginOfFirstDay(today);
    
   // $(calendarContainer,'dataUpdate');
};


const setMarginOfFirstDay = (date) => {    
    let dayOfWeekOf1st = dateHelper.getThe1stOfMonth(date) ;
    //dateHelper.currentMonth = date.getMonth();
    dateHelper.setCurrentMonth(date.getMonth());
    if(dayOfWeekOf1st === 0) dayOfWeekOf1st = 7;
    
    $('.cell:first-child').css('margin-left', (dayOfWeekOf1st-1)*constants.CELL_PERCENTAGE_WIDTH+'%');
    $('#month-name').text(dateHelper.getMonthName(dateHelper.currentMonth));
};

const displayNewMonth = (dir)=>{
    const updateCurrentMY = (dir)=> {
        //You can introduce func variable curM and curY here
        //dateHelper.currentMonth += dir;
        dateHelper.setCurrentMonth(dateHelper.currentMonth + dir);
        if(dateHelper.currentMonth<0) {
            // dateHelper.currentYear--;
            // dateHelper.currentMonth = 11;
            dateHelper.setCurrentYear(dateHelper.currentYear-1);
            dateHelper.setCurrentMonth(11);
        }
        else{
            // dateHelper.currentYear += Math.floor(dateHelper.currentMonth / 12);
            // dateHelper.currentMonth = dateHelper.currentMonth % 12;
            dateHelper.setCurrentYear(dateHelper.currentYear + Math.floor(dateHelper.currentMonth / 12));
            dateHelper.setCurrentMonth(dateHelper.currentMonth % 12);
        }
    };
    
    updateCurrentMY(dir);    
    fillDataToCalendar();
    setMarginOfFirstDay(new Date(dateHelper.currentYear, dateHelper.currentMonth, 1));   

};
const viewDayInfo = function(event) {
    let clicked = dateHelper.currentYear+'-'+dateHelper.currentMonth+'-'+event.target.id;
    console.log('show TODO data for '+clicked)
};

const fillDataToCalendar = () => {
    let y = dateHelper.currentYear;
    let m = dateHelper.currentMonth;
    let allDaysInMonth = dateHelper.getDaysInMonth(dateHelper.currentMonth, dateHelper.currentYear);
    for (let count = 0; count < allDaysInMonth; count++) {
        let data = insertDayInfoInCell(y, m, count+1);
        let cID = `#d${count+1}`;
        $(cID).text(data);
    }
    hideUnusedCells(allDaysInMonth);
};

const insertDayInfoInCell = (y,m,d) => {
    return d;
    return y+' '+constants.getMonthName(m) + ' '+d;
    
};

const hideUnusedCells = (days) => {
   if(days>28){
        $('#d29').show();
    }
    else{
        $('#d29').hide();
    }
    if(days>29){
            $('#d30').show();
    }
    else{
        $('#d30').hide();
        
    }
    if(days>30){
        $('#d31').show();
    }
    else{
        $('#d31').hide();
        
    }
    
};

const updateCellFromToDo = () => {
    const getInfoFromDb = () =>{
        //info from database-service
    }

    console.log('updated')
    let hasDayInfo = getInfoFromDb();
    if (hasDayInfo) {
        // mark cell with icon
    }
    else{
        //clean tasks icon - no tasks on this day
    }
};