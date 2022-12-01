// Listens for click on clear results button in results tab
document.getElementById('reset-radius').addEventListener('click', resetResultsRadius);
// Listens for a change in the radius slider in results tab 
document.getElementById('customRange2').addEventListener('change', parseFilter);
// Listens for click on View Tutorial button and reruns home tutorial script
document.getElementById('home-tutorial').addEventListener('click', startIntro);
// Listens for click on View Tutorial button and reruns results tutorial script
document.getElementById('results-tutorial').addEventListener('click', resultsIntro);


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
            "<a target='_blank' class='url' href='" +
            feature.properties.url +
            "'>" +
            feature.properties.url +
            '</a></p>'
          : '') +
        (feature.properties.snap === 'True' ? 'SNAP</br>' : '') +
        (feature.properties.wic ==='True' ? 'WIC</br>' : '')+
        (feature.properties.fmnp ==='True' ? 'FMNP</br>' : '') +
        (feature.properties.food_bucks ==='True' ? 'Food Bucks</br>' : '') +
        (feature.properties.fresh_produce ==='True' ? 'Fresh Produce</br>' : '')+
        (feature.properties.free_distribution ==='True' ? 'Free Distribution' : '')+
        (feature.properties.food_rx ==='True' ? 'Food Rx' : '')
    );
    layer.bindPopup(popup);
  }
}

