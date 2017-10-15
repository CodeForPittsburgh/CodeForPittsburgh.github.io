/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global data0, data1, data2, google */

src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&signed_in=true&libraries=visualization";
src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";


var ShapeName = new Array("../resources/CouncilDistrict.json", "../resources/Neighborhood.json", "../resources/PoliceZones.json");
var ShapeNameDescription = new Array("COUNCIL", "HOOD", "ZONE");
var ShapeNameLocation = 2;
//var ShapeLocationValue;
//        var map  = new google.maps.Map(document.getElementById("section"), {
//                center: new google.maps.LatLng(40.435467, -79.996404),
//                zoom: 12,
//                mapTypeId: 'roadmap'
//
//            });

var Zone = new Array;
var ZoneAddress = new Array;
var ZoneZipCode = new Array;
var ZonePhone = new Array;
var LatLng = new Array;

var markers = [];

Zone[1] = "Zone 1 Police Station";
ZoneAddress[1] = "1501 Brighton Road";
ZoneZipCode[1] = "15212";
ZonePhone[1] = "412-323-7201";
LatLng[1] = "40.4569461,-80.0160926";

Zone[2] = "Zone 2 Police Station";
ZoneAddress[2] = "2000 Centre Avenue";
ZoneZipCode[2] = "15219";
ZonePhone[2] = "412-255-2827";
LatLng[2] = "40.443561,-79.98004";

Zone[3] = "Zone 3 Police Station";
ZoneAddress[3] = "830 E Warrington";
ZoneZipCode[3] = "15210";
ZonePhone[3] = "412-488-8326";
LatLng[3] = "40.4216635,-79.99245";

Zone[4] = "Zone 4 Police Station";
ZoneAddress[4] = "5858 Northumberland Street";
ZoneZipCode[4] = "15217";
ZonePhone[4] = "412-422-6520";
LatLng[4] = "40.4414741,-79.9210908";

Zone[5] = "Zone 5 Police Station";
ZoneAddress[5] = "1401 Washington Blvd";
ZoneZipCode[5] = "Pittsburgh, PA 15206";
ZonePhone[5] = "412-665-3605";
LatLng[5] = "40.4703218,-79.9086526";

Zone[6] = "Zone 6 Police Station";
ZoneAddress[6] = "312 S. Main Street";
ZoneZipCode[6] = "15220";
ZonePhone[6] = "412-937-3051";
LatLng[6] = "40.442020898212775, -80.032275981864032";

Zone[0] = "HQ";
ZoneAddress[0] = "1203 Western Avenue";
ZoneZipCode[0] = "Pittsburgh, PA 15233";
ZonePhone[0] = "412-323-7837";
LatLng[0] = "40.4504595,-80.0211859";

var stations = [
    ['Zone 1', 40.4569461, -80.0160926, 1],
    ['Zone 2', 40.443561, -79.98004, 2],
    ['Zone 3', 40.4216635, -79.99245, 3],
    ['Zone 4', 40.4414741, -79.9210908, 4],
    ['Zone 5', 40.4703218, -79.9086526, 5],
    ['Zone 6', 40.442020898212775, -80.032275981864032, 6],
    ['HQ', 40.4504595, -80.0211859, 7]
];
var map = new google.maps.Map(document.getElementById("mapsection"), {
    center: new google.maps.LatLng(40.435467, -79.996404),
    zoom: 12,
    mapTypeId: 'roadmap'
});
var xml;

data0 = new google.maps.Data();
data0.loadGeoJson(ShapeName[0]);
data1 = new google.maps.Data();
data1.loadGeoJson(ShapeName[1]);
data2 = new google.maps.Data();
data2.loadGeoJson(ShapeName[2]);
var oldfeature = ShapeNameLocation;

var infoWindow = new google.maps.InfoWindow;

