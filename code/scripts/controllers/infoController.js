(function(module){

  var infoController = {};

  infoController.index = function(ctx, next) {
    console.log(ctx);
    Permit.createTable();
    $('.changeable-area').hide();
    $('#single-permit-container').fadeIn();
    infoView.showSinglePermitInfo(ctx);
    next();
  };

  module.infoController = infoController;
})(window);
