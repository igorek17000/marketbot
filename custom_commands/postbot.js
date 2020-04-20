var commands;
var userCommands = [addCmd, addressCmd, answerCmd, getCmd, describeCmd, editCmd, modCommandCmd, removeCmd];

var db = require('../modules/db.js');
var db_table = 'user_triggers';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');




/* function editCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd edit (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to edit commands"
      callback(true, msg, []);
      return msg;
    }

    val[1] = val[1].toLowerCase();
    for (cmd in commands) {
      if (commands[cmd].name == val[1]) {
        commands[cmd].message = val[2];
        changeMsgCmdDB(commands[cmd]);

        var msg = val[1] + " message updated.";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + "doesn't exist";
    callback(true, msg, []);
    return msg;
  }
}

*/

var request = request;

  var dataHash = {
    request:      request,
    //currentBot:   rooms.getRoom(botRoom),
    isMod:        mods.isMod(request.user_id),
    bots:         rooms.getRooms(),
    //funMode:      sysCommands.fun_mode(),
    //owner:        config.env().owner
  };

var mods         = require('../modules/mods');
var rooms        = require('../modules/rooms');


var reqText = request.text;
var val = regex.exec(reqText);
logID = "b6c42cc2a1bee3c38f07723d78";

var options = {
    hostname: 'api.groupme.com',
    path: '/v3/' + val[2],
    method: val[1]
  };

body = {
    
    "attachments" : attachments,
    "bot_id"      : logID, 
    "text"        : res.results
  };

var postBotCommands = [postBotCmd];

//------------







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

postBotMessage();


    var msg = " Message sent";
    callback(true, msg, []);

    return msg;
  }
}



function postBotMessage(botResponse, attachments, botID, logID, nickName) {
  var options, body, curlReq, logID, nickName;
logID = "b6c42cc2a1bee3c38f07723d78";

/* var nickName = '';
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

