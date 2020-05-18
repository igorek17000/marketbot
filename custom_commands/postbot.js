

var HTTPS = require('https');

exports.modName = "Post module";

logID = "b6c42cc2a1bee3c38f07723d78";
var str = '';
var response;
str : str;
//response.body = str;
var data;
var json = JSON.stringify(data);

//var str;
var result = [];
var body;

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

var result = [];


body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : response + [] + attachments
  };

var result = [];


callback = function(response, logID, url, body, logReq) { 
var str = '';
var result = [];


var url = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


var body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : response + [] + attachments
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
  logReq.end(JSON.stringify(body));


});




/*
var callbackLog = function(res) { 
str = '';
var json = JSON.stringify(body);
response : response;

console.log(' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)

res.on('data', function(chunk) {
str += chunk;
 });


    /*  res.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  res.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });

  res.on('end'logReq);
*/


//logReq;
//logReq.json;
 
 


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
  logReq.end(JSON.stringify(body));

 

//}); 
//HTTPS.request(url, callbackLog).end(json);
      //logReq(json));
} 


//var logReq = HTTPS.request(url, callbackLog).end(json);

var req = HTTPS.request(options, callback).end();


var logReq = HTTPS.request(url, function(res, result) { 
console.log(' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)
//console.log(str)
      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });



/*


  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
*/


logReq.end(JSON.stringify(body))



  //logReq.end(JSON.stringify(body));


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


  console.log('sending response to text object ');














