(function(module){

  var infoController = {};

  infoController.index = function(ctx) {
    console.log('entering infoController');
    //console.log(ctx);
    $('.changeable-area').hide();
    $('#single-permit-container').fadeIn();
    //theMap.initAutocomplete();
    $('.pac-input').hide();
    //theMap.searchBoxListener();
    infoView.showSinglePermitInfo(ctx);
  };

  module.infoController = infoController;
})(window);
