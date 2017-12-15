var http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
});

function accept(request, response) {


  if (request.url.startsWith('/server/data/')) {
    file.serve(request, response);
  } else {
    file.serve(request, response);
  }
}

http.createServer(accept).listen(3000);

console.log('Server running on port 3000');
