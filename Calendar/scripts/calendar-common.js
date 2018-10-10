//import * as $ from 'jquery';

var calendarContainer;
const CELL_PERCENTAGE_WIDTH = 14;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var currentMonth;
var currentYear;
let clicked;


const daysInMonth = [];


$( document ).ready(function(){
    initializeCalendar('#cal-container');
    $('#prev').click(() => {
        displayNewMonth(-1)
    });
    $('#next').click(() => {
        displayNewMonth(1)
    });
    $('#triggerclose').click(() => {
        $('#cal-container').trigger('todoclosed');
    });

    $('#cal-container').on('todoclosed', ()=>{
        updateCellFromToDo(clicked);
    })
});


const getDaysInMonth = (m, y) => {
    if(daysInMonth[m] & m !== 1){ // month not February
        return daysInMonth[m];
    }

    //** month in return expression is 1-based, but the func received it 0-based
    m = m+1; 
    let allDays = m===2?y&3||!(y%25)&&y&15?28:29:30+(m+(m>>3)&1); // line copied from Internet
    daysInMonth[m-1] = allDays;
    return allDays;
};

const getThe1stOfMonth = (date)=> {
    setCurrentMonthYear(date);
    let firstDay = new Date(currentYear, currentMonth, 1);
    return firstDay.getDay();
};

const initializeCalendar = function(id){
    let today = new Date(2019, 1 , 1, 0,0,0,0);
    setCurrentMonthYear(today);
   
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

const setCurrentMonthYear = (date) =>{
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
};
const setMarginOfFirstDay = (date) => {
    let dayOfWeekOf1st = getThe1stOfMonth(date) ;
    currentMonth = date.getMonth();
    if(dayOfWeekOf1st === 0) dayOfWeekOf1st = 7;
    
    $('.cell:first-child').css('margin-left', (dayOfWeekOf1st-1)*CELL_PERCENTAGE_WIDTH+'%');
    $('#month-name').text(monthNames[currentMonth]);
};
const displayNewMonth = (dir)=>{
    const updateCurrentMY = (dir)=> {
        currentMonth += dir;
        if(currentMonth<0) {
            currentYear--;
            currentMonth = 11;
        }
        else{
            currentYear += Math.floor(currentMonth / 12);
            currentMonth = currentMonth % 12;
        }
    };
    
    updateCurrentMY(dir);    
    fillDataToCalendar();
    setMarginOfFirstDay(new Date(currentYear, currentMonth, 1));   

};
const viewDayInfo = function(event) {
    let clicked = currentYear+'-'+currentMonth+'-'+event.target.id;
    console.log('show TODO data for '+clicked)
};

const fillDataToCalendar = () => {
    let y = currentYear;
    let m = currentMonth;
    let allDaysInMonth = getDaysInMonth(currentMonth, currentYear);
    for (let count = 0; count < allDaysInMonth; count++) {
        let data = insertDayInfoInCell(y, m, count+1);
        let cID = `#d${count+1}`;
        $(cID).text(data);
    }
    hideUnusedCells(allDaysInMonth);
};

const insertDayInfoInCell = (y,m,d) => {
    //return y+' '+monthNames[m] + ' '+d;
    return d;
    return y+' '+monthNames[m] + ' '+d+'\n'+y+' '+monthNames[m] + ' '+d
    +'\n'+y+' '+monthNames[m] + ' '+d
    +'\n'+y+' '+monthNames[m] + ' '+d;
};

const hideUnusedCells = (days) => {
    console.log(days)
    if(days>30){
        $('#d31').show();
    }
    else{
        $('#d31').hide();
        
    }
    if(days>29){
            $('#d30').show();
    }
    else{
        $('#d30').hide();
        
    }
    if(days>28){
        $('#d29').show();
    }
    else{
        $('#d29').hide();
    }
};

const updateCellFromToDo = () => {
    console.log('updated')
};