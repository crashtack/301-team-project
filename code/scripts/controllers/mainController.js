(function(module){
  var mainController = {};

  mainController.loadInitialContent = function(ctx, next) { // are we using this 'next'?
    console.log('inside loadInitialContent');
    $('#spinner-container').show();
    // map.initAutocomplete();
    theMap.getGeolocation(Permit.createTable);

    //Permit.createTable();
    //Permit.getData(mainController.showInitialContent);
  };

  mainController.showInitialContent = function() {
    console.log('inside showInitialContent');
    $('#spinner-container').fadeOut();
    //$('.changeable-area').hide();
    $('#search-results-container').show();
  };

  module.mainController = mainController;
})(window);
