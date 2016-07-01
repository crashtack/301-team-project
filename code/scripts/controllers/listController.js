(function(module){

  var listController = {};

  listController.index = function(ctx) {
    console.log('in listController.index');
    $('.changeable-area').hide();
    $('#list-container').fadeIn();
    listView.showTenPermits(ctx);
  };

  module.listController = listController;
})(window);
