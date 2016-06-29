(function(module){
  var infoController = {};

  infoController.index = function() {
    $('#spinner-container').fadeOut();
    $('#welcome-text-container').fadeOut();
    $('#list-container').fadeOut();
    $('#single-permit-container').fadeIn();
    map.initAutocomplete();
  };

  module.infoController = infoController;
})(window);
