(function(module){
  var mainController = {};

  // mainController.loadInitialContent = function(ctx, next) { // are we using this 'next'?
    mainController.loadInitialContent = function(ctx) {
    $('#spinner-container').show();
    map.initAutocomplete();
    Permit.createTable();
    Permit.getData(mainController.showInitialContent);
  };

  mainController.showInitialContent = function() {
    console.log('inside showInitialContent');
    $('#spinner-container').fadeOut();
    //$('.changeable-area').hide();
    $('#list-container').show();
  };

  module.mainController = mainController;
})(window);
