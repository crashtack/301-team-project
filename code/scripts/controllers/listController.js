(function(module){
  var listController = {};

  listController.index = function() {
    $('#welcome-text-container').fadeOut();
    $('#list-container').show();
    map.initAutocomplete();
  };

  module.listController = listController;
})(window);
