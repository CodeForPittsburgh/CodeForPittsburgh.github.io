/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
 */


var endtime = 'February 26 2020 00:00:00 GMT-0500';


var clock = "";
var daysSpan = "";
var hoursSpan = "";
var minutesSpan = "";
var secondsSpan = "";
timeinterval = "";

//initializeClock1('clockdiv1',endtime1);
//getTimeRemaining1(endtime1).minutes;

//initializeClock2('clockdiv2',endtime2);
//getTimeRemaining2(endtime2).minutes;

initializeFishFryClock('FishFryClock',endtime);
getTimeRemaining(endtime).minutes;



function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
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
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
        
        clearInterval(timeinterval);

    }
}