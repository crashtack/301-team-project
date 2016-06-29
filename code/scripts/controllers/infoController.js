(function(module){
  var infoController = {};

  infoController.index = function(ctx) {
    console.log(ctx);

    $('#list-container').fadeOut();
    $('#single-permit-container').show();
    map.initAutocomplete();
    infoView.showSinglePermitInfo(ctx);
  };

  module.infoController = infoController;
})(window);
