(function(module) {
  var markers = [];
  var stylesArray = [
    {
      featureType: "all",
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

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

  var marker = new google.maps.Marker({
    position: {lat: 47.618217, lng: -122.351832},
    map: map
  });

  map.requestLocation = function (address) {
    console.log('test');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyD_yMtkI6CNN6o8k1FaHEUh9jRx343nYKQ', function(data) {

      console.log(data.results[0].geometry.location);
      return data.results[0].geometry.location;
    });
    // .done(map.nearbyLocations(data.results[0].geometry.location, 1, 50));
  };

  // --------Droping Pins--------------------------
  map.fetchLocations = function (query) {
    webDB.execute(query, function(rows) {
      rows.forEach(function(row) {
        if (row.latitude != 'undefined') {
          var html = '<strong>' + row.address + '</strong> <br/>' + row.description + '<br/> <a href="/info">Save Record</a>';
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
          markers.push(marker);
        }
      });
    });
  };

  // Get the HTML input element for the autocomplete search box.
  // var input = document.getElementById('pac-input');
  //
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  //
  // //Create the autocomplete object.
  // var autocomplete = new google.maps.places.Autocomplete(input, searchOptions);

// -----------------------------------------------------------------------------
// --- all of the below is from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox#try-it-yourself
// --- changed the lat/lng
// -----------------------------------------------------------------------------
  function initAutocomplete() {
    console.log('have reached inside the google function');
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: 47.618217, lng: -122.351832},
    //   zoom: 13,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {

      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    map.nearbyLocations = function(center, radius, limit) {
      console.log(center);
      webDB.execute(
        [
          {
            'sql': 'SELECT id, (3959 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng ) - radians(-?)) + sin(radians(?)) * sin(radians(lat)))) AS distance FROM markers HAVING distance < ? ORDER BY distance LIMIT 0 , 50;',
            'data': [center.lat, center.lng, center.lat, radius]
          }
        ]
      );
    };

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log(places);
      var location = map.requestLocation(places.name);
      console.log(location);
      // map.nearbyLocations(location, 1, 50);
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

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
  };

  initAutocomplete();

  module.map = map;
})(window);
