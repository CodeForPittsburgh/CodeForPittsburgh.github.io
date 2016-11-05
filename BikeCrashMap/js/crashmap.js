//src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&libraries=visualization";
src = "jquery-1.11.2.js";
src = "bootstrap.js";
src = "citymapoverlays.js";

var state = {"map": null,
	         "filter": {
                 "startYear": 2001,
                 "endYear": 2015,
		         "severity": ["Not injured",
                              "Killed", 
                              "Major injury", 
                              "Moderate injury", 
                              "Minor injury", 
                              "Injury/ Unknown Severity", 
                              "Unknown"]
             }
};

 var getSelectValues =  function(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function update(){
    var severity  = getSelectValues(document.getElementById("crashSeverityFilter"));
    if (severity.length == 0){
        console.log("Fails");
	    return;
    }
    var startYear = document.getElementById("crashYearFilterStart").value;
    var endYear   = document.getElementById("crashYearFilterEnd").value;
    if (endYear < startYear){
	    return;
    }

    state.filter.startYear = startYear;
    state.filter.endYear = endYear;
    state.filter.severity = severity;

    initialize();
}

var bindEvent = function(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else {
        element.attachEvent('on'+type, handler);
    }
}

function initialize() {
    bindEvent(document.getElementById("crashYearFilterStart"), "change", update);
    bindEvent(document.getElementById("crashYearFilterEnd"), "change", update);
    bindEvent(document.getElementById("crashSeverityFilter"), "change", update);
    county = new google.maps.Data();
    
    county.loadGeoJson("./resources/Allegheny_County_Municipal_Boundaries.json");
    

    var infoWindow = new google.maps.InfoWindow;
    var redStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: .1,
        strokeColor: 'gold',
        strokeWeight: .5
    };
    state.map = new google.maps.Map(document.getElementById("mapsection"), {
        center: new google.maps.LatLng(40.435467, -79.996404),
        zoom: 10,
        mapTypeId: 'roadmap'
    });
    var featureStyle = {
        fillColor: 'White',
        strokeWeight: 1,
        clickable: 'true'

    };

    county.setStyle(featureStyle);



    county.addListener('mouseover', function (event) {
        county.revertStyle();
        county.overrideStyle(event.feature, {strokeWeight: 4});

        document.getElementById('info-box').textContent =
                event.feature.getProperty("LABEL");

    });
    county.addListener('mouseout', function (event) {
        county.revertStyle();
    });



    county.setMap(state.map);
    

    var type = "Crash";
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(state.map);

    setBikeMarkers(state.map, locations)
    console.log(state.filter.severity);
    // Change this depending on the name of your PHP file
    downloadUrl("./crashdata.xml", function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        //alert(markers.length);            
        for (var i = 0; i < markers.length; i++) {
            var name = markers[i].getAttribute("NAME");
            var crashyear = markers[i].getAttribute("CRASH_YEAR");
            if (crashyear < state.filter.startYear || crashyear > state.filter.endYear){
                continue;
            }
            var crashdate = markers[i].getAttribute("CRASH_MONTH");
            var crashtime = markers[i].getAttribute("TIME_OF_DAY");
            var crashmin, crashhour;
            if (crashtime.length == 3){
                crashmin = crashtime.substring(1);
                crashhour = crashtime.substring(0, 1);
            } 
            else{
                crashmin = crashtime.substring(2);
                crashhour = crashtime.substring(0, 2);
            }
            var address = markers[i].getAttribute("STREET_NAME");
            var description = markers[i].getAttribute("MAX_SEVERITY_LEVEL");
            if (!state.filter.severity.includes(description)){
                continue;
            }
            var point = new google.maps.LatLng(
                    parseFloat(markers[i].getAttribute("lat")),
                    parseFloat(markers[i].getAttribute("lng")));
            var html = "<b>" + address + "</b> <br/>" + type + "<br/>" + "Year:" + crashyear + " Month:" + crashdate + " Time: " + crashhour + ":" + crashmin + "<br/>" + name + "<br/>" + description;

            var icon = './img/roundbg_check_black.png';
            if (description === "Killed")
            {
                icon = redStar;
            }
            var marker = new google.maps.Marker({
                map: state.map,
                position: point,
                icon: icon
            });
            //marker.addListener('click', bindInfoWindow(marker, map, infoWindow, html));
            bindInfoWindow(marker, state.map, infoWindow, html);
        }
    });
    setMarkers(state.map);
}

function bindInfoWindow(marker, map, infoWindow, html) {

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
        //infoWindow.open(marker.get('map'), marker);

    });

}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', url, true);
    //request.setRequestHeader();
    request.send(null);
}

function doNothing() {
}

function setMarkers(map) {
    var marker = new google.maps.Marker({
        map: map
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

