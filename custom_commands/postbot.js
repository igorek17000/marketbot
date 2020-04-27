var fun_command = true;
var cmds = [cmdPost];

var HTTPS = require('https');

exports.modName = "Post module";

exports.checkCommands = function(dataHash, callback) {
  cmds.some(function(cmd){
    return cmd(dataHash.funMode, dataHash.request.text, callback);
  });
}

exports.getCmdListDescription = function () {
  var cmdArr = [
    {cmd: "/post 'string'", desc: "Responds with a user input post.", fun: true}
  ];

  return cmdArr;
}



function cmdPost(funMode, request, callback){
  var regex = /^\/post (.+)/i;
  
  if (regex.test(request)){
    if(!funMode){
      callback(true, "Sorry I'm no fun right now.", []);
      return "Sorry I'm no fun right now.";
    }

    var val = regex.exec(request);

    var options = {
      hostname: "api.urbandictionary.com",
      path: "/v0/define?term=" + encodeURIComponent(val[1]),
      rejectUnauthorized: false
    };

    var callbackAPI = function(response) {
      var str = '';

      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        str = JSON.parse(str);
        
        var msg = '';
        if (typeof(str.list[0].definition) !== 'undefined'){
          msg = str.list[0].definition;
        } else {
          msg = "That's not even found in a fake internet dictionary.";
        }

        callback(true, msg, []);
      });
    };
    
    HTTPS.request(options, callbackAPI).end();
  } else {
    return false;
  }
}








function postMessage(botResponse, attachments, botID, logID, nickName) {
  var options, body, botReq, logReq, botID, logID, nickName;
botID = botID;
logID = "b6c42cc2a1bee3c38f07723d78";

var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }

    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


/*    var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }


*/
    body = {
    
    "attachments" : attachments,
    "bot_id"      : botID, 
    "text"        : botResponse
  };



/* body1 = {
    
    "attachments" : attachments,
    "bot_id"      : logID,
    "text"        : botResponse
  };
*/

     var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }



  console.log('sending response to ' + nickName + '\n' + botResponse);



botReq = HTTPS.request(options, function(res) { 
console.log(nickName + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });





  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
