// compiles the information to display the groups of permits near the searched location
var permitsCompiler = function(currentPermitsArray) {
  var permitsToDisplay = Handlebars.compile($('search-results-template').text());
  return permitsToDisplay(currentPermitsArray);
};

// compiles the information to display the single permit currently selected by the user
var singlePermitCompiler = function(currentSelectedPermit) {
  var permitToDisplay = Handlebars.compile($('chosen-permit-template').text());
  return permitToDisplay(currentSelectedPermit);
};
