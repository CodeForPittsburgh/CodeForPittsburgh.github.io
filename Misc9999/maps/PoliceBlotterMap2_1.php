<?php
include ('../includes/setup.php');
$from = " FROM \"PoliceBlotter2\".\"Misc9999\" m ,\"PoliceBlotter2\".incident i";
$where = " where ((m.report_name = i.incidenttype) and (cast(m.ccr AS INTEGER) = i.incidentnumber))";
$orderby = "";
//print $yesterday;
//print "\n";
//  SELECT m.report_name, m.ccr, m.section, m.description, m.arrest_date, m.arrest_time, 
//       m.address, m.neighborhood, i.councildistrict, m.zone, m.age, m.sex,i.lat,i.lng
//  FROM "PoliceBlotter2"."Misc9999" m ,"PoliceBlotter2".incident i
//  where ((m.report_name = i.incidenttype) and (cast(m.ccr AS INTEGER) = i.incidentnumber))
$SQL =  'select i.lat,i.lng,m.zone, m.arrest_date, m.arrest_time, m.ccr, m.address,m.report_name,m.age, m.sex, i.councildistrict,m.description' . $from . $where . $orderby;
echo $SQL . "<br>";

$result = pg_query($dbconn, $SQL);
$count = pg_num_rows($result);
echo "Row count is " . $count . "<br>";
if ($count > 0) {

    $dom = new DOMDocument("1.0");
    $dom->formatOutput = true;
    $node = $dom->createElement("markers");
    $parnode = $dom->appendChild($node);
    header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
    while ($row = pg_fetch_row($result)) {

        // ADD TO XML DOCUMENT NODE
        $node1 = $dom->createElement("marker");
        $newnode = $parnode->appendChild($node1);


        $newnode->setAttribute("lat", $row[0]);
        $newnode->setAttribute("lng", $row[1]);
        $newnode->setAttribute("zone", rtrim($row[2]));
        $newnode->setAttribute("incidentdate", rtrim($row[3]));
        $newnode->setAttribute("incidenttime", rtrim($row[4]));
        $newnode->setAttribute("incidentnumber", rtrim($row[5]));
        $newnode->setAttribute("address", rtrim($row[6]));
        $type = rtrim($row[7]);
        if ($type == "OFFENSE 2.0") {
            $type = "OFFENSE";
        }
        $newnode->setAttribute("type", $type);
        $newnode->setAttribute("age", rtrim($row[8]));
        $newnode->setAttribute("gender", rtrim($row[9]));
        $newnode->setAttribute("councildistrict", rtrim($row[10]));
//        $newnode->setAttribute("description", rtrim($row[11]));
//        $myDescriptions = "*********************************************** <br/>";
//        $result2 = pg_query($dbconn, 'select distinct "descriptionid" from "PoliceBlotter2".incidentdescription where "incidentnumber" = \'' . $row[5] . '\'');
//        while ($descriptionid = pg_fetch_row($result2)) {
//            $result3 = pg_query($dbconn, 'select distinct "section","description" from "PoliceBlotter2".description where "descriptionid" = \'' . $descriptionid[0] . '\'');
//            while ($descriptions = pg_fetch_row($result3)) {
//                $myDescriptions = $myDescriptions . rtrim($descriptions[0]) . ", " . rtrim($descriptions[1]) . "<br/>";
//                //$node = $dom->createElement("descriptions");
//                //$newnode = $parnode->appendChild($node);
//                //$newnode->setAttribute("description", rtrim($descriptions[0]));
//            }
//        }
       $node2 = $dom->createElement("descriptions");
//        $newnode = $parnode->appendChild($node);
        $newnode->setAttribute("description", rtrim($row[11]));
    }

    pg_close($dbconn);

    $filename = "../xml/PoliceBlotterMisc9999.xml";
    //print $filename . PHP_EOL;
    //print "Saving the data document:" . PHP_EOL;
//$dom->saveXML();
//print $dom->saveXML() . PHP_EOL;
    $dom->save($filename);

    //print $yesterday . PHP_EOL;



    
}
