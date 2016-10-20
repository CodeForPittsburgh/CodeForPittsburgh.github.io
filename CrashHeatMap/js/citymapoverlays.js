/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&signed_in=true&libraries=visualization";
src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";

function citymap()
{
var ShapeName = new Array("resources/Pittsburgh_Neighborhoods.json");
var ShapeNameDescription = new Array("hood");

var ShapeNameLocation = 0;
var city = new google.maps.Data();
city.loadGeoJson(ShapeName[0]);



city.setStyle(featureStyle);
// When the user hovers, tempt them to click by outlining the letters.
// Call revertStyle() to remove all overrides. This will use the style rules
// defined in the function passed to setStyle()
city.addListener('mouseover', function (event) {

    city.overrideStyle(event.feature, {strokeWeight: 4});
    document.getElementById('info-box').textContent =
            event.feature.getProperty(ShapeNameDescription[ShapeNameLocation]); // COUNCIL // HOOD // ZONE
});

city.addListener('mouseout', function (event) {
    //data0.revertStyle();
});
city.setMap(map);
}
