function CurrentYear() {
    var d = new Date();
    var n = d.getFullYear();
    return n;

}
function getTimeRemaining(targettime) {
    var t = Date.parse(targettime) - Date.parse(new Date());
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes
    };
}
function nextyeardates(cy)
{
    var ashwednesday = getAshWednesday(cy);
    //gmt = getGMT(ashwednesday);
    //alert(ashwednesday);
    var month = ashwednesday[0];
    var day = ashwednesday[1];
    var AshWednesdayresults = "Ash Wednesday " + cy + " is on " + month + " " + day;
    document.getElementById("AshWednesday").innerHTML = AshWednesdayresults;
    var GoodFriday = getGoodFriday(cy);
    var month = GoodFriday[0];
    var day = GoodFriday[1];
    var GoodFridayresults = "Good Friday " + cy + " is on " + month + " " + day;
    document.getElementById("GoodFriday").innerHTML = GoodFridayresults;

    var easter = getEaster(cy);
    var month = easter[0];
    var day = easter[1];
    var Easterresults = "Easter " + cy + " is on " + month + " " + day;
    document.getElementById("Easter").innerHTML = Easterresults;
}


function initializeFishFryClock(id) {
    clock = document.getElementById(id);
    daysSpan = clock.querySelector('.days');
    hoursSpan = clock.querySelector('.hours');
    minutesSpan = clock.querySelector('.minutes');

    FishFryClock();
    timeinterval = setInterval(FishFryClock, 1000);
    //alert(timeinterval);
}




function FishFryClock() {
    var t = getTimeRemaining(targettime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;

    if (t.total <= 0) {

        clearInterval(timeinterval);

    }
}

function FishFryStatus(ashwednesday, goodfriday)
{
    var rc = 0;
    days = 0;

    var t = addDays(new Date(), days);

    var tt =  Date.parse(t);
    //alert(tt);
    var at = Date.parse(ashwednesday);
    //alert(at);
    var gf = Date.parse(goodfriday);
    //alert(t + " " + tt + " " + at + " " + gf);
    if ((tt >= at) && (tt < gf))
    {
        rc = 1;
    }
    if (tt >= gf)
    {
        rc = 2;
        var d = new Date();
        var cy = d.getFullYear() + 1;
        nextyeardates(cy);
    }
    //alert(rc);
    return rc;
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    //alert(result);
    return result;
}
function dhms(targettime) {
    document.getElementById("dhms").innerHTML =
            '<div>'
            + '    Days: <span class="days"></span><br>'

            + '</div>'
            + '<div>'
            + '    Hours: <span class="hours"></span><br>'

            + '</div>'
            + '<div>'
            + '    Minutes: <span class="minutes"></span> <br>'

            + ' </div>'
            + '<div>'


            ;
    initializeFishFryClock('FishFryClock', targettime);
    getTimeRemaining(targettime).minutes;
}
function getGMT(date)
{
    var gmt = date.toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
    return gmt;
}