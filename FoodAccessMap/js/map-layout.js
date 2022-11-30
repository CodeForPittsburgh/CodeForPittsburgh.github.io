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
var mapSearchRadius = 800;
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
    searchBounds: mapBounds,
    allowMultipleResults: false
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
var myIcon = L.icon({
  iconUrl: './images/bus.png',
  iconSize: [14, 14],
  iconAnchor: [10, 10],
  popupAnchor: [0, -28],
});
var myIcon2 = L.icon({
  iconUrl: './images/train.png',
  iconSize: [24, 24],
  iconAnchor: [10, 10],
  popupAnchor: [0, -28],
});
function onEachFeature(feature, layer) {
  if (feature.properties.Mode === 'Light Rail') {
    layer.bindPopup(
      '<span style="color:brown;"><b>' +
        feature.properties.StopName +
        ' - LINE ' +
        feature.properties.Routes_ser +
        '</b></span>'
    );
  } else {
    layer.bindPopup(
      '<span style="color:blue;"><b>' +
        feature.properties.StopName +
        ' - Bus ' +
        feature.properties.Routes_ser +
        '</b></span>'
    );
  }
}
var esri = L.esri.featureLayer({
  url: 'https://services3.arcgis.com/544gNI3xxlFIWuTc/ArcGIS/rest/services/PAAC_Stops_current_wCY19/FeatureServer/63',

  pointToLayer: function (feature, latlng) {
    if (feature.properties.Mode === 'Light Rail') {
      return L.marker(latlng, { icon: myIcon2 });
    } else {
      return L.marker(latlng, { icon: myIcon });
    }
  },
  onEachFeature: onEachFeature,
});

map.on('zoomend', function () {
  if (map.getZoom() < 17) {
    map.removeLayer(esri);
  } else {
    map.addLayer(esri);
  }
});
