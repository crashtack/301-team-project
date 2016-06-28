(function(module) {
  // Permit constructor
  function Permit (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }

  Permit.all = [];

  Permit.getData = function() {
    webDB.execute('SELECT * FROM permitdata', function(rows) {
      if (rows.length) {
        console.log('rows populated');
        map.fetchLocations('SELECT * FROM permitdata');
      } else {
        $.get('https://data.seattle.gov/resource/94s7-sxg7.json?$$app_token=gdkMQ6LU9xq4ZonjF6aDFun5l&$limit=10000&permit_type=Construction&action_type=NEW&$where=NOT%20status=%27Permit%20Closed%27', function(data) {
          Permit.all = data;
          if (!rows.length) {
            Permit.all.forEach(function(singlePermit) {
              var permit = new Permit(singlePermit);
              permit.insertPermit();
            });
          }
          map.fetchLocations('SELECT * FROM permitdata');
        });
      }
    });
  };

  Permit.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS permitdata (' +
        'id INTEGER PRIMARY KEY, ' +
        'address VARCHAR(255) NOT NULL, ' +
        'applicant_name VARCHAR(255) NOT NULL, ' +
        'application_date DATE, ' +
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

  Permit.prototype.insertPermit = function () {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO permitdata(address, applicant_name, application_date, application_permit_number, category, contractor, description, latitude, longitude, permit_and_complaint_status_url, permit_type, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data': [this.address, this.applicant_name, this.application_date, this.application_permit_number, this.category, this.contractor, this.description, this.latitude, this.longitude, this.permit_and_complaint_status_url, this.permit_type, this.value],
        }
      ]
    );
  };

  Permit.createTable();
  Permit.getData();

  module.Permit = Permit;
})(window);
