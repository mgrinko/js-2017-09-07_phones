var http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

function accept(request, response) {
  file.serve(request, response);
}

http.createServer(accept).listen(8080);

console.log('Server running on port 8080');
