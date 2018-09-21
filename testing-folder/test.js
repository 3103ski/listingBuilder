/* This showResult function is used as the callback function*/

function showResult(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    document.getElementById('longitude').value = result.geometry.location.lng();

    var inputLat, inputLong;

    inputLat = result.geometry.location.lat();
    inputLong = result.geometry.location.lng();

    initMap(inputLat, inputLong);

    // return inputLat, inputLong;


}

function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

var button = document.getElementById('btn');

button.addEventListener("click", function() {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(showResult, address);
});




// Initialize and add the map
function initMap(lat, lng) {
    // The location of Uluru
    var uluru = {
        // lat: 47.2981173,
        // lng: -122.3882006
        lat: parseInt(lat),
        lng: parseInt(lng)
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 8,
            center: uluru
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}