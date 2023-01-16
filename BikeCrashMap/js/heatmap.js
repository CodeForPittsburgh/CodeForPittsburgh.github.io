//src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&libraries=visualization";
src = "jquery-1.11.2.js";
src = "bootstrap.js";


// Adding 500 Data Points
var map, pointarray, heatmap, google, lat, lng;
//new google.maps.LatLng(40.377822,-80.065892),
//40.4551803,-80.0560695 // Sheraden
//40.4358376,-80.0128648 // Point State Park

lat = 40.4358376;
lng = -80.0128648;
var pittsburghData = [];
var myLatLng = [];
var snl = 0;
var mylen = 0;

var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var featureStyle = {
    fillColor: 'green',
    strokeWeight: 1,
    clickable: 'true'

};

var originalgradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)'
];

var pointArray = new google.maps.MVCArray(pittsburghData);
var data0 = new google.maps.Data();
var data1 = new google.maps.Data();

function initialize()
{
    map = new google.maps.Map(document.getElementById('mapsection'),
            mapOptions);

    countymapcode();
    neighborhoodmapcode();
    getxmlfile();
    heatmapcode();

}
function getxmlfile()
{
    downloadUrl("./crashdata.xml", function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        //alert(markers.length);
        for (var i = 0; i < markers.length; i++) {
            q1 = parseFloat(markers[i].getAttribute("lat"));
            q2 = parseFloat(markers[i].getAttribute("lng"));
            //alert(" i "+ i +" value "+ myLatLng[i]); 
            var latLng = new google.maps.LatLng(q1, q2);
            var weightedLoc = {
                location: latLng
            };
            pointArray.push(weightedLoc);
        }

    });
}
function heatmapcode()
{
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.set('opacity', 0.8); // default 0.7 range 0 to 1
    heatmap.set('radius', 20); // default 20 range 10 to 50
    heatmap.setMap(map);
}
function countymapcode()
{

    //data0 = new google.maps.Data();
    data0.loadGeoJson("./resources/Allegheny_County_Municipal_Boundaries.json");
    data0.setStyle(featureStyle);
    data0.addListener('mouseover', function (event) {
        data0.revertStyle();
        data0.overrideStyle(event.feature, {strokeWeight: 4});

        document.getElementById('info-box').textContent =
                event.feature.getProperty("LABEL");

    });
    data0.addListener('mouseout', function (event) {
        data0.revertStyle();
    });

    data0.setMap(map);

}

function neighborhoodmapcode()
{
    //data1 = new google.maps.Data();
    data1.loadGeoJson("./resources/Neighborhood.json");
    data1.setStyle(featureStyle);
    data1.setMap(map);
    data1.addListener('mouseover', function (event) {
        data1.revertStyle();
        data1.overrideStyle(event.feature, {strokeWeight: 4});

        document.getElementById('info-box').textContent =
                event.feature.getProperty("HOOD");

    });
    data1.addListener('mouseout', function (event) {
        data1.revertStyle();
    });
    data1.setMap(map);
}



function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}


function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ];
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 45);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.9);
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
google.maps.event.addDomListener(window, 'load', initialize);




