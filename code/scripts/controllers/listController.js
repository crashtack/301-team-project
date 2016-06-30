(function(module){

  var listController = {};

  listController.index = function(ctx) {
    console.log('in listController.index');
     $('#spinner-container').fadeOut();
     $('#welcome-text-container').fadeOut();
     $('#single-permit-container').fadeOut();
     $('#list-container').fadeIn();
     //theMap.initAutocomplete();
     listView.showTenPermits(ctx);
   };

  module.listController = listController;
})(window);
