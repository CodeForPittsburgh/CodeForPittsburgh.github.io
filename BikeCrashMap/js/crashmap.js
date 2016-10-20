//src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&libraries=visualization";
src = "jquery-1.11.2.js";
src = "bootstrap.js";
src = "citymapoverlays.js";
function initialize() {
    var map;
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
    map = new google.maps.Map(document.getElementById("mapsection"), {
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



    county.setMap(map);
    

    var type = "Crash";
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    setBikeMarkers(map, locations)

    // Change this depending on the name of your PHP file
    downloadUrl("./crashdata.xml", function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        //alert(markers.length);            
        for (var i = 0; i < markers.length; i++) {
            var name = markers[i].getAttribute("NAME");
            var crashyear = markers[i].getAttribute("CRASH_YEAR");
            var crashdate = markers[i].getAttribute("CRASH_MONTH");
            var crashtime = markers[i].getAttribute("TIME_OF_DAY");
            var address = markers[i].getAttribute("STREET_NAME");
            var description = markers[i].getAttribute("MAX_SEVERITY_LEVEL");
            var point = new google.maps.LatLng(
                    parseFloat(markers[i].getAttribute("lat")),
                    parseFloat(markers[i].getAttribute("lng")));
            var html = "<b>" + address + "</b> <br/>" + type + "<br/>" + "Year:" + crashyear + " Month:" + crashdate + " Time:" + crashtime + "<br/>" + name + "<br/>" + description;

            var icon = './img/roundbg_check_black.png';
            if (description === "Killed")
            {
                icon = redStar;
            }
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                icon: icon
            });
            //marker.addListener('click', bindInfoWindow(marker, map, infoWindow, html));
            bindInfoWindow(marker, map, infoWindow, html);
        }
    });
    //setMarkers(map);

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

