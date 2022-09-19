document.querySelector('#reset-radius').addEventListener('click', resetResultsRadius)

$(document).ready(function () {
  if (window.matchMedia('(max-width: 767px)').matches) {
    // The viewport is less than 768 pixels wide
    console.log('This is a mobile device.');
  } else {
    // The viewport is at least 768 pixels wide
    console.log('This is a tablet or desktop.');
    //Check local storage if intro was previously completed. If not, run it.
    if (localStorage.getItem('intro-complete') != "true") {
      startIntro();
    }
    //Then set intro was being complete afterward.
    localStorage.setItem('intro-complete','true');
  }
});

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.name) {
    //Set description for feature
    var description =
      !feature.properties.location_description ||
      feature.properties.location_description == 'other'
        ? ''
        : feature.properties.location_description;

    //Set popup content for feature
    var popup = L.popup().setContent(
      "<div class='sourceOrg'>" +
        feature.properties.source_org +
        '</div>' +
        "<div class='featureName'>" +
        feature.properties.name +
        '</div>' +
        "<div class='descriptionTitle'><div>" +
        "<div class='locationDescription'>" +
        description +
        '</div>' +
        "<div class='locationAddress'>" +
        feature.properties.address +
        '<br>' +
        feature.properties.city +
        ', ' +
        feature.properties.state +
        ' ' +
        feature.properties.zip_code +
        "<br><a target='_blank' href='https://www.google.com/maps/dir//" +
        feature.properties.address +
        ' ' +
        feature.properties.city +
        ', ' +
        feature.properties.state +
        ' ' +
        feature.properties.zip_code +
        "'>Google Map Directions</a></div>" +
        (feature.properties.phone
          ? '<p><b>Phone: </b>' + feature.properties.phone + '</p>'
          : '') +
        (feature.properties.url
          ? '<p><b>Website: </b>' +
            "<a target='_blank' href='" +
            feature.properties.url +
            "'>" +
            feature.properties.url +
            '</a></p>'
          : '') +
        (feature.properties.FNMP != 'NA' ? 'FMNP</br>' : '') +
        (feature.properties.SNAP != 'NA' ? 'SNAP</br>' : '') +
        (feature.properties.food_bucks == '1' ? 'Food Bucks</br>' : '') +
        (feature.properties.fresh_produce != 'NA' ? 'Fresh Produce' : '')
    );
    layer.bindPopup(popup);
  }
}

function getFilteredLocations(filters) {
  return L.geoJson(points, {
    filter: function (feature, layer) {
      let include = filters.types.includes(feature.properties.type);
      let found = false;

      // SNAP WIC FMNP food_bucks fresh_produce free_distribution
      for (let i = 0; i < filters.services.length; i++) {
        let token = filters.services[i];
        if (feature.properties[token] == 1) {
          found = true;
        }
      }

      return include && found;
    },
    onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        ...geojsonMarkerOptions,
        icon: getIcon(feature.properties.type),
      });
    },
  });
};

//Animates expanding circle for search functionality.
function animateCircle() {
  var _animCircleRadius = 0;
  var endpoints = [filterCircle.getLatLng(), filterCircle.getLatLng()];
  let timer = setInterval(function () {
    _animCircleRadius += 50;
    if (_animCircleRadius >= mapSearchRadius) {
      clearInterval(timer);
    } else {
      endpoints[1][0] += 0.01;
      map.removeLayer(distanceLine);
      filterCircle.setRadius(_animCircleRadius);
    }
  }, 20);
};


//Clear map of previous results and add new results in radius around selected coordinates.
function locateOnClick (latlng) {
  results.clearLayers(); //Remove previous results.
  map.panTo(latlng, { duration: 1 });
  //Set coordinates and attributes of circle within which results will be exclusively displayed
  filterCircle.setRadius(0);
  filterCircle.setLatLng(latlng);
  filterCircle.setStyle({ opacity: 0.9, fillOpacity: 0.25 });
  animateCircle();
  //Add new results in radius around selected coordinates.
  map.removeLayer(foodLocations);
  foodLocations = L.geoJson(points, {
    filter: (x) =>
        latlng.distanceTo(
            L.latLng(x.geometry.coordinates[1], x.geometry.coordinates[0])
        ) < mapSearchRadius,
    onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        ...geojsonMarkerOptions,
        icon: getIcon(feature.properties.type),
        fillColor: '#28cc00',
        opacity: 0.4,
      });
    },
  }).addTo(map);

  // Add search locations to sidebar
  updateResultsSidebar(foodLocations);
  results.addLayer(L.marker(latlng));
};

function resetResultsRadius() {
  results.clearLayers()
  map.removeLayer(foodLocations)
  filterCircle.setRadius(0)
  filterCircle.setStyle({ opacity: 0, fillOpacity: 0 })
  parseFilter()
  updateResultsSidebar()
}

function parseFilter() {
  var selectedTypes = [];
  $('#typeFilter input:checked').each(function () {
    selectedTypes.push($(this).attr('name'));
  });
  var selectedServices = [];
  $('#servicesFilter input:checked').each(function () {
    selectedServices.push($(this).attr('name'));
  });

  //Update foodLocations layer
  map.removeLayer(foodLocations);
  foodLocations = getFilteredLocations({ types: selectedTypes, services: selectedServices }).addTo(map);
};

//Toggles whether to show/hide filter panes in the search tab of sidebar
function toggleFilters() {
  if ($('#filtersPane').is(':hidden')) {
    $('#filtersPane').show();
  } else {
    $('#filtersPane').hide();
  }
};

$.get(
  'https://raw.githubusercontent.com/CodeForPittsburgh/food-access-map-data/master/food-data/processed-datasets/merged_datasets.csv',
  function (csvString) {
    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
    }).data;

    var locationTypes = [...new Set(data.map((item) => item.type))];

    //Populate each row with data from csv
    for (var i in data) {
      var row = data[i];
      points.push({
        type: 'Feature',
        properties: {
          ...row,
        },
        geometry: {
          type: 'Point',
          coordinates: [row.longitude || 0, row.latitude || 0],
        },
      });
    }

    // initial map population
    parseFilter();

    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = (map) => {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += '<h4>Legend</h4>';
      for (var locationType of locationTypes) {
        if (locationType) {
          div.innerHTML += `<i class="icon" style="background-image: url(${
            getIcon(locationType)?.options.iconUrl
          });
           background-repeat: no-repeat;"></i><span>${locationType}</span><br>`;
        }
      }
      return div;
    };
    legend.addTo(map);
  }
);

var firstUse = true;

// Toggle Change Listener
$('input:checkbox').change(function () {
  parseFilter();
});

map.on('click', function (ev) {
  if (firstUse) {
    var popup = L.popup().setContent(
      'Clicking in the map will search for resources in a walkable distance. Try it!'
    );
    popup.setLatLng(ev.latlng);
    map.openPopup(popup);
    popup.popupClose = function () {
      locateOnClick(ev.latlng);
      sidebar.open('resultlist');
    };
    firstUse = false;
  } else {
    locateOnClick(ev.latlng);
    sidebar.open('resultlist');
  }

});

setTimeout(function () {
  $('.pointer').fadeOut('slow');
}, 3400);
setTimeout(function () {
  sidebar.open('home');
}, 500);

$("#customRange2").on('input propertychange', function (e) {
  mapSearchRadius = $(this).val();
  $('#rangeval').html(mapSearchRadius);
  filterCircle.setRadius(mapSearchRadius);
});

