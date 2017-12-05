<?php

// Include the connect.php file
include ('setup.php');


// Connect to the database
// connection String
//$dbconn = pg_connect('host=cfapghpoliceblotter.cnsbqqmktili.us-east-1.rds.amazonaws.com port=5432 dbname=CfAPGHPoliceBlotter user=cfapghpolicebltrrdr password=B10tt34RDR connect_timeout=60');
$dbconn = pg_connect('host=' . $hostname . ' port=' . $port . ' dbname=' . $database . ' user=' . $username . ' password=' . $password . ' connect_timeout=' . $connect_timeout);
/* fetch values */
//$SQL = 'select section,description from "PoliceBlotter2".description order by description';
$SQL = 'select d.description, count(d.description) as descriptioncount
from "PoliceBlotter2".incident i, "PoliceBlotter2".description d
where incidentdate = \'' . $yesterday . '\' and i.descriptionid = d.descriptionid
group by d.description
order by count(d.description) desc';
$names = array(
    "Description",
    "Count"
);

$count = 1;
$result = pg_query($dbconn, $SQL);
BeginTable($names,$yesterday);
while ($row = pg_fetch_row($result)) {
    PopulateTable($row);
    //$incidentnumber = $row[2];
    //Descriptiondata();
    //print $row[0] . ' ' . $row[1] . ' '.$row[2] . '</br>'; 
    //PopulateIncidentTable($row);
    
    $count++;
}
EndTable();

function BeginTable($names,$description) {


    echo "<table class='sortable' align='center' cellpadding='5' border=1>";
    echo "<caption> $description </caption>";
    echo "<tr>";
    foreach ($names as $heading) {
        echo "<th>$heading</th>";
    }
    echo "</tr>";
}

function PopulateTable($values) {
    /* Populate table with results. */
    echo "<tr>";
    foreach ($values as $value) {

        echo "<td>$value</td>";
    }
    echo "</tr>";
}

function EndTable() {
    echo "</table><br/>";
}

pg_close();

