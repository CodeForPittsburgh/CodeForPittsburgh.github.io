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

Improvements to make:
- Ensure unicode is being handled appropriately
- Ensure <![CDATA ]]> under the description tag is preserved during file.write() function
- Automatically handle differences between Google's KML structures (e.g., some 
methods of export insert an additional 'Folder' hierarchy above 'Document')
"""
import xmltodict, sys

# test inputs
#in_kml = r'/home/gassc/openpgh.github.io/fishfrymap/geodata.kml'
#out_kml = r'/home/gassc/openpgh.github.io/fishfrymap/geodata_fixed.kml'

#inputs
in_kml = sys.argv[1]
out_kml = sys.argv[2]

print in_kml, out_kml

#open the kml as a python file object (read/write mode)
in_kml_file = open(in_kml,'r')
# use xmltodict to parse an opened kml file into a python dictionary
kml_dict = xmltodict.parse(in_kml_file)
in_kml_file.close()

# depending on how the data was downloaded from Google, it may
# have an extra nesting:
try:
    placemarks = kml_dict['kml']['Document']['Placemark']
except:
    placemarks = kml_dict['kml']['Document']['Folder']['Placemark']

# print the number of markers to be analyzed
marker_count = len(placemarks)
print("Analyzing {0} kml placemarks".format(marker_count))

# for each placemark:
#for e in kml_dict['kml']['Document']['Placemark']:
for e in placemarks:
    try:
        #check if address key exists
        if 'address' in e.keys():
            addy = unicode(e['address'])
            #if the address value == 'geocoded':
            if addy == unicode('geocoded'):
                #get the address string from within the extended data attributes
                new_addy = unicode(e['ExtendedData']['Data'][0]['value'])
                #write that string value to the address key
                e['address'] = new_addy
            else:
                pass
        # if the address key doesn't exists
        else:
            # add address key and populate with address
            e['address'] = unicode(e['ExtendedData']['Data'][0]['value'])
    except:
        print(unicode("Error with placemark {0}".format(e)))

kml_fixed = xmltodict.unparse(kml_dict)
out_kml_file = open(out_kml,'w')
out_kml_file.write(kml_fixed.encode('utf8'))
out_kml_file.close()

"""
this script strips and CDATA markers used in description field.
Need to make sure those are not removed, or add them back in:
change '<description> to '<description><![CDATA['
change '</description>' to ']]></description>'
..in out_kml
"""