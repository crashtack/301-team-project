(function(module) {
  permitLocations = {};

  permitLocations.permitsNearLocation = function(ctx, next) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': ctx.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var nearbyPermits = [];
        var latLng = results[0].geometry.location;
        var latLngDist = {latitude: latLng.lat(), longitude: latLng.lng(), distance: ctx.distance};
        var sortedByDistance = CurrentLocation.findDistance(latLngDist.latitude, latLngDist.longitude);
        ctx.sortedPermits = sortedByDistance;
        next();
      }
    });
  };

  permitLocations.permitsNearUser = function(ctx, next) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var userCoord = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, distance: ctx.distance};
        var sortedByDistance = CurrentLocation.findDistance(userCoord.latitude, userCoord.longitude);
        ctx.sortedPermits = sortedByDistance;
        next();
      });
    }
  };

  module.permitLocations = permitLocations;
})(window);
