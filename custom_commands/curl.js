



//------------


/* 

//exports
exports.checkCommands = function(dataHash, callback) {
  for (cmd in commands) {
    cmd = commands[cmd];
    //hard coded temporarily ... maybe permanently ... losing motivation to work on this
    if(cmd.name == 'cc' && dataHash.currentBot.type == 'hp')
      continue;
    var cmdReg = new RegExp(cmd.regex, "i");
    if (dataHash.request.text && cmdReg.test(dataHash.request.text)){
      var val = cmdReg.exec(dataHash.request.text);

      callback(true, cmd.message, cmd.attachments);
      break;
    }
  }


  for (cmd in userCommands) {
    var test = userCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}



exports.checkCommands = function(dataHash, callback) {
  for (command in sysCommands) {
    var test = sysCommands[command](dataHash, callback);
    if (test)
      return test;
  }

  return false;
}




function describeCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd describe (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to describe commands"
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].name == val[1].toLowerCase()) {
        commands[cmd]["description"] = val[2];
        describeCmdDB(commands[cmd]);

        var msg = val[1] + " description updated";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
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


//-------




    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: val[1]
  };



    body = {
    
    "attachments" : attachments,
    "bot_id"      : logID, 
    "text"        : val[2]
  };




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

  console.log('sending response to ' + logName + '\n' + botResponse);



logReq = HTTPS.request(options, function(res) { 
console.log(nickName + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


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

*/
