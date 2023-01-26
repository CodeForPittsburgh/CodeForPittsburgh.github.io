/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&signed_in=true&libraries=visualization";
src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";

var LatLng = new Array;
 var infoWindow = new google.maps.InfoWindow;

var Bikeimage = {
    url: 'img/bicycle.ico',
    size: new google.maps.Size(26, 26)
};


var locations = [
['1000','Liberty & Stanwix',16,40.441326,-80.004679],
['1001','Forbes Ave & Market Sq',19,40.440877,-80.00308],
['1002','Third & Wood',15,40.43903,-80.00186],
['1003','First Ave & Smithfield St',15,40.4372,-80.000375],
['1004','First Ave & B St',15,40.4358002,-79.9968767],
['1005','Forbes Ave & Grant St',19,40.4387769,-79.9974405],
['1006','Ross St & Sixth Ave',21,40.4400542,-79.9951376],
['1007','Stevenson St & Forbes Ave',19,40.437643,-79.986695],
['1008','Centre Ave and Consol',35,40.440368,-79.988636],
['1009','12th St & Penn Ave',19,40.445844,-79.99238],
['1010','10th St & Penn Ave',15,40.444614,-79.9958114],
['1011','Fort Duquesne Blvd & 7th',15,40.4448352,-80.0007479],
['1012','North Shore Trail & Ft Duquesne Bridge',35,40.445834,-80.008882],
['1013','Isabella St & Federal St',15,40.447571,-80.003964],
['1014','Ridge Ave & Brighton Rd (CCAC)',19,40.450595,-80.013204],
['1015','Federal St & E North Ave',12,40.45509087,-80.0063467],
['1016','17th St & Penn Ave',19,40.449631,-79.985893],
['1017','21st St & Penn Ave',19,40.452124,-79.983543],
['1018','37th St & Butler St',21,40.466103,-79.964628],
['1019','42nd St & Butler St',17,40.470188,-79.9603066],
['1020','42nd St & Penn Ave',15,40.465893,-79.954417],
['1021','Taylor St & Liberty Ave',19,40.462769,-79.950867],
['1022','Liberty Ave & S Millvale',15,40.4599487,-79.9456124],
['1023','Liberty Ave & Baum Blvd',21,40.456505,-79.939362],
['1024','S Negley Ave & Baum Blvd',17,40.458714,-79.933483],
['1025','Penn Ave & N Fairmount St',15,40.464443,-79.933188],
['1026','S Whitfield St & Baum Blvd',13,40.460982,-79.926302],
['1027','Shady Ave & Ellsworth Ave',19,40.458972,-79.922023],
['1028','Penn Ave & Putnam St (Bakery Sq)',19,40.455821,-79.915248],
['1029','Alder St & S Higland Ave',19,40.4573211,-79.9248275],
['1030','S Euclid Ave & Centre Ave',12,40.4589116,-79.9290211],
['1031','Maryland Ave & Ellsworth Ave',19,40.45628,-79.930962],
['1032','Maryland Ave & Walnut St',15,40.452621,-79.928637],
['1033','Ivy St & Walnut St',19,40.45177,-79.932324],
['1034','Ellsworth Ave & N Neville St',15,40.448419,-79.947401],
['1035','Fifth Ave & S Dithridge St',19,40.446744,-79.950881],
['1036','Schenley Dr at Schenley Plaza',19,40.442398,-79.951479],
['1037','Frew St & Schenley Dr',20,40.441032,-79.948042],
['1038','Boulevard of the Allies & Parkview Ave',19,40.434338,-79.951877],
['1039','Atwood St & Bates',19,40.437987,-79.95367],
['1040','Bigelow Blvd & Fifth Ave',21,40.4446284,-79.9550156],
['1041','Fifth Ave & S Bouquet',19,40.442325,-79.957604],
['1042','Centre Ave & Kirkpatrick St',12,40.445019,-79.977194],
['1043','Coltart Ave & Forbes Ave',15,40.438876,-79.960179],
['1044','Zulema St & Coltart Ave',19,40.435986,-79.956942],
['1045','S 27th & Tunnel Blvd',19,40.428658,-79.965228],
['1046','S 25th St & E Carson St',18,40.42802,-79.969799],
['1047','S 22nd St & E Carson St',20,40.428576,-79.974559],
['1048','S 18th St & Sidney St',16,40.429338,-79.980684],
['1049','S 12th St & E Carson St',19,40.4285528,-79.9863687]
];

    function setBikeMarkers(map, locations) {
    for (var i = 0; i < locations.length; i++) {
        var bikelocations = locations[i];
        var myLatLng = new google.maps.LatLng(bikelocations[3], bikelocations[4]);
        var html = "<b>" + bikelocations[1] + "</b> <br/> Rack Count " + bikelocations[2] + "<br/>" ;
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: Bikeimage,
            //shape: shape,
            //title: bikelocations[1],
            //zIndex: bikelocations[2]
        });
        bindInfoWindow(marker, map, infoWindow, html);
    }
}