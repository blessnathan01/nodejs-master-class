/*
 * Basic file for the API
 * Author: Blessing Rweikiza
 * 
 */


// Dependencies
var http = require('http');

// The server should respond all http requests with a text
var server = http.createServer(function(req, res) {

    res.end('Hi there!\n');

});

// Start the server that will listen to port 3000
server.listen(3000, function() {

    console.log("The server is listening to port 3000 now");

});