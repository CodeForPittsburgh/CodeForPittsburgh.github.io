<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 * 
 * /*
 * SELECT council, councilman
  FROM "PoliceBlotter2".testdistrict3
  order by council;
 */ 

// Include the connect.php file
include ('setup.php');


// Connect to the database
// connection String
//$dbconn = pg_connect('host=cfapghpoliceblotter.cnsbqqmktili.us-east-1.rds.amazonaws.com port=5432 dbname=CfAPGHPoliceBlotter user=cfapghpolicebltrrdr password=B10tt34RDR connect_timeout=60');
$dbconn = pg_connect('host=' . $hostname . ' port=' . $port . ' dbname=' . $database . ' user=' . $username . ' password=' . $password . ' connect_timeout=' . $connect_timeout);
/* fetch values */
//$SQL = 'select section,description from "PoliceBlotter2".description order by description';
$SQL = 'SELECT council, councilman FROM "PoliceBlotter2".testdistrict3 order by council';
$result = pg_query($dbconn, $SQL);

StartForm3();
//BeginIncidentTable();
$count = 1;
while ($row = pg_fetch_row($result)) {
    //$incidentnumber = $row[2];
    //Descriptiondata();
    //print $row[0] . ' ' . $row[1] . ' '.$row[2] . '</br>'; 
    //PopulateIncidentTable($row);
    BuildOptions3($row);
    $count++;
}

//EndIncidentTable();
//BuildOptions();
EndForm3();

function StartForm3() {
    //echo '<p>Select an Incident Description.</p>';
    echo '<form>';
    echo '<select id="CouncilDistrict">';
}

function EndForm3() {
    echo ' </select>';
    echo ' ';
    //echo '<input type="submit">';
    echo '<input type="button" value="Add" onclick="AddParm(\'CouncilDistrict\')">';
    echo '<input type="button" value="Submit" onclick="createURLBulkCall(\'CouncilDistrict\')" >';
    echo ' </form>';
}

function BuildOptions3($values) {

    echo '<option value=' . $values[0] . '>' . $values[0] . " " .$values[1] . '</option>';
}

//echo json_encode($names);

/* close connection */
pg_close();



