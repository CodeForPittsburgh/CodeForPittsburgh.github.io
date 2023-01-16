<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Police Blotter Date</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="CodeForPittsburgh">
        <meta name="author" content="Mark Howe">
        <link rel="icon" href="../img/favicon.ico">
        <link rel="stylesheet" href="../css/bootstraporg.css">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCb3EA0lfao273s6Jkp8tfTzJfUSkswpOw&libraries=visualization"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

        <script type="text/javascript">
            function initialize() {
                alert("Initialize");
                var xml;
                var incidentdate;
                var markers;
                downloadUrl("xml/PoliceBlotterDate.xml", function (data) {
                    xml = data.responseXML;

                    markers = xml.documentElement.getElementsByTagName("incidentdates");

                    incidentdate = markers[0].getAttribute("incidentdate");

                }
                );
                alert("markers" + markers);
            }
            function downloadUrl(url, callback) {
                alert(url);
                var request = window.ActiveXObject ?
                        new ActiveXObject('Microsoft.XMLHTTP') :
                        new XMLHttpRequest;

                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        request.onreadystatechange = doNothing;
                        callback(request, request.status);
                    }
                };

                request.open('GET', url, true);
                //request.setRequestHeader();
                request.send(null);
                alert("End of download URL");
            }
            function CurrentYear(id) {
                var d = new Date();
                var n = d.getFullYear();
                document.getElementById(id).innerHTML = "Code For Pittsburgh © " + n;
                //document.getElementById("Disclaimer").innerHTML = "Code For Pittsburgh © " + n;
            }
            function doNothing() {
            }

            google.maps.event.addDomListener(window, 'load', initialize);
        </script>

    </head>
    <body>

        <div class="container">
            <div class="jumbotron">
                <h2 class="text-center">Pittsburgh Police Daily Blotter <BR> for TBD</h2>
                <h5 id="demo" class="text-center">
                    <script>
                        CurrentYear("demo");
                    </script>
                </h5>
            </div>

        </div>


    </body>
</html>



