(function(module)  {
  var CurrentLocation = {};

  CurrentLocation.distance = function(lat1, lng1, lat2, lng2) {
    var lat1Radians = toRadians(lat1);
    var lat2Radians = toRadians(lat2);
    var deltaLatRadians = toRadians((lat2 - lat1));
    var deltaLngRadians = toRadians((lng2 - lng1));
    var R = 6371000;
    var a = Math.sin(deltaLatRadians / 2) * Math.sin(deltaLatRadians / 2) + Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(deltaLngRadians / 2) * Math.sin(deltaLngRadians / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
    return distance;
  };

  CurrentLocation.findDistance = function(userLat, userLng) {
    var distanceArray = [];
    console.log(userLat, userLng);
    distanceArray = Permit.all.map(function(cur) {
      console.log(userLat + ' ' + userLng + ' ' + cur);
      var distance = CurrentLocation.distance(userLat, userLng, cur.latitude, cur.longitude);
      cur.distance = distance;
      return cur;
    }).sort(function(a, b) {
      return a.distance - b.distance;
    });
    return distanceArray;
  };

  function toRadians(value) {
    return value * Math.PI / 180;
  };

  module.CurrentLocation = CurrentLocation;
})(window);
