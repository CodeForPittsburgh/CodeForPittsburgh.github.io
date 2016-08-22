var map = (function() {
	'use strict';

	var map_start_location = [40.4416812, -80.008314, 16];

	/*** URL parsing ***/

	// leaflet-style URL hash pattern:
	// ?style.yaml#[zoom],[lat],[lng]
	var url_hash = window.location.hash.slice(1).split('/');
	if (url_hash.length == 3) {
		map_start_location = [url_hash[1], url_hash[2], url_hash[0]];
		// convert from strings
		map_start_location = map_start_location.map(Number);
	}

	var style_file = 'assets/tanagram/styles/matrix.yaml';
	var info_file = '';
	var url_search = window.location.search.slice(1);
	if (url_search.length > 0) {
		var ext = url_search.substr(url_search.lastIndexOf('.') + 1);
		if (ext == "yaml" || ext == "yaml/") {
			style_file = url_search;
		} else {
			style_file = url_search + '.yaml';
		}
	}

	/*** Map ***/
	var map = L.map('map', {
		maxZoom: 20,
		trackResize: true,
		keyboard: false,
		zoomControl:false
	});

	var layer = Tangram.leafletLayer({
		scene: style_file,
		attribution: '| &copy; OSM contributors | <a href="https://mapzen.com/tangram" target="_blank">Tangram<\/a> | <a href="https://twitter.com/patriciogv" target="_blank">@patriciogv<\/a>'
	});

	window.layer = layer;
	var scene = layer.scene;
	window.scene = scene;

	map.setView(map_start_location.slice(0, 2), map_start_location[2]);
	var hash = new L.Hash(map);

	// Resize map to window

	function resizeMap() {
		document.getElementById('map').style.width = window.innerWidth + 'px';
		document.getElementById('map').style.height = window.innerHeight + 'px';
		map.invalidateSize(false);
	}

	window.addEventListener('resize', resizeMap);
	resizeMap();

	window.addEventListener('load', function() {
		// Scene initialized
		layer.addTo(map);
	});

	//disable mousewheel zoom if iframed
	if (window.self !== window.top) {
		map.scrollWheelZoom.disable();
	}
	return map;
}());
