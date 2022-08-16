/*
This script should handle the visual placement and boundaries of components and functionalities on the map.
 */

var map = L.map('map', {
    center: [40.440624, -79.995888],
    zoomControl: false,
    zoom: 14,
});
L.control
    .zoom({
        position: 'topright',
    })
    .addTo(map);
L.control
    .locate({
        position: 'topright',
        icon: 'fa fa-location-arrow fa-lg',
    })
    .addTo(map);

var geojsonMarkerOptions = {
    radius: 4,
    fillColor: '#ff7800',
    color: '#000',
    weight: 1,
};

L.control.scale().addTo(map);

// Create a Tile Layer and add it to the map
var foodLocations = new L.FeatureGroup();
var points = [];
var mapSearchRadius = 500;
var distanceLine = L.polyline(
    [
        [0, 0],
        [0, 0],
    ],
    { color: 'red' }
).addTo(map);

var filterCircle = L.circle(L.latLng(40.440624, -79.995888), mapSearchRadius, {
    opacity: 0,
    weight: 1,
    fillOpacity: 0.0,
    fillColor: '#CC9933',
    color: '#AA6600',
}).addTo(map);

var nwBoundsCorner = L.latLng(40.507486, -80.063847);
var seBoundsCorner = L.latLng(40.385017, -79.837699);
var mapBounds = L.latLngBounds(nwBoundsCorner, seBoundsCorner);
var search = new L.esri.BootstrapGeocoder.search({
    inputTag: 'searchInput',
    placeholder: 'ex. Bloomfield',
    searchBounds: mapBounds
}).addTo(map);

L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    {
        attribution:
            'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    }
).addTo(map);

//SIDEBAR
var sidebar = L.control.sidebar('sidebar').addTo(map);

var results = new L.LayerGroup().addTo(map);

foodLocations.addTo(map);
