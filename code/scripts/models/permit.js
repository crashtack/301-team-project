(function(module) {
  var sortedByDistancePermits = [];
  // Permit constructor
  function Permit (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
    this.URL = opts.permit_and_complaint_status_url.url;
  }

  Permit.all = [];

  Permit.getData = function(next) {
    webDB.execute('SELECT * FROM permitdata', function(rows) {
      if (rows.length) {
        map.fetchLocations('SELECT * FROM permitdata',next);
      } else {
        $.get('https://data.seattle.gov/resource/94s7-sxg7.json?$$app_token=gdkMQ6LU9xq4ZonjF6aDFun5l&$limit=1000&permit_type=Construction&action_type=NEW&$where=NOT%20status=%27Permit%20Closed%27', function(data) {
          Permit.all = data;
          if (!rows.length) {
            Permit.all.forEach(function(singlePermit) {
              var permit = new Permit(singlePermit);
              permit.insertPermit();
            });
          }
          map.fetchLocations('SELECT * FROM permitdata',next);
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
        'status VARCHAR(20),' +
        'value INTEGER);'

      // callback
    );
  };

  Permit.prototype.insertPermit = function () {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO permitdata(address, applicant_name, application_date, application_permit_number, category, contractor, description, latitude, longitude, permit_and_complaint_status_url, permit_type, status, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data': [this.address, this.applicant_name, this.application_date, this.application_permit_number, this.category, this.contractor, this.description, this.latitude, this.longitude, this.URL, this.permit_type, this.status, this.value],
        }
      ]
    );
  };

  // Permit.createTable();
  // Permit.getData();

  module.Permit = Permit;
})(window);
