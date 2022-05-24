/*
 * Basic file for the API
 * Author: Blessing Rweikiza
 * 
 */


// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

// The server should respond all http requests with a text
var server = http.createServer(function(req, res) {

    // Get URL and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get URL path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get query string as object
    var queryStringObject = parsedUrl.query;

    // Get HTTP request method in uppercase
    var method = req.method;

    // Get headers as object
    var headers = req.headers;

    // Get payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {

        buffer += decoder.write(data);

    });
    req.on('end', function() {

        buffer += decoder.end();

        // Choose the handler this request should go to. If not found, use notFound handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct data object to send to handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {

            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert payload to string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request
            console.log('Response returned: ', statusCode, payloadString);
        });

        // Log the path
        console.log('Request received on path: ' + trimmedPath + '\nHTTP method: ' +
            method + '\nQuery string parameters: ', queryStringObject, '\nHeaders: ', headers, '\nPayload: ', buffer);
        console.log('********************************************');

    });

});

// Start the server
server.listen(config.port, function() {

    console.log("The server is listening on port " +
        config.port + " in " + config.envName + " mode");

});

// Define the handlers
var handlers = {};

// products handler
handlers.products = function(data, callback) {

    // Callback a http status code and payload object
    callback(408, { 'name': 'products handler' });

};

// Not found handler
handlers.notFound = function(data, callback) {

    // Callback a http status code and an empty object
    callback(404, { 'name': 'notFound handler' });

};

// Define a request router
var router = {
    'products': handlers.products
};