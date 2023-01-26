<?php

# FileName="connect.php"
#$hostname = "localhost";
#$database = "people";
#$username = "root";
#$password = "";

$remotehostname = "db-pblotter-v1-server2.cdtmqej4olqy.us-west-2.rds.amazonaws.com";
$remoteport = 5432;
$remotedatabase = "CfAPGHPoliceBlotter";
$remoteusername = "cfapghpolicebltrrdr";
$remotepassword = "B10tt34RDR";
$remoteconnect_timeout = 60;


$localdatabase = "postgres";
$localhostname = "howe-hp";
$localusername = "postgres";
$localpassword = "win95sux";
$localconnect_timeout = 60;
$localport = 5432;

//$hostname = $remotehostname;
//$port = $remoteport;
//$database = $remotedatabase;
//$username = $remoteusername;
//$password = $remotepassword;
//$connect_timeout = $remoteconnect_timeout;

$hostname = $localhostname;
$port = $localport;
$database = $localdatabase;
$username = $localusername;
$password = $localpassword;
$connect_timeout = $localconnect_timeout;

