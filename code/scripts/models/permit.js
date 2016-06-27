(function(module) {
  // Permit constructor
  function Permit (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }

  Permit.all = [];

  Permit.getData = function() {
    // $.get('https://data.seattle.gov/resource/94s7-sxg7.json?$$app_token=gdkMQ6LU9xq4ZonjF6aDFun5l', function(data) {
    $.get('https://data.seattle.gov/resource/94s7-sxg7.json?$$app_token=gdkMQ6LU9xq4ZonjF6aDFun5l&$limit=50000&permit_type=Construction&action_type=NEW', function(data) {
    console.log(data);
    });    // $.get('https://data.seattle.gov/data/resource/94s7-sxg7.json?$$app_token=SEATTLE_GOV_TOKEN&permit_type=Construction&action_type=NEW', function(data) {
    // $.ajax({
    //   url: 'https://data.seattle.gov/resource/94s7-sxg7.json?permit_type=Construction&action_type=NEW',
    //   method: 'GET',
    //   success: function(data) {
    //     Permit.all = data;
    //   }
    // });
  };

  Permit.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS permitdata (' +
        'id INTEGER PRIMARY KEY, ' +
        'address VARCHAR(255) NOT NULL, ' +
        'applicant_name VARCHAR(255) NOT NULL, ' +
        'application_permit_number INTEGER, ' +
        'category VARCHAR(20), ' +
        'contractor VARCHAR(100), ' +
        'description TEXT NOT NULL,' +
        'latitude FLOAT,' +
        'longitude FLOAT,' +
        'permit_and_complaint_status_url VARCHAR(512),' +
        'permit_type VARCHAR(100),' +
        'value INTEGER);'

      // callback
    );
  };

  Permit.getData();
  Permit.createTable();

  module.Permit = Permit;
})(window);
