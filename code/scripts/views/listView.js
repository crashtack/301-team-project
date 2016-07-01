//append info on 10 closest permits
(function(module) {
  var listView = {};
  listView.showTenPermits = function() {
    $('#list-container').empty();
    console.log('entering listView.showTenPermits');
    var sortedPermitArray = CurrentLocation.findDistance(theMap.lat, theMap.lng);
    if (sortedPermitArray[0].distance > sortedPermitArray[1].distance) {
      sortedPermitArray.sort(function(a,b) {
        return b.distance - a.distance;
      });
    }
    for (var i = 0; i < 10; i++) {
      $('#list-container').append(permitsCompiler(sortedPermitArray[i]));
    }

  };

  module.listView = listView;
})(window);
