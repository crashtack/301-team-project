(function(module){
  var infoController = {};

  infoController.index = function() {
    $('#list-container').fadeOut();
    $('#single-permit-container').show();
    map.initAutocomplete();
  };

  module.infoController = infoController;
})(window);
