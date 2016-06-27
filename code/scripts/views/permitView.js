(function(module) {

  var permitView = {};
  // var map = new google.maps.Map(document.getElementById('map'), map.mapOptions);


  // permitView.fetchLocations = function () {
  //   webDB.execute('SELECT * FROM permitdata', function(rows) {
  //     rows.forEach(function(row) {
  //       console.log('lat= ', row.latitude);
  //       console.log('lon= ', row.longitude);
  //       var marker = new google.maps.Marker({
  //         position: {lat: row.latitude, lng: row.longitude},
  //         map: map
  //       });
  //
  //     });
  //
  //         console.log(rows);
  //         //callback();
  //   });
  // };


  module.permitView = permitView;
})(window);
