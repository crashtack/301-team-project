//append info on 10 closest permits
(function(module) {
  var listView = {};

  listView.showTenPermits = function(ctx) {
    console.log('entering listView.showTenPermits');
    // webDB.execute(
    //   [
    //     {
    //       'sql': 'SELECT * FROM permitdata LIMIT 10',
    //     }
    //   ],
    //   function(ctx) {
    //     for (var i = 0; i < ctx.length; i++) {
    //       $('#list-container').append(permitsCompiler(ctx[i]));
    //     }
    //   }
    // );
    for (var i = 0; i < 10; i++) {
      $('#list-container').append(permitsCompiler(ctx.sorted[i]));
    }
  };

  // listView.showTenPermits();
  module.listView = listView;
})(window);
