var fun_command = true;
var cmds = [cmdPost];

var HTTPS = require('https');

exports.modName = "Post module";
exports.cmdPost = cmdPost();


function cmdPost(msg, attachments, logID) {
  var options, body, logReq, logID;
//botID = botID;
logID = "b6c42cc2a1bee3c38f07723d78";
var msg = "This is a test text object";




    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


    body = {
    
    "attachments" : attachments,
    "bot_id"      : logID, 
    "text"        : msg
  };




  console.log('sending response to text object ' + '\n' + msg);



logReq = HTTPS.request(options, function(res) { 
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
}
cmdPost();
