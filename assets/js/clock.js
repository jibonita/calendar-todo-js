const startTime = () => {
    const checkTime = (i) => {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    };
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
        h + ':' + m + ':' + s;
    setTimeout(startTime, 1000);
};

export { startTime };
