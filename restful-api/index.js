/*
 * Basic file for the API
 * Author: Blessing Rweikiza
 * 
 */


// Dependencies
var http = require('http');
var url = require('url');

// The server should respond all http requests with a text
var server = http.createServer(function(req, res) {

    // Get URL and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get URL path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Send the response
    res.end('Hi there!\n');

    // Log the path
    console.log('Request received on path: ' + trimmedPath);

});

// Start the server that will listen on port 3000
server.listen(3000, function() {

    console.log("The server is listening on port 3000 now");

});