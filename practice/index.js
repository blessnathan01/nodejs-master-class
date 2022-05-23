/**
 * Practice file
 * Author: Blssing Rweikiza
 * 
 */

// Dependencies
var http = require('http');

// Server that should respond to http requests
var server = http.createServer(function(req, res) {
    // Set the response to be plain text
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.setHeader('Content-Type', 'text/plain');

    // Return the response
    res.end('Hello World!\n');
});

server.listen(3001, function() {
    console.log('Server is listening on port 3001');
});