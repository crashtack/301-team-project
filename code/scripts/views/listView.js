//append info on 10 closest permits
(function(module) {
  var listView = {};
  // sortedPermitArray = [];
  listView.showTenPermits = function() {
    $('#list-container').empty();
    console.log('entering listView.showTenPermits');
    var sortedPermitArray = CurrentLocation.findDistance(theMap.lat, theMap.lng);
    //console.log(sortedPermitArray);
    for (var i = 0; i < 10; i++) {
      $('#list-container').append(permitsCompiler(sortedPermitArray[i]));
    }

  };

  module.listView = listView;
})(window);
