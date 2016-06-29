//append info on 10 closest permits
(function(module) {
  var listView = {};

  listView.showTenPermits = function() {
    // for (var i = 0 ; i < 10; i++)
    $('#list-container').append(permitsCompiler());
  };

  // listView.showTenPermits();
  module.listView = listView;
})(window);
