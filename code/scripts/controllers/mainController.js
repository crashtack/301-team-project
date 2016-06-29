(function(module){

  var mainController = {};

  // mainController.loadInitialContent = function(ctx, next) { // are we using this 'next'?
  mainController.loadInitialContent = function(ctx) {
    $('#list-container').fadeOut(); // do we need this?
    $('#welcome-text-container').fadeOut();
    $('#single-permit-container').fadeOut(); // do we need this?
    $('#spinner-container').fadeIn();
    map.initAutocomplete();
    Permit.createTable();
    Permit.getData(mainController.showInitialContent);
  };

  mainController.showInitialContent = function() {
    console.log('inside showInitialContent');
    $('#spinner-container').fadeOut();
    $('#welcome-text-container').fadeIn();
    console.log('should be showing welcome text now');
  };

  module.mainController = mainController;
})(window);
