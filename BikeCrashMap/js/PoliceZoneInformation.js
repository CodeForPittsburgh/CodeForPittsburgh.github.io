/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&signed_in=true&libraries=visualization";
src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";

var Zone = new Array;
var ZoneAddress = new Array;
var ZoneZipCode = new Array;
var ZonePhone = new Array;
var LatLng = new Array;

var PPimage = {
    url: 'img/PittsburghPolice.png',
    size: new google.maps.Size(17, 19)
};

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