//append info on single permit to page
(function(module) {
  var infoView = {};

  infoView.showSinglePermitInfo = function(ctx) {
    console.log('entering infoView.showSinglePermitInfo');
    $('#geocomplete').attr('value', '');
    $('#single-permit-container').empty();
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM permitdata where id = ?;',
          'data': [ctx.params.id]
        }
      ],
      function(result) {
        $('#single-permit-container').append(singlePermitCompiler(result[0]));

      }
    );
  };

  module.infoView = infoView;
})(window);
