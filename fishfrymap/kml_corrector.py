#!/usr/bin/env python
"""
Parse Google-spec KML exported from Google Maps to update address data
so that the points can be georeferenced and converted in geojson

<Placemark>
    <name>Original Oyster House</name>
    <address>geocoded</address>
    <description>...</description>
    <styleUrl>#icon-503-DB4436</styleUrl>
    <ExtendedData>
        <Data name="Address">
            <value>20 Market Square, Pittsburgh, PA 15222</value>

Requires:
xmltodict: https://github.com/martinblech/xmltodict
"""

import xmltodict, sys


in_kml = r'/home/gassc/openpgh.github.io/fishfrymap/geodata.kml'
in_kml = sys.arv[0]
out_kml = sys.arv[1]

kml_dict = xmltodict.parse(open(in_kml,'r'))
#list_placemarks = kml['kml']['Document']['Folder']['Placemark']

for e in kml_dict['kml']['Document']['Folder']['Placemark']:
    try:
        if 'address' in e.keys():
            addy = e['address']
            name = e['name']
            if addy == 'geocoded':
                new_addy = e['ExtendedData']['Data'][0]['value']
                print("FIXED: {0} is at {1}".format(name,new_addy))
                e['address'] = new_addy
            else:
                print("GOOD!: {0} is at {1}".format(name,addy))
        else:
            e['address'] = e['ExtendedData']['Data'][0]['value']
            print("FIXED: {0} is at {1}".format(e['name'],e['address']))
    except:
        print("Error with placemark {0}".format(e))