var customIcons = {
    ARREST: {
        icon: '../img/mm_20_blue.png'
                //icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
    },
    OFFENSE: {
        icon: '../img/mm_20_yellow.png'
    },
    BOTH: {
        icon: '../img/mm_20_red.png'
    }
};

var PPimage = {
    url: '../img/PittsburghPolice.png',
    size: new google.maps.Size(17, 19)
};

function initialize() {
    downloadUrl("PoliceBlotterMap2_1.php", function (data) {
        xml = data.responseXML;
        alert(" In DOWNLOAD " + xml);
        processmap();
        alert(" After DOWNLOAD " + xml);
    });
    //alert(" After DOWNLOAD " + xml);
//            alert("Running load " + ShapeNameDescription[ShapeNameLocation]);
    //processmap();
}
function processGeoJson(ShapeNameLocation)
{


    if (ShapeNameLocation === 0)
    {
        document.getElementById('CouncilDistrict').style.backgroundColor = 'Green';
        document.getElementById('Neighborhood').style.backgroundColor = 'Gray';
        document.getElementById('PoliceZone').style.backgroundColor = 'Gray';
        data1.setMap(null);
        data2.setMap(null);
        //data0.setMap(map);
        var featureStyle = {
            fillColor: 'green',
            strokeWeight: 1,
            clickable: 'true'

        };

        data0.setStyle(featureStyle);
        // When the user hovers, tempt them to click by outlining the letters.
        // Call revertStyle() to remove all overrides. This will use the style rules
        // defined in the function passed to setStyle()
        data0.addListener('mouseover', function (event) {
            data0.revertStyle();
            data0.overrideStyle(event.feature, {strokeWeight: 4});
            document.getElementById('info-box').textContent =
                    event.feature.getProperty(ShapeNameDescription[ShapeNameLocation]); // COUNCIL // HOOD // ZONE
        });

        data0.addListener('mouseout', function (event) {
            //data0.revertStyle();
        });
        data0.setMap(map);
    }
    if (ShapeNameLocation === 1)
    {
        document.getElementById('CouncilDistrict').style.backgroundColor = 'Gray';
        document.getElementById('Neighborhood').style.backgroundColor = 'Green';
        document.getElementById('PoliceZone').style.backgroundColor = 'Gray';
        data0.setMap(null);
        data2.setMap(null);
        //data1.setMap(map);
        var featureStyle = {
            fillColor: 'green',
            strokeWeight: 1,
            clickable: 'true'

        };

        data1.setStyle(featureStyle);
        // When the user hovers, tempt them to click by outlining the letters.
        // Call revertStyle() to remove all overrides. This will use the style rules
        // defined in the function passed to setStyle()
        data1.addListener('mouseover', function (event) {
            data1.revertStyle();
            data1.overrideStyle(event.feature, {strokeWeight: 4});
            document.getElementById('info-box').textContent =
                    event.feature.getProperty(ShapeNameDescription[ShapeNameLocation]); // COUNCIL // HOOD // ZONE
        });

        data1.addListener('mouseout', function (event) {
            //data1.revertStyle();
        });
        data1.setMap(map);
    }
    if (ShapeNameLocation === 2)
    {
        document.getElementById('CouncilDistrict').style.backgroundColor = 'Gray';
        document.getElementById('Neighborhood').style.backgroundColor = 'Gray';
        document.getElementById('PoliceZone').style.backgroundColor = 'Green';
        data0.setMap(null);
        data1.setMap(null);
        //data2.setMap(map);
        var featureStyle = {
            fillColor: 'green',
            strokeWeight: 1,
            clickable: 'true'
        };
        data2.setStyle(featureStyle);
        // When the user hovers, tempt them to click by outlining the letters.
        // Call revertStyle() to remove all overrides. This will use the style rules
        // defined in the function passed to setStyle()
        data2.addListener('mouseover', function (event) {
            data2.revertStyle();
            data2.overrideStyle(event.feature, {strokeWeight: 4});
            document.getElementById('info-box').textContent =
                    event.feature.getProperty(ShapeNameDescription[ShapeNameLocation]); // COUNCIL // HOOD // ZONE
        });

        data2.addListener('mouseout', function (event) {
            //data2.revertStyle();
        });
        data2.setMap(map);
    }


}
function processmap()
{
    processGeoJson(2);
    buildmarkers();
}
function buildmarkers()
{
    alert("Build markers");
    deleteMarkers();
    markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
        var zone = markers[i].getAttribute("zone");
        var address = markers[i].getAttribute("address");
        var type = markers[i].getAttribute("type");
        var incidentdate = markers[i].getAttribute("incidentdate");
        var incidenttime = markers[i].getAttribute("incidenttime");
        if (incidenttime === null)
        {
            incidenttime = "N/A";
        }
        var age = markers[i].getAttribute("age");
        if (age === "")
        {
            age = "N/A";
        }
        var gender = markers[i].getAttribute("gender");
        if (gender === "")
        {
            gender = "N/A";
        }
        var incidentnumber = markers[i].getAttribute("incidentnumber");
        var description = markers[i].getAttribute("description");
        var point = new google.maps.LatLng(
                parseFloat(markers[i].getAttribute("lat")),
                parseFloat(markers[i].getAttribute("lng")));
        var html = "<b>" + incidentnumber + "</b> <br/>" + type + "<br/>" + incidentdate + " " + incidenttime + "<br/>" + zone + "<br/>" + address + "<br/>Age: " + age + " Gender: " + gender + "<br/>" + description;
//alert("Type is " + type);
        //var icon = customIcons[type] || {};
        var icon = customIcons[type];
        if (type === 2)
        {
            alert("Type is 2");
        }
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon
        });
        //marker.addListener('click', bindInfoWindow(marker, map, infoWindow, html));
        bindInfoWindow(marker, map, infoWindow, html);
    }

    setPPMarkers(map, stations);
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
function setDescriptionType(description, section)
{
    //alert("Type " + type + " Section "+ section);
    if (description.includes(section))
    {
        return 2;
    }
}
function setPPMarkers(map, locations) {
    for (var i = 0; i < locations.length; i++) {
        var station = locations[i];
        var myLatLng = new google.maps.LatLng(station[1], station[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: PPimage,
            //shape: shape,
            title: station[0],
            zIndex: station[3]
        });
    }
}
function incidentpins(section)
{
    alert("Incident pins " + xml + " section " + section);
    var markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
        var zone = markers[i].getAttribute("zone");
        var address = markers[i].getAttribute("address");
        var type = markers[i].getAttribute("type");
        var incidentdate = markers[i].getAttribute("incidentdate");
        var incidenttime = markers[i].getAttribute("incidenttime");
        if (incidenttime === null)
        {
            incidenttime = "N/A";
        }
        var age = markers[i].getAttribute("age");
        if (age === "")
        {
            age = "N/A";
        }
        var gender = markers[i].getAttribute("gender");
        if (gender === "")
        {
            gender = "N/A";
        }
        var incidentnumber = markers[i].getAttribute("incidentnumber");
        var description = markers[i].getAttribute("description");
        var point = new google.maps.LatLng(
                parseFloat(markers[i].getAttribute("lat")),
                parseFloat(markers[i].getAttribute("lng")));
        var html = "<b>" + incidentnumber + "</b> <br/>" + type + "<br/>" + incidentdate + " " + incidenttime + "<br/>" + zone + "<br/>" + address + "<br/>Age: " + age + " Gender: " + gender + "<br/>" + description;

        if (section !== 0)
        {
            if (description.includes(section))
                type = 2;
        }
        var icon = customIcons[type] || {};

        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon
        });
        bindInfoWindow(marker, map, infoWindow, html);
    }

    setPPMarkers(map, stations);
}
// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
google.maps.event.addDomListener(window, 'load', initialize);



