(function(module) {
  var moneyView = {};

  moneyView.sortByValue = function() {
    ('#money-container').empty();
    $('#single-permit-container').empty();
    $('#list-container').empty();
    $('#money-container').fadeIn();
    var sortedByValue = Permit.all.sort(function(a, b) {
      return b.value - a.value;
    });
    console.log(sortedByValue);
    for (var i = 0; i < 20; i++) {
      $('#money-container').append(moneyPermitsCompiler(sortedByValue[i]));
    }
  };

  module.moneyView = moneyView;
})(window);
//
//  A function to format the value to $
// function formatDollar(num) {
//     var p = num.toFixed(2).split(".");
//     return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
//         return  num + (i && !(i % 3) ? "," : "") + acc;
//     }, "") + "." + p[1];
// }
