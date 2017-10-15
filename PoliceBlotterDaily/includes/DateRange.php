<?php

// Include the connect.php file
include ('setup.php');

// Connect to the database
// connection String
//$dbconn = pg_connect('host=cfapghpoliceblotter.cnsbqqmktili.us-east-1.rds.amazonaws.com port=5432 dbname=CfAPGHPoliceBlotter user=cfapghpolicebltrrdr password=B10tt34RDR connect_timeout=60');
$dbconn = pg_connect('host=' . $hostname . ' port=' . $port . ' dbname=' .$database . ' user='. $username . ' password='. $password .' connect_timeout=' . $connect_timeout);
/* fetch values */

$sql = 'select min(incidentdate) mindate,max(incidentdate)maxdate
from "PoliceBlotter2".incidentdescription';
$result = pg_query($dbconn, $sql);

while ($row = pg_fetch_row($result)) {
    //print $row[0] . ' ' . $row[1] . ' '.$row[2] . '</br>';
    $names[] = array(
        'MinDate' => $row[0],
        'MaxDate' => $row[1]
        
    );
}
echo json_encode($names);


/* close connection */
pg_close();


