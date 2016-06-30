(function(module){

  var listController = {};

  listController.index = function() {
    $('.changeable-area').hide();
    $('#list-container').fadeIn();
    map.initAutocomplete();
  };

  module.listController = listController;
})(window);
