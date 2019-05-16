function CurrentYear(id) {
    var d = new Date();
    var n = d.getFullYear();
    document.getElementById(id).innerHTML = "Code For Pittsburgh © " + n;
    //document.getElementById("Disclaimer").innerHTML = "Code For Pittsburgh © " + n;
}