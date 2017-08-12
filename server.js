var http = require('http');
var url = require('url')
var static = require('./src/static')


var server = http.createServer(function (req, res) {
  var pathName = url.parse(req.url).pathname
  static.static(res, pathName)
})

server.listen(8000)