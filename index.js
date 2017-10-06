var querystring = require('querystring');
var https = require('https');
var fs = require('fs');

exports.handler = function(event, context) {
    console.info('Received event', event);

    var req = {
        "accessKey": accessKey,
        "templateName": templateName,
        "outputName": outputName,
        "data": event.data
    };

    // Build the post string from an object
    var post_data = JSON.stringify(data);

    // An object of options to indicate where to post to
    var post_options = {
        host: 'api.incontact.com',
        port: '443',
        path: 'InContactAuthorizationServer/Token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length,
            'Authorization': 'basic U2tvcG9zU3lzdGVtQFNrb3Bvczo0NTk0NTk3'
        }
    };

    var post_request = https.request(post_options, function(res) {
        var body = '';

        res.on('data', function(chunk)  {
            body += chunk;
        });

        res.on('end', function() {
            context.done(body);
        });

        res.on('error', function(e) {
            context.fail('error:' + e.message);
        });
    });

    // post the data
    post_request.write(post_data);
    post_request.end();
};

// form data
var postData = querystring.stringify({
        "grant_type" : "password", 
        "username" : "Sean.Nelson@conduent.com", 
        "password" : "Welcome01!", 
        "scope" : "" 
  });
   
  // request option
  var options = {
    host: 'api.incontact.com',
    port: '443',
    path: '/InContactAuthorizationServer/Token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Length': postData.length,
        'Authorization': 'basic U2tvcG9zU3lzdGVtQFNrb3Bvczo0NTk0NTk3'
    }
  };
   
  // request object
  var req = https.request(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function () {
      console.log(result);
    });
    res.on('error', function (err) {
      console.log(err);
    })
  });
   
  // req error
  req.on('error', function (err) {
    console.log(err);
  });
   
  //send request witht the postData form
  req.write(postData);
  req.end();