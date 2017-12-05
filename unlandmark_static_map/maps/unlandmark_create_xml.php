<?php

include ('../includes/setup.php');
$from = " FROM unlandmark.address";
$where = " where incidentdate ='" . $yesterday . "'";
$orderby = " order by current_address";
//echo $yesterday;
//echo "\n";
$SQL = 'SELECT distinct name, one_line, (select distinct landmark_type_description from unlandmark.landmark_type where p.places_type_id = landmark_type_id), a.current_address, a.lat,a.lng 
 
  FROM unlandmark.places p, unlandmark.address a, unlandmark.landmark_type lt
  where p.address_id = a.address_id 
  order by p.name;';
//echo $SQL;

$result = pg_query($dbconn, $SQL);
$count = pg_num_rows($result);
//echo "Row count is " . $count;
if ($count > 0) {

    $dom = new DOMDocument("1.0");
    $node = $dom->createElement("markers");
    $parnode = $dom->appendChild($node);
    header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
    while ($row = pg_fetch_row($result)) {

        // ADD TO XML DOCUMENT NODE
        $node1 = $dom->createElement("marker");
        $newnode = $parnode->appendChild($node1);
        $newnode->setAttribute("name", rtrim($row[0]));
        $newnode->setAttribute("desc", rtrim($row[1]));
        $newnode->setAttribute("type", rtrim($row[2]));
        $newnode->setAttribute("address", rtrim($row[3]));

        $newnode->setAttribute("lat", $row[4]);
        $newnode->setAttribute("lng", $row[5]);

        $myDescriptions = "*********************************************** <br/>";

        $node2 = $dom->createElement("descriptions");
        //$newnode = $parnode->appendChild($node);
        $newnode->setAttribute("description", $myDescriptions);
    }


    $filename = "../xml/unlandmark_data.xml";
//echo $filename;
//echo "</br>";;
    $dom->saveXML();
    echo $dom->saveXML();
    $dom->save($filename);
}

pg_close($dbconn);



