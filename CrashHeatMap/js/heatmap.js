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
    zoom: 12,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var featureStyle = {
    fillColor: 'rgba(255, 255, 255, .1)',
    strokeWeight: 1,
    clickable: 'true'

};

//var originalgradient = [
//    'rgba(0, 255, 255, 0)',
//    'rgba(0, 255, 255, 1)',
//    'rgba(0, 191, 255, 1)',
//    'rgba(0, 127, 255, 1)',
//    'rgba(0, 63, 255, 1)',
//    'rgba(0, 0, 255, 1)',
//    'rgba(0, 0, 223, 1)',
//    'rgba(0, 0, 191, 1)',
//    'rgba(0, 0, 159, 1)',
//    'rgba(0, 0, 127, 1)',
//    'rgba(63, 0, 91, 1)',
//    'rgba(127, 0, 63, 1)',
//    'rgba(191, 0, 31, 1)',
//    'rgba(255, 0, 0, 1)'
//];

var pointArray = new google.maps.MVCArray(pittsburghData);
var city = new google.maps.Data();
//var data1 = new google.maps.Data();
google.maps.event.addDomListener(window, 'load', initialize);
function initialize()
{
    map = new google.maps.Map(document.getElementById('mapsection'),
            mapOptions);

    //countymapcode();
    //neighborhoodmapcode();
    citymapcode();
    getxmlfile();
    heatmapcode();

}
function getxmlfile()
{
    var markerlength = 0;
    downloadUrl("./crashdata3.xml", function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        markerlength = markers.length;
        console.log("FILE LOADED " + markerlength);
        for (var i = 0; i < markers.length; i++) {
            q1 = parseFloat(markers[i].getAttribute("lat"));
            q2 = parseFloat(markers[i].getAttribute("lng"));
            //alert(" i "+ i +" value "+ myLatLng[i]); 
            var latLng = new google.maps.LatLng(q1, q2);
            var weightedLoc = {
                location: latLng
            };
            pointArray.push(weightedLoc);
           // pointArray.push(latLng);
        }
    });
}
function heatmapcode()
{
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.set('opacity', 1); // default 0.7 range 0 to 1
    heatmap.set('radius', 10); // default 20 range 10 to 50
    heatmap.set('dissipating', false); // default true
    heatmap.setMap(map);
}
function citymapcode()
{

    //data0 = new google.maps.Data();
    city.loadGeoJson("./resources/Neighborhood.json");
    city.setStyle(featureStyle);
    city.addListener('mouseover', function (event) {
        city.revertStyle();
        city.overrideStyle(event.feature, {strokeWeight: 4});

        var label = event.feature.getProperty("LABEL");
        var name = event.feature.getProperty("NAME");
        var hood = event.feature.getProperty("HOOD");
        var contentlabel = hood;
//        console.log("label " + label + " name " + name + " hood " + hood);
//
//        if (hood === null)
//        {
//            contentlabel = label;
//        }
//
//        if (label === "Pittsburgh" || name === "PITTSBURGH")
//        {
//            contentlabel = hood;
//        }
//
//        if (label === null && name === null && hood !== null)
//        {
//            contentlabel = hood;
//            console.log( " hood " + hood);
//        }
        document.getElementById('info-box').textContent = contentlabel;
    });

    city.addListener('mouseout', function (event) {
        city.revertStyle();
    });

    city.setMap(map);

}




function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}


function changeGradient() {

    var gradient = [
        'rgba(255, 255, 255, 0)',
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
    // heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    // heatmap.set('radius', heatmap.get('radius') ? null : 25);
}

function changeOpacity() {
    //heatmap.set('opacity', heatmap.get('opacity') ? null : .5);
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
//google.maps.event.addDomListener(window, 'load', initialize);




