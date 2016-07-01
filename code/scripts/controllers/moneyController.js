(function(module) {
  var moneyController = {};

  moneyController.loadValueList = function() {
    $('.changeable-area').hide();
    $('#show-me-the-money').fadeIn();
    moneyView.sortByValue();
  };

  module.moneyController = moneyController;
})(window);
