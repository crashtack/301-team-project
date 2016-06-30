(function(module){

  var infoController = {};

  infoController.index = function(ctx) {
    console.log(ctx);
    $('.changeable-area').hide();
    $('#single-permit-container').fadeIn();
    theMap.initAutocomplete();
    infoView.showSinglePermitInfo(ctx);
  };

  module.infoController = infoController;
})(window);
