var reqText = request.text;
var val = regex.exec(reqText);
logID = "b6c42cc2a1bee3c38f07723d78";

var options = {
    hostname: 'api.groupme.com',
    path: '/v3/' + 'val[2],
    method: val[1]
  };

body = {
    
    "attachments" : attachments,
    "bot_id"      : logID, 
    "text"        : res.results
  };

var postBotCommands = [postBotCmd];

//------------


/* 




exports.checkCommands = function(dataHash, callback) {
  for (command in postBotCommands) {
    var test = postBotCommands[command](dataHash, callback);
    if (test)
      return test;
  }

  return false;
}




function postBotCmd(request, bots, isMod, callback) {
  var regex = /^\/curl (.+?) ([\s\S]+)/i;
  //var reqText = request.text;

  if (regex.test(reqText)){
    //var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to describe commands"
      callback(true, msg, []);
      return msg;
    }

postBotCmd();


    var msg = " Message sent";
    callback(true, msg, []);

    return msg;
  }
}



function postMessage(botResponse, attachments, botID, logID, nickName) {
  var options, body, curlReq, logID, nickName;
logID = "b6c42cc2a1bee3c38f07723d78";

// /*var nickName = '';
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

// */
//-------





    var logName ='';
      if (logID == 'b6c42cc2a1bee3c38f07723d78') {
           logName = 'Config';
           } else if (logID == '282865de8ce30137567238148f') {
           logName = "308BoonBot";
           } else if (logID == '8631a4c35f0f0f250bd5d46f44') {
           logName = 'FlynnBot';
           } else if (logID == '2184cee4d169628e83e82ee05f') {
           logName = 'AshleyBot';
           } else {
             logName = logID;
           }

  console.log('sending response to ' + logName + '\n' + res.results);



curlReq = HTTPS.request(options, function(res) { 
console.log(nickName + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });





  curlReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  curlReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  curlReq.end(JSON.stringify(body));



}

*/
