# SQLCrashData
## Maps and data for Bike Crashes
Code for Pittsburgh is working on displaying crash data

Started by Mark Howe @mhowe0422 with @bikepgh

Data is from 

https://data.wprdc.org/dataset/allegheny-county-crash-data

and uses only Bike Crash information

This is a work in progress.

http://codeforpittsburgh.github.io/BikeCrashMap/

With a heat map at

http://codeforpittsburgh.github.io/CrashHeatMap/

Bike rental locations from

https://healthyridepgh.com/data


## Change requests

1) Display by year

2) Display by severity

3) Better GUI

4) Like to merge the county and city json shape data to allow the city neighborhoods to work during the mouse roll-over.

5) Handle adding/removing layers (bike,county,city neighborhoods... etc)


## Application notes

These maps are based on the Google Map API

The current API key is registered to mhowe so if you clone/copy the code please use
your own API key.

The code is split out to html (View) and the code for the javascript (Model and Controller) in a seperate file.

The main map display is index.php and based on bootstrap.js.

Used fixed xml file for the data that has the addresses already geo-coded

~~There are a number of bak named files. They will be cleaned up shortly.~~

## Change list

Removed color for maps. It was difficult to determine the bike map layer colors

Removed the City Neighborhood layer until I can get the mouse over to display neighborhood name

Added bike rental location with bike icon and click gets location and rack count

I know we don't control the bike layer line colors, but as a color-blind person I can't tell my dark green, green and brown lines


