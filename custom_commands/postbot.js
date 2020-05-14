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


body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : ""
  };




/*
    body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID
    //"text"        : response
  };
*/

callback = function(response) { 
var str = '';
response.on('data', function (chunk) { 
str += chunk; 
}); 
response.on('end', function () { 
console.log(req.data); 
console.log(str); // your code here if you want to use the results ! 
//logReq.end(JSON.stringify(body))
//str;
//callback(str);


//logReq.on('error', function(err) { console.log('error posting message ' + JSON.stringify(err)); }); logReq.on('timeout', function(err) { console.log('timeout posting message ' + JSON.stringify(err)); });

//logReq.end(JSON.stringify(body));

}); 
} 

var req = HTTPS.request(options, callback).end();
