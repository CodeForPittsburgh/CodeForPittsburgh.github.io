/**
* Calculates Easter in the Gregorian/Western (Catholic and Protestant) calendar 
* based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
* @returns {array} [int month, int day]
*/
var clock = "";
var daysSpan = "";
var hoursSpan = "";
var minutesSpan = "";
var secondsSpan = "";
var timeinterval = "";
var targettime = "";

function getEaster(year) {
	var f = Math.floor,
		// Golden Number - 1
		G = year % 19,
		C = f(year / 100),
		// related to Epact
		H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
		// number of days from 21 March to the Paschal full moon
		I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
		// weekday for the Paschal full moon
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		// number of days from 21 March to the Sunday on or before the Paschal full moon
		L = I - J,
		month = 3 + f((L + 40)/44),
		day = L + 28 - 31 * f(month / 4);

	return [getMonth(month),day];
}
function getMonth(month)
{
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[month-1];
}
  
function getAshWednesday(year) {
	var f = Math.floor,
		// Golden Number - 1
		G = year % 19,
		C = f(year / 100),
		// related to Epact
		H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
		// number of days from 21 March to the Paschal full moon
		I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
		// weekday for the Paschal full moon
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		// number of days from 21 March to the Sunday on or before the Paschal full moon
		L = 80 + I - J - 46,
		month = 1+f((L+40 )/44),
                feb = 28 * (f(month/3)),
                lyear = leapyear(year),
		day = L + 7 -31 -feb + lyear;
//var days = 31 ;
	return [getMonth(month),day];
}  

function getGoodFriday(year) {
	var f = Math.floor,
		// Golden Number - 1
		G = year % 19,
		C = f(year / 100),
		// related to Epact
		H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
		// number of days from 21 March to the Paschal full moon
		I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
		// weekday for the Paschal full moon
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		// number of days from 21 March to the Sunday on or before the Paschal full moon
		L = I - J,
		month = 3 + f((L + 40)/44),
		day = L + 26 - 31 * f(month / 4);
//var days = 31 ;
	return [getMonth(month),day];
}  

function leapyear(year)
{
    
if( (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0))
{
    return 1;
}
else
{
    return 0;
}
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