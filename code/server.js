var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

// var proxyGitHub = function(request, response) {
//   console.log('Routing GitHub request for', request.params[0]);
//   (requestProxy({
//     url: 'https://api.github.com/' + request.params[0],
//     headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
//   }))(request, response);
// };

var proxySeattle = function(request, response) {
  console.log('Routing Seattle request for', request.params[0]);
  (requestProxy({
    url: 'https://data.seattle.gov/resource/' + request.params[0],
    headers: { "X-App-Token": process.env.SEATTLE_GOV_TOKEN }
  }))(request, response);
};

// app.get('/github/*', proxyGitHub);

app.get('*', proxySeattle)

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});


// client_id=YOUR_AUTH_TOKEN
