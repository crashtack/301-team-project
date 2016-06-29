(function(module){

  var listController = {};

  listController.index = function() {
    $('#spinner-container').fadeOut();
    $('#welcome-text-container').fadeOut();
    $('#single-permit-container').fadeOut();
    $('#list-container').fadeIn();
    map.initAutocomplete();
  };

  module.listController = listController;
})(window);
