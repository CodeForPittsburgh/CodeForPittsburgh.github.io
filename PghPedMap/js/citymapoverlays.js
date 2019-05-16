/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&signed_in=true&libraries=visualization";
src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";

var ShapeName = new Array("../resources/CouncilDistrict.json", "../resources/Neighborhood.json", "../resources/PoliceZones.json");
var ShapeNameDescription = new Array("COUNCIL", "HOOD", "ZONE");
var ShapeNameLocation = 2;
var data0 = new google.maps.Data();
data0.loadGeoJson(ShapeName[0]);
var data1 = new google.maps.Data();
data1.loadGeoJson(ShapeName[1]);
var data2 = new google.maps.Data();
data2.loadGeoJson(ShapeName[2]);
var oldfeature = ShapeNameLocation;

function processGeoJson(ShapeNameLocation)
{


    if (ShapeNameLocation === 0)
    {
        document.getElementById('CouncilDistrict').style.backgroundColor = 'LightGreen';
        document.getElementById('Neighborhood').style.backgroundColor = 'LightGray';
        document.getElementById('PoliceZone').style.backgroundColor = 'LightGray';
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
        document.getElementById('CouncilDistrict').style.backgroundColor = 'LightGray';
        document.getElementById('Neighborhood').style.backgroundColor = 'LightGreen';
        document.getElementById('PoliceZone').style.backgroundColor = 'LightGray';
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
        document.getElementById('CouncilDistrict').style.backgroundColor = 'LightGray';
        document.getElementById('Neighborhood').style.backgroundColor = 'LightGray';
        document.getElementById('PoliceZone').style.backgroundColor = 'LightGreen';
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