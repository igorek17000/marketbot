

var HTTPS = require('https');

exports.modName = "Post module";

logID = "b6c42cc2a1bee3c38f07723d78";
var str = '';
var response = "";



var msg;
msg = response;
msg : msg;


options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups?token=nQMmW22iRiJY4TL3W3aoWaCbNpkGO0yIVAaHRvaR',
    method: 'GET'
  };

var url = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

//response : response;
body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : msg
  };

var json = JSON.stringify(body);



callback = function(response) { 
var str = '';

var url = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


var body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : msg
  };

response.on('data', function (chunk) { 
str += chunk; 
}); 
response.on('end', function () { 
console.log(req.data); 
console.log(str); // your code here if you want to use the results ! 
var logReq = HTTPS.request(url, function(res) { 
console.log(' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)

      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });





  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });


  var timeo = logReq.end(json);

setTimeout(function () {
timeo;
}, 3000);

}); 
} 

var req = HTTPS.request(options, callback).end();

/*
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


    body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID, 
    "text"        : "response"
  };

*/


  console.log('sending response to text object ' + '\n' + msg);














