(function(module){

  var infoController = {};

  infoController.index = function(ctx) {
    console.log(ctx);
    $('.changeable-area').hide();
    $('#single-permit-container').fadeIn();
    infoView.showSinglePermitInfo(ctx);
    // next();
  };

  module.infoController = infoController;
})(window);
