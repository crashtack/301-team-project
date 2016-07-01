(function(module){

  var infoController = {};

  infoController.index = function(ctx) {
    console.log(ctx);
    $('.changeable-area').hide();
    $('#single-permit-container').fadeIn();
    //theMap.initAutocomplete();
    infoView.showSinglePermitInfo(ctx);
  };

  infoController.backInStack = function() {
    $('#single-permit-container').on('click', 'a.close-permit', function(e) {
      e.stopImmediatePropagation();
      window.history.go(-1);
    });
  };

  module.infoController = infoController;
})(window);
