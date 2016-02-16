# 2016 Pittsburgh Lenten Fish Fry Map

Website: https://www.facebook.com/PittsburghLentenFishFryMap/

## Data source

Data for this was collected in Google Maps. See the `_src` folder for steps used to convert geocoded-but-not-explicitly-geoattributed `kml` exported from Google Maps to useful `kml` with actual xy values.

## Dependencies

* Mapping tools from Mapbox js (which is an extension of Leaflet)
* CSS from Leaflet
* Mapbox's leaflet-ominvore for ingesting kml and returning geojson
* Leaflet Sidebar for a Leaflet-friendly sidebar.

## Map inspiration

http://gassc.github.io/pcbwmap
