
function updateResultsSidebar(foodLocations) {
    $('#results').empty();
    for (var i = 0; i < Object.entries(foodLocations._layers).length; i++) {
        entry = Object.entries(foodLocations._layers)[i][1].feature.properties;
        var entryDiv = $('<div class="entryDiv"></div>');
        var heading = $('<h2></h2>').text(entry.name);
        var siteTypeText = entry.type;
        if (siteTypeText != null) {
            siteTypeText =
                siteTypeText.charAt(0).toUpperCase() + siteTypeText.slice(1);
        }
        var siteType = $('<p></p>').text(siteTypeText);
        var addressText = entry.address + ', ' + entry.city + ', ' + entry.zip_code;
        var address = $('<p></p>').text(addressText);
        var googleMapsUrl =
            'https://www.google.com/maps/place/' + addressText.replace(' ', '+');
        var googleMapsLink = $('<a />', {
            name: 'link',
            href: googleMapsUrl,
            text: 'Find On Google Maps',
        });
        entryDiv.append(heading);
        entryDiv.append(siteType);
        entryDiv.append(address);
        entryDiv.append(googleMapsLink);
        entryDiv.append($('<br>'));
        if (entry.snap === true || entry.wic === true || entry.food_bucks === true || entry.fresh_produce === true || entry.fmnp === true || entry.free_distribution === true || entry.food_rx === true ) {
            var acceptsText = $('<div></div>');
            if (entry.snap === true) {
                acceptsText.append(
                    $('<span class="snap accepts_icon"></span>').text('SNAP')
                );
            }
            if (entry.wic === true) {
                acceptsText.append(
                    $('<span class="wic accepts_icon"></span>').text('WIC')
                );
            }
            if (entry.food_bucks === true) {
                acceptsText.append(
                    $('<span class="foodbucks accepts_icon"></span>').text('Food Bucks')
                );
            }
            if (entry.fresh_produce === true) {
                acceptsText.append(
                    $('<span class="freshproduce accepts_icon"></span>').text('Fresh Produce')
                );
            }
            if (entry.fmnp === true) {
                acceptsText.append($('<br>'));
                acceptsText.append(
                    $('<span class="fmnp accepts_icon"></span>').text("Farmer's Market Nutrition Program")
                );
            }
            if (entry.free_distribution === true) {
                acceptsText.append($('<br>'));
                acceptsText.append(
                    $('<span class="freedistribution accepts_icon"></span>').text("Free Distribution")
                );
            }
            if (entry.food_rx === true) {
                acceptsText.append($('<br>'));
                acceptsText.append(
                    $('<span class="foodrx accepts_icon"></span>').text("Food Rx")
                );
            }
            entryDiv.append(acceptsText);
        }

        $('#results').append(entryDiv);
    }
}