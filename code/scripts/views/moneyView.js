(function(module) {
  var moneyView = {};

  moneyView.sortByValue = function() {
    $('#single-permit-container').empty();
    $('#list-container').empty();
    $('#money-container').fadeIn();
    if ($('#money-container').children().length === 0) {
      var sortedByValue = Permit.all.sort(function(a, b) {
        return b.value - a.value;
      });
      var temp = sortedByValue.slice(0, 20);
      temp.forEach(function(a) {
        if (typeof(a.value) === 'number') {
          a.value = formatDollar(a.value);
          $('#money-container').append(moneyPermitsCompiler(a));
        }
      });
    }
  };

  // A function to format the value to $
  function formatDollar(num) {
    var p = num.toFixed(2).split('.');
    return '$' + p[0].split('').reverse().reduce(function(acc, num, i, orig) {
      return num + (i && !(i % 3) ? ',' : '') + acc;
    }, '') + '.' + p[1];
  };

  module.moneyView = moneyView;
})(window);
