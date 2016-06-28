(function(module){
  var mainController = {};

  mainController.index = function() {
    Permit.createTable();
    Permit.getData().done(function() {
      $('#spinner-container').fadeOut();
      $('.changeable-area').hide();
      $('#search-results-container').show();
    });
  };


  module.mainController = mainController;
})(window);
