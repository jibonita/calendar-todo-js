// const dateHelper = () => {
const monthNames = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

let currentMonth;
let currentYear;
const daysInMonth = [];

const getDaysInMonth = (m, y) => {
    if (daysInMonth[m] & m !== 1) { // month not February
        return daysInMonth[m];
    }

    //* * month in return expression is 1-based,
    // but the func received it 0-based
    m = m + 1;
    const allDays = m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);
    daysInMonth[m - 1] = allDays;
    return allDays;
};

const getThe1stOfMonth = (date) => {
    setTodaysMonthYear(date);
    const firstDay = new Date(currentYear, currentMonth, 1);
    return firstDay.getDay();
};

const setTodaysMonthYear = (date) => {
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
};

const setCurrentMonth = (m) => {
    currentMonth = m;
};

const setCurrentYear = (y) => {
    currentYear = y;
};

const getMonthName = (m) => {
    return monthNames[m];
};

// };


export {
    currentMonth,
    currentYear,
    getDaysInMonth,
    getThe1stOfMonth,
    setTodaysMonthYear,
    setCurrentMonth,
    setCurrentYear,
    getMonthName,
};

