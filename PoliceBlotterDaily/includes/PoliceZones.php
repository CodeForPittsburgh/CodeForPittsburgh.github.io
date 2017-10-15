<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Include the connect.php file
include ('setup.php');


// Connect to the database
// connection String
//$dbconn = pg_connect('host=cfapghpoliceblotter.cnsbqqmktili.us-east-1.rds.amazonaws.com port=5432 dbname=CfAPGHPoliceBlotter user=cfapghpolicebltrrdr password=B10tt34RDR connect_timeout=60');
$dbconn = pg_connect('host=' . $hostname . ' port=' . $port . ' dbname=' . $database . ' user=' . $username . ' password=' . $password . ' connect_timeout=' . $connect_timeout);
/* fetch values */
//$SQL = 'select section,description from "PoliceBlotter2".description order by description';
$SQL1 = 'select distinct zone
FROM "PoliceBlotter2".incident
order by zone;';
$result1 = pg_query($dbconn, $SQL1);

StartForm1();
//BeginIncidentTable();
$count = 1;
while ($row1 = pg_fetch_row($result1)) {
    //$incidentnumber = $row[2];
    //Descriptiondata();
    //print $row[0] . ' ' . $row[1] . ' '.$row[2] . '</br>'; 
    //PopulateIncidentTable($row);
    BuildOptions1($row1);
    $count++;
}

//EndIncidentTable();
//BuildOptions();
EndForm1();

function StartForm1() {
    //echo '<p>Select an Incident Description.</p>';
    echo '<form>';
    echo '<select id="PoliceZone">';
}

function EndForm1() {
    echo ' </select>';
    echo ' ';
    //echo '<input type="submit">';
    echo '<input type="button" value="Add" onclick="AddParm(\'PoliceZone\')">';
    echo '<input type="button" value="Submit" onclick="createURLBulkCall(\'PoliceZone\')" >';
    echo ' </form>';
}

function BuildOptions1($values1) {

     echo '<option value=' . "'".$values1[0]."'" . '>' . $values1[0] . '</option>';
}

//echo json_encode($names);

/* close connection */
pg_close();



