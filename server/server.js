var http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:63342',
    'Access-Control-Allow-Methods': 'GET,PUT',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
});

function accept(request, response) {

  if (request.url.startsWith('/server/data/')) {
    setTimeout(() => {
      file.serve(request, response);
    }, 3000);
  } else {
    file.serve(request, response);
  }
}

http.createServer(accept).listen(8080);

console.log('Server running on port 8080');
