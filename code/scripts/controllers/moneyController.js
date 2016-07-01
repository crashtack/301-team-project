(function(module) {
  var moneyController = {};

  moneyController.loadValueList = function() {
    $('#show-me-the-money').fadeIn();
    moneyView.sortByValue();
  };

  module.moneyController = moneyController;
})(window);
