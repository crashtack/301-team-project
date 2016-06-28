(function(module){
  var mainController = {};

  mainController.loadInitialContent = function(ctx, next) {
    console.log('inside loadInitialContent');
    $('#spinner-container').show();
    Permit.createTable();
    Permit.getData(mainController.showInitialContent);
  };

  mainController.showInitialContent = function() {
    console.log('inside showInitialContent');
    $('#spinner-container').fadeOut();
    $('.changeable-area').hide();
    $('#search-results-container').show();
  };

  module.mainController = mainController;
})(window);
