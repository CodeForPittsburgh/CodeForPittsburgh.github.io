<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$time = time();
$yesterday = date("Y-m-d", mktime(0, 0, 0, date("n", $time), date("j", $time) - 1, date("Y", $time)));
echo $yesterday;
echo "</br>";


$filename = "xml/PoliceBlotterDate.xml";
echo $filename;
echo "</br>";


$doc = new DOMDocument('1.0');
// we want a nice output
$doc->formatOutput = true;

$root = $doc->createElement('incidentdates');
$myroot = $doc->appendChild($root);

$title = $doc->createElement('incidentdate');
$mytitle = $root->appendChild($title);

$text = $doc->createTextNode($yesterday);
$mytext = $title->appendChild($text);

echo "Saving all the document:" . "<BR>";
echo $doc->saveXML() . "<BR>";

//echo "Saving only the title part:\n";
//echo $doc->saveXML($title);

$doc->save($filename);
