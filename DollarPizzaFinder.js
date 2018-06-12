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
	Initialize Google Map
*/

function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

/*
	Called from 'Add to Database' button
*/
function addToDatabase() {
	// get place id from text box
	var placeId = document.getElementById('placeId').value;
	var placeName = document.getElementById('placeName').value;

	if (placeId == "" || placeName == "") {
		alert("Name and ID fields must both be filled.");
		return;
	}

	// get data from google geocoding
	const geocoder = new google.maps.Geocoder();
	geocoder.geocode({'placeId': placeId}, function(results, status) {
		if (status == "OK") {
			const place = results[0];

			// set data in firebase
			firebase.database().ref('locations/' + placeName).set({
				latitude: place.geometry.location.lat(),
				longitude: place.geometry.location.lng(),
				placeId: place.place_id
			});

			// confirmation message
			alert(placeName + " was successfully added to the database!");

			// clear text box
			clear();
		} else {
			alert("Google Geocoder Error: " + status);
		}
	});
}

/*
	Clears text from text boxes
*/
function clear() {
	document.getElementById('placeId').value = "";
	document.getElementById('placeName').value = "";
}
