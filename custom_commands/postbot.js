 var commands;

var db = require('../modules/db.js');
var db_table = 'user_triggers';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');


var HTTPS = require('https');
var request = require('request');
request = request;

//request.text = request.text.trim;
var reqText = request.text;
var regex = /^\/curl (.+?) ([\s\S]+)/i;

var val = regex.exec(reqText);
var logID = "b6c42cc2a1bee3c38f07723d78";

var options = {
    hostname: 'api.groupme.com',
    path: '/v3/' + val[2],
    method: val[1]
  };

body = {
    
    "attachments" : attachments,
    "bot_id"      : logID, 
    "text"        : result
  };

var postBotCommands = [postBotCmd];


var botID = logID;

/*
function respond() {
 
      botRegex = /^\/cool guy$/;

 
    this.res.writeHead(200);
    console.log('Sent');
    postMessage();
    this.res.end();
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


*/
// -------

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
//------------







exports.checkCommands = function(dataHash, callback) {
  for (command in postBotCommands) {
    var test = postBotCommands[command](dataHash, callback);
    if (test)
      return test;
  }

  return false;
}




function postBotCmd(request, callback) {
  var regex = /^\/curl (.+?) ([\s\S]+)/i;


  var reqText = request.text;

   if (regex.test(reqText)){
    //var val = regex.exec(reqText);

   // if (!isMod) {
      //var msg = "You don't have permission to describe commands"
      //callback(true, msg, []);
      //return msg;
    
//

postBotMessage();


    var msg = " Message sent";
    callback(true, msg, []);

    return msg;
 }
}



function postBotMessage(botResponse, attachments, logID) {
  var options, body, curlReq, botID, logID;
logID = "b6c42cc2a1bee3c38f07723d78";


//-------

console.log('sending response to ' + logID);



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


