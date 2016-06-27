(function(module) {

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
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });

  var marker = new google.maps.Marker({
    position: {lat: 47.618217, lng: -122.351832},
    map: map
  });

  // --------Droping Pins--------------------------
  map.fetchLocations = function () {
    webDB.execute('SELECT * FROM permitdata', function(rows) {
      rows.forEach(function(row) {
        console.log('lat= ', row.latitude);
        console.log('lon= ', row.longitude);
        var marker = new google.maps.Marker({
          position: {lat: row.latitude, lng: row.longitude},
          map: map
        });

      });

          console.log(rows);
          //callback();
    });
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

  // Get the HTML input element for the autocomplete search box.
  var input = document.getElementById('pac-input');

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  //Create the autocomplete object.
  var autocomplete = new google.maps.places.Autocomplete(input, searchOptions);

module.map = map;
})(window);
