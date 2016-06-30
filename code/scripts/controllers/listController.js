(function(module){

  var listController = {};

  listController.index = function(ctx, next) {
    console.log('in listController.index');
      Permit.createTable();
     $('#spinner-container').fadeOut();
     $('#welcome-text-container').fadeOut();
     $('#single-permit-container').fadeOut();
     $('#list-container').fadeIn();
     listView.showTenPermits(ctx);
     next();
   };

  module.listController = listController;
})(window);
