(function(module){
  var listController = {};

  listController.index = function() {
    // --------------------------------
    // RETURN WHEN THE initAutocomplete functions have been split into smaller functions
    // --------------------------------
    // check to see if Permit all exists
    console.log('permit all is: ' + Permit.all);
    // make method to populate permit all for different controllers
    // assign that to context object
    // initAutocomplete call
    map.initAutocomplete();
    // hide #welcome-text-container
    $('#welcome-text-container').fadeOut();
    // show #list-container
    $('#list-container').show();
    //call distance

  };

  module.listController = listController;
})(window);
