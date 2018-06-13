/*
	Initialize Firebase Database
*/
const config = {
		apiKey: "AIzaSyBkw8JCB6ah8qlDmp7FhEC07x7Y9YSeu8Y",
		authDomain: "dpf8790.firebaseapp.com",
		databaseURL: "https://dpf8790.firebaseio.com",
		projectId: "dpf8790",
		storageBucket: "dpf8790.appspot.com",
		messagingSenderId: "783284319998"
};
firebase.initializeApp(config);

/*
	Variables
*/
var placeName;
var placeId;

/*
	Initialize Google Map
*/
function initMap() {  
  	// The map, centered at Manhattan
  const map = new google.maps.Map(document.getElementById('map'), {zoom: 11, center: {lat: 40.7831, lng: -73.9712}});

  // The marker w/ info window
  var infowindow = new google.maps.InfoWindow();
  const marker = new google.maps.Marker({map: map});

  // autocomplete search box
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'));
  autocomplete.addListener('place_changed', function() {
  	marker.setVisible(false);
  	const place = autocomplete.getPlace();
  	if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: " + place.name);
            return;
        }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
          	map.fitBounds(place.geometry.viewport);
          } else {
          	map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }

        placeName = place.name;
        placeId = place.place_id;
        placeLocation = place.geometry.location;
        placeStreet = place.address_components[1]['long_name'];

        marker.setPosition(place.geometry.location);

        google.maps.event.addListener(marker, 'click', function() {
        	infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
        	infowindow.open(map, this);
        });

        marker.setVisible(true);

    });
}

/*
	Called from 'Add to Database' button
*/
function addToDatabase() {

	if (placeId == "") {
		alert("Search for a place to add!");
	} else {
		// set data in firebase
		firebase.database().ref('locations/' + placeName + " - " + placeStreet).set({
			latitude: placeLocation.lat(),
			longitude: placeLocation.lng(),
			placeId: placeId
		});
		alert(placeName + " successfully added to database!")
	}

}
