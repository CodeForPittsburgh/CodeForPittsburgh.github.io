# Pittsburgh Food Access Map

Made by Code for Pittsburgh in collaboration with the <a href="https://www.pittsburghfoodpolicy.org" target="_blank">Pittsburgh Food Policy Council</a>

The live map can be viewed here: https://codeforpittsburgh.github.io/FoodAccessMap/

## What is the Pittsburgh Food Access Map?

The Map visually displays data about food resources in the Pittsbugh area.
The goal is to address food insecurity by allowing individuals to access the app and find food resources in their area.

## How does the map work?

There are two main components to the map, a <a href="https://github.com/CodeForPittsburgh/food-access-data-transformation" target="_blank">back end</a>
where the data about the food resources is aggregated and and a <a href="https://codeforpittsburgh.github.io/FoodAccessMap/" target="_blank">client side web app</a> where users can access the map.
The client side is built using <a href="https://leafletjs.com/index.html" target="_blank">Leaftlet</a> and <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>. The tutorial popups are created using <a href="https://introjs.com/docs" target="_blank">Intro.js</a>.

The client requests the data from the back end in the form of an NDJSON file which is then parsed into an 
array of objects with each object representing a physical location. Each location is then added to the map as a <a href="https://leafletjs.com/examples/geojson/" target="_blank">GeoJSON</a> object using Leaflet. 

## Adding new categories for location types and services

Users can filter the map by location type and services offered in the home tab. To add a new location type or service to map the back end must first be updated to add the new type to the dataset.

Each location object in the dataset has a property for each of the possible services offered and a type property that describes its location type.

### Logging location objects

You can console log the entire array of location objects from the script.js file in order to get a better idea of their structure.

```javascript
  $.get(
    //retreive the ndjson dataset
    'https://raw.githubusercontent.com/CodeForPittsburgh/food-access-data-transformation/main/food-data/processed-datasets/merged_datasets.ndjson',

    //pass the retreived dataset into a function to handle initial map population
    function (ndjson) {
      //convert NDJSON to array of objects
      const data = ndjson.split('\n').map(obj => JSON.parse(obj))
      console.log(data)
```


### 1) Update the HTML

- Copy the code below and add after other toggles in the Home Tab Filters section. Change the id and name attributes and text content to match the new location or service type. 

```
<div class="row">
  <div class="col-md-12">
    <label class="checkbox-inline togglepad">
      <input type="checkbox" id="filterSupermarket" name="supermarket" checked="checked" data-toggle="toggle">Supermarket
    </label>
  </div>
</div>

```
- Update the form on the info tab. Add a new option to the drop down if adding a new location type and add a new fieldset to the radio buttons if adding a new service.

### 2) Update the script.js

- Add the new service or type to the toggle all event listener.

- If adding a service add a feature property for that service to the onEachFeature function.

### 3) Update the sidebar-update.js

- If adding a new service type, add condition to check for new service and then append that service to the updateResultsSidebar function.

### 4) Add new Icon to food_icons.js file
- If adding a new location type, the url for the icon needs to be added as a variable and the getIcon function needs to be updated to add the icon to the new location type.

### 5) Update style.css
- Each service has a background color associated with it for when it is displayed in the results tab.
- Current colors were chosen with consideration for colorblindness using <a href="https://www.nature.com/articles/nmeth.1618" target="_blank">this</a> article written by Bang Wong.
- Please also consider the contrast between the background and the text using the <a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAim Contrast Checker</a>.

### Current services

- snap
- wic
- fmnp
- food_bucks
- fresh_produce
- free_distribution
- food_rx

### Current Location Types

- "supermarket"
- "convenience store"
- "grow pgh garden"
- "farmer's market"
- "summer meal site"
- "food bank site"

## Issues and contributing
The <a href="https://github.com/CodeForPittsburgh/food-access-data-transformation/issues" target="_blank">issues</a> for the entire project are located in the back end repo. If you find any bugs or have any ideas for how to improve the project please add an issue.