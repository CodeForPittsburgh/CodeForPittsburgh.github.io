function CurrentYear() {
    var d = new Date();
    var n = d.getFullYear();
    return n;

}
function getTimeRemaining(targettime) {
    var t = Date.parse(targettime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}



function initializeFishFryClock(id) {
    clock = document.getElementById(id);
    daysSpan = clock.querySelector('.days');
    hoursSpan = clock.querySelector('.hours');
    minutesSpan = clock.querySelector('.minutes');
    secondsSpan = clock.querySelector('.seconds');
    FishFryClock();
    timeinterval = setInterval(FishFryClock, 1000);
    //alert(timeinterval);
}




function FishFryClock() {
    var t = getTimeRemaining(targettime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {

        clearInterval(timeinterval);

    }
}

function FishFryStatus(targettime,ashwednesday, easter)
{
    var rc = 0;
    var tt =  Date.parse(new Date());
    //alert(tt);
    var at = Date.parse(ashwednesday);
    //alert(at);
    var et = Date.parse(easter);

      if (tt >= at && tt < et)
      {
      rc =1;
     }
      if (tt > et)
     {
      rc =2;
     }
     
    return rc;
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
            + '    Seconds: <span class="seconds"></span> <br>'

            ;
    initializeFishFryClock('FishFryClock', targettime);
    getTimeRemaining(targettime).minutes;
}