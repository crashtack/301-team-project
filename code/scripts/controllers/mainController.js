(function(module){

  var mainController = {};

  mainController.loadInitialContent = function(ctx, next) {
    console.log('inside loadInitialContent');
    $('.changeable-area').hide();
    $('#spinner-container').show();
    theMap.getGeolocation(Permit.createTable);
  };

  mainController.showInitialContent = function() {
    console.log('inside showInitialContent');
    $('#spinner-container').fadeOut();
    $('#search-results-container').show();
    page('/list');
  };

  module.mainController = mainController;
})(window);
