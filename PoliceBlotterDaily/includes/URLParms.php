<?php

$time = time();
$neighborhood = "neighborhood";
$councildistrict = "CouncilDistrict";
$policezone = "PoliceZone";
$section = "section";
$mindate = "mindate";
$maxdate = "maxdate";
$startdate = "";
$enddate = "";
$snl = 0;
$description = "";
$incidentdate = "incidentdate";
$address = "address";
$maptype = "maptype";
$column = "column";


$yesterday = date("Y-m-d", mktime(0, 0, 0, date("n", $time), date("j", $time) - 1, date("Y", $time)));


$type = "BOTH";
$my_neighborhood = filter_input(INPUT_GET, $neighborhood, FILTER_SANITIZE_STRING);
$my_councildistrict = filter_input(INPUT_GET, $councildistrict, FILTER_SANITIZE_STRING);
$my_policezone = filter_input(INPUT_GET, $policezone, FILTER_SANITIZE_STRING);
$my_mindate = filter_input(INPUT_GET, $mindate, FILTER_SANITIZE_STRING);
$my_maxdate = filter_input(INPUT_GET, $maxdate, FILTER_SANITIZE_STRING);
$my_section = filter_input(INPUT_GET, $section, FILTER_SANITIZE_STRING);
$my_incidentdate = filter_input(INPUT_GET, $incidentdate, FILTER_SANITIZE_STRING);
$my_address = filter_input(INPUT_GET, $address, FILTER_SANITIZE_STRING);
$my_maptype = filter_input(INPUT_GET, $maptype, FILTER_SANITIZE_STRING);
$sql_column = filter_input(INPUT_GET, $column, FILTER_SANITIZE_STRING);