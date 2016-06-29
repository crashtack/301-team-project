(function(module) {
  var markers = [];
  var stylesArray = [
    {
      featureType: "water",
      stylers: [
        { gamma: 0.56 },
        { hue: "#004cff" }
      ]
    },{
      featureType: "poi",
      stylers: [
        { saturation: -2 },
        { hue: "#1aff00" },
        { gamma: 0.54 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "landscape",
      stylers: [
        { hue: "#ff00cc" },
        { saturation: 59 },
        { color: "#e6e6e6" }
      ]
    },{
      featureType: "administrative",
      stylers: [
        { gamma: 1 },
        { saturation: -100 },
        { hue: "#dd00ff" }
      ]
    }
  ];

  // ORIGINAL MAP STYLE
  // var stylesArray = [
  //   {
  //     featureType: "all",
  //     stylers: [
  //       { hue: "#00ffe6" },
  //       { saturation: -20 }
  //     ]
  //   },
  //   {
  //     featureType: "road",
  //     elementType: "geometry",
  //     stylers: [
  //       { lightness: 100 },
  //       { visibility: "simplified" }
  //     ]
  //   },
  //   {
  //     featureType: "road",
  //     elementType: "labels",
  //     stylers: [
  //       { visibility: "off" }
  //     ]
  //   }
  // ];

  var mapOptions = {
    zoom: 15,
    styles: stylesArray,
    center: new google.maps.LatLng(47.618217, -122.351832),
    mapTypeID: google.maps.MapTypeId.STREET,
    zoomControl: true,
    ZoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // -----------------------------------------------
  // Adding code for Address Search Bar
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(47.000000, -123.000000),
    new google.maps.LatLng(48.000000, -124.000000)
  );

  var searchOptions = {
    bounds: defaultBounds
  };

  infoWindow = new google.maps.InfoWindow({maxWidth: 150});

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });

  // var marker = new google.maps.Marker({
  //   position: {lat: 47.618217, lng: -122.351832},
  //   map: map
  // });

  map.requestLocation = function (address) {
    console.log('entering map.requestLocation');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyD_yMtkI6CNN6o8k1FaHEUh9jRx343nYKQ', function(data) {
      // On pause until we decide how to use distance
      // return CurrentLocation.findDistance(Permit.all, data.results[0].geometry.lat, data.results[0].geometry.lng);
    });
  };

  // --------Droping Pins--------------------------
  map.dropAllPins = function (rows, next) {
    console.log('map.dropAllPins row is an: ' + typeof(rows));
    //debugger;
    rows.forEach(function(row) {
      if (row.latitude != 'undefined') {
        // console.log(row.id);
        var html = '<strong>' + row.address + '</strong> <br/>' + row.description + '<br/> Status: ' + row.status + ' <a href="/info/' + row.id + '">See more</a>';
        var marker = new google.maps.Marker({
          position: {lat: row.latitude, lng: row.longitude},
          map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          }
        });
        google.maps.event.addListener(map, 'click', function() {
          if (infoWindow.getMap()) {
            infoWindow.close();
          };
        });
        markers.push(marker); //pushes pins to marker, markers is not being uesed, remove
      }
    });
    next();
  };

  // Get the HTML input element for the autocomplete search box.
  // var input = document.getElementById('pac-input');
  //
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  //hOptions);

// -----------------------------------------------------------------------------
// --- all of the below is from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox#try-it-yourself
// --- changed the lat/lng
// -----------------------------------------------------------------------------
  map.initAutocomplete = function () {
    console.log('have reached inside the map.initAutocomplete function');


    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log('places: ' + places);
      sortedByDistancePermits = map.requestLocation(places[0].name);

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
    map.fitBounds(bounds);
    map.setZoom(15);
    });

  }




  module.map = map;
})(window);
