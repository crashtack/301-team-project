(function(module) {
  var moneyView = {};

  moneyView.sortByValue = function() {
    var sortedByValue = Permit.all.sort(function(a, b) {
      return b.value - a.value;
    });
    for (var i = 0; i < 20; i++) {
      $('#show-me-the-money').append(permitsCompiler(sortedByValue[i]));
    }
  };

  module.moneyView = moneyView;
})(window);
