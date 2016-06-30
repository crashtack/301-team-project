(function(module) {
  var theMap = {};
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
      elementType: "geometry",
      stylers: [
        { hue: "#ff00b2" },
        { visibility: "simplified" },
        { saturation: -100 },
        { gamma: 0.63 }
      ]
    },{
      featureType: "administrative",
      stylers: [
        { gamma: 1 },
        { saturation: -100 },
        { hue: "#dd00ff" }
      ]
    },{
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
    ]
  }
  ];

  var location = {};

  // --------------------------------------------------------------
  // Getting Users current broweser geolocation
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var mapOptions = {
    zoom: 15,
    styles: stylesArray,
    center: new google.maps.LatLng(47.5305046,-122.4032917),
    function() {
      console.log('inside mapOptions: ', center);
    },
    mapTypeID: google.maps.MapTypeId.STREET,
    zoomControl: true,
    ZoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    // moving mapTypeControl
    mapTypeControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DEFAULT,
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.TERRAIN,
        google.maps.MapTypeId.SATELLITE
      ]
    }
  };

// -----------------------------------------------------------------------------
// --- all of the below is from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox#try-it-yourself
// --- changed the lat/lng
// -----------------------------------------------------------------------------
  theMap.initAutocomplete = function () {
    console.log('inside theMap.initAutocomplete function');
    searchBoxOptions = {
      bounds: defaultBounds,
      types: ['address']
    }
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    //console.log('map: ', map);
    //console.log('map.controls: ' + google.maps.ControlPosition.TOP_LEFT);
    //console.log('map.controls: ' + map.controls);
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
      sortedByDistancePermits = theMap.requestLocation(places[0].name);

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
  };

  //navigator.geolocation.getCurrentPosition(success, error, options);
  // ----------------------------------

  theMap.getGeolocation =  function(next) {
    console.log('inside theMap.getGeolocation');

    function success(pos) {
      console.log('entering map.success');
      var crd = pos.coords;
      location = {lat:crd.latitude, lng:crd.longitude};
      console.log('map.success:', location);
      mapOptions.center = new google.maps.LatLng(location.lat, location.lng);
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      createMap(next);

    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      location = {lat:47.5305046, lng:-122.4032917};
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      createMap(next);
      //createMap();
      //map.initAutocomplete;
    };


    navigator.geolocation.getCurrentPosition(success, error, options);
    // createMap(next);
    // next();
  };

  function createMap(next) {
    console.log('inside map.createMap');
    //map = new google.maps.Map(document.getElementById('map'), mapOptions);
    console.log('creating map: ', map);
    next();
    theMap.initAutocomplete();
  };

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

  theMap.requestLocation = function (address) {
    console.log('entering theMap.requestLocation');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyD_yMtkI6CNN6o8k1FaHEUh9jRx343nYKQ', function(data) {
      // On pause until we decide how to use distance
      // return CurrentLocation.findDistance(Permit.all, data.results[0].geometry.lat, data.results[0].geometry.lng);
    });
  };



  // --------Droping Pins--------------------------
  theMap.dropAllPins = function (rows, next) {
    console.log('theMap.dropAllPins row is an: ' + typeof(rows));
    console.log('inside theMap.dropAllPins: ' + map);
    rows.forEach(function(row) {
      if (row.latitude != 'undefined') {
        // console.log(row.id);
        var html = '<strong>' + row.address + '</strong> <br/>' + row.description + '<br/> Status: ' + row.status + '<br /> <a href="/info/' + row.id + '">See more &raquo;</a>';
        var marker = new google.maps.Marker({
          position: {lat: row.latitude, lng: row.longitude},
          animation: google.maps.Animation.DROP,
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



  module.theMap = theMap;
})(window);
