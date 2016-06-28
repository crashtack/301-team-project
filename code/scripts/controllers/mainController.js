(function(module){
  var mainController = {};

  mainController.loadInitialContent = function(ctx, next) {
    Permit.createTable();
    Permit.getData();
    next();
  };

  mainController.showInitialContent = function() {
    $('#spinner-container').fadeOut();
    $('.changeable-area').hide();
    $('#search-results-container').show();
  };

  module.mainController = mainController;
})(window);