function getFilteredLocations() {
  let filters = getFilterValues();

  return L.geoJson(points, {
    filter: function (feature) {
      let include = filters.types.includes(feature.properties.type);
      let found = false;

      // snap wic fmnp food_bucks fresh_produce free_distribution
      for (let i = 0; i < filters.services.length; i++) {
        let token = filters.services[i];
        if (feature.properties[token] === "True") {
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

// Returns an object with arrays containing the filtered types and services from the home tab
function getFilterValues() {
  let selectedTypes = [];
  $('#typeFilter input:checked').each(function () {
    selectedTypes.push($(this).attr('name'));
  });
  let selectedServices = [];
  $('#servicesFilter input:checked').each(function () {
    selectedServices.push($(this).attr('name'));
  });

  return { types: selectedTypes, services: selectedServices };
}

//Clear map of previous results and add new results in radius around selected coordinates.
function locateOnClick(latlng) {
  results.clearLayers(); //Remove previous results.
  map.panTo(latlng, { duration: 1 });
  //Set coordinates and attributes of circle within which results will be exclusively displayed
  filterCircle.setRadius(0);
  filterCircle.setLatLng(latlng);
  filterCircle.setStyle({ opacity: 0.9, fillOpacity: 0.25 });
  animateCircle();
  //Add new results in radius around selected coordinates.
  map.removeLayer(foodLocations);

  //Add locations to map that are both included in the filters and within the search radius
  let filters = getFilterValues();
  foodLocations = L.geoJson(points, {
    filter: function (feature, layer) {     
      let include = filters.types.includes(feature.properties.type);
      let found = false;
      let withinRadius = latlng.distanceTo(
        L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
      ) < mapSearchRadius;

      // snap wic fmnp food_bucks fresh_produce free_distribution
      for (let i = 0; i < filters.services.length; i++) {
        let token = filters.services[i];
        if (feature.properties[token] === "True") {
          found = true;
        }
      }

      return include && found && withinRadius;
    },        
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

  
  if (window.matchMedia('(min-width: 767px)').matches) {
    //Check local storage if search raidus intro was previously completed. If not, run it.
    if (localStorage.getItem('radius-intro-complete') != "true") {
      resultsIntro();
    }
    //Then set radius intro was completed afterward.
    localStorage.setItem('radius-intro-complete','true');
  }
};

// Hides the search radius on the map and shows all filtered locations, if in mobile will close results tab to show map
function resetResultsRadius() {
  results.clearLayers();
  map.removeLayer(foodLocations);
  filterCircle.setStyle({ opacity: 0, fillOpacity: 0 });
  parseFilter();
  document.getElementById('results').innerHTML = "";
  if (window.matchMedia('(max-width: 500px)').matches) {
    sidebar.close('resultlist');  
  };
  map.closePopup();
};

// Populates the map with only locations specified in the filters and within the search radius if radius is visible
function parseFilter() {
  //Get the current location of raidus on the map
  let latlng = filterCircle._latlng;

  //Clear foodLocations layer
  map.removeLayer(foodLocations);

  // Radius is created when map is created but is invisible. Radius is made visible on click. If radius is visible only show icons within the radius.
  if (filterCircle.options.opacity === 0) {
    foodLocations = getFilteredLocations().addTo(map);
  }else {
    locateOnClick(latlng);
  }
  map.closePopup();
};

//Toggles whether to show/hide filter panes in the home tab of sidebar
function toggleFilters() {
  if ($('#filtersPane').is(':hidden')) {
    $('#filtersPane').show();
  } else {
    $('#filtersPane').hide();
  }
};

// Resets search radius when search bar is used, will close the home tab if user is on mobile.
search.on('results', function(){
  resetResultsRadius();

  if (window.matchMedia('(max-width: 500px)').matches) {
    sidebar.close('home');  
  }
});

$.get(
  //retreive the dataset
  'https://raw.githubusercontent.com/CodeForPittsburgh/food-access-data-transformation/main/food-data/processed-datasets/merged_datasets.csv',

  function (csvString) {
    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
    }).data;

    // make a list of different location types in the dataset and alphabatize it. used to make the legend
    var locationTypes = [...new Set(data.map((item) => item.type))].sort();

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
          //capitalize first letter of each word in the location type 
          let words = locationType.split(" ");
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          };
          //insert the icon and capitalized location type in to the legend HTML
          div.innerHTML += `<i class="icon" style="background-image: url(${
            getIcon(locationType)?.options.iconUrl
          });
           background-repeat: no-repeat;"></i><span>${words.join(" ")}</span><br>`;
        }
      }
      return div;
    };
    legend.addTo(map);
  }
);

var firstUse = true;

// Toggle Change Listener, updates the map when filters are toggled
$('input:checkbox').not('#filterAllTypes,#filterAllServices').change(function () {
  parseFilter();
});

//Listens for change in toggle all in types pane and updates all types filters accordingly
$('#filterAllTypes').change(function () {
  //remove toggle event listeners so they are not triggered multiple times by the next step
  $('input:checkbox').not('#filterAllTypes,#filterAllServices').off()

  //if toggle all types is set to on turn on all of the types filters, if set to off turn off all types filters
  if ($('#filterAllTypes').prop('checked')) {
    $("#filterSupermarket,#filterConvenienceStore,#filterGrowPGHGarden,#filterFarmersMarket,#filterSummerMeals,#filterFoodBanks,#filterOther").bootstrapToggle('on');
  } else {
    $("#filterSupermarket,#filterConvenienceStore,#filterGrowPGHGarden,#filterFarmersMarket,#filterSummerMeals,#filterFoodBanks,#filterOther").bootstrapToggle('off');
  }

  parseFilter()

  //rebind the event listener for each individual toggle
  $('input:checkbox').not('#filterAllTypes,#filterAllServices').change(function () {
    parseFilter();
  });
});

//Listens for change in toggle all in services pane and updates all service filters accordingly
$('#filterAllServices').change(function () {
  //remove toggle event listeners so they are not triggered multiple times by the next step
  $('input:checkbox').not('#filterAllTypes,#filterAllServices').off()

  //if toggle all services is set to on turn on all of the service filters, if set to off turn off all service filters
  if ($('#filterAllServices').prop('checked')) {
    $("#filterSNAP,#filterWIC,#filterFMNP,#filterFoodBucks,#filterFreshProduce,#filterFreeDistribution,#filterFoodRX").bootstrapToggle('on');
  } else {
    $("#filterSNAP,#filterWIC,#filterFMNP,#filterFoodBucks,#filterFreshProduce,#filterFreeDistribution,#filterFoodRX").bootstrapToggle('off');
  }

  parseFilter()

  //rebind the event listener for each individual toggle
  $('input:checkbox').not('#filterAllTypes,#filterAllServices').change(function () {
    parseFilter();
  });
});

// Listens for clicks on map. If it is the first click popup appears explaining search radius. Otherwise will show the radius and populate locations inside raidus.
map.on('click', function (ev) {
  if (firstUse) {
    var popup = L.popup().setContent(
      'Clicking on the map will search for resources in a walkable distance. Try it!'
    );
    popup.setLatLng(ev.latlng);
    map.openPopup(popup);
    popup.popupClose = function () {
      locateOnClick(ev.latlng);
      sidebar.open('resultlist');
    };
    firstUse = false;
  }  else {
    locateOnClick(ev.latlng);
    sidebar.open('resultlist');
  }
  if (jQuery.isEmptyObject(foodLocations._layers)) {
    var popup = L.popup().setContent(
      "It looks like there aren't any locations here, try clicking a different part of the map or expanding the radius."
  );
    popup.setLatLng(ev.latlng);
    map.openPopup(popup);
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
  $('#rangeval').html((mapSearchRadius * 0.000621371).toFixed(2).toString());
  filterCircle.setRadius(mapSearchRadius);
});