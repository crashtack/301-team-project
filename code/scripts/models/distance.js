(function(module)  {
  var CurrentLocation = {};

  CurrentLocation.distance = function(lat1, lng1, lat2, lng2) {
    var lat1Radians = la1.toRadians();
    var lat2Radians = lat2.toRadians();
    var deltaLatRadians = (lat2 - lat1).toRadians();
    var deltaLngRadians = (lng2 - lng1).toRadians();
    var R = 6371000;
    var a = Math.sin(deltaLatRadians / 2) * Math.sin(deltaLatRadians / 2) + Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(deltaLngRadians / 2) * Math.sin(deltaLngRadians / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
    return distance;
  };

  CurrentLocation.findDistance = function(locationPoints, userLat, userLng) {
    var distanceArray = [];
    distanceArray = locationPoints.map(function(cur) {
      var distance = CurrentLocation.distance(userLat, userLng, cur.latitude, cur.longitude);
      cur.distance = distance;
      return cur;
    }).sort(function(a, b) {
      return a.distance - b.distance;
    });

    return distanceArray;
  };

  module.CurrentLocation = CurrentLocation;
})(window);
