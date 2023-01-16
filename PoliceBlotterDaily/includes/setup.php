<?php

include ('connect.php');
$timezone = "America/New_York";
date_default_timezone_set($timezone);
$seconds = 600;
set_time_limit($seconds);
$time = time();

$yesterday = date("Y-m-d", mktime(0, 0, 0, date("n", $time), date("j", $time) - 1, date("Y", $time)));

$dbconn = pg_connect('host=' . $hostname . ' port=' . $port . ' dbname=' . $database . ' user=' . $username . ' password=' . $password . ' connect_timeout=' . $connect_timeout);

