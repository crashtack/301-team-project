(function(module){
  var infoController = {};

  infoController.index = function(ctx) {
    console.log(ctx);
    $('#spinner-container').fadeOut();
    $('#welcome-text-container').fadeOut();
    $('#list-container').fadeOut();
    $('#single-permit-container').fadeIn();
    theMap.initAutocomplete();
    infoView.showSinglePermitInfo(ctx);
  };

  module.infoController = infoController;
})(window);
