/*global init*/
//
//load modules
var sysCommands  = require('./modules/sys-commands');
var db           = require('./modules/db.js');
var mods         = require('./modules/mods');


//var countdowner  = require('./modules/countdown-list');

var commandList  = require('./modules/command-list');
var commandListSuccess  = require('./commands_success/command-list');
var rooms        = require('./modules/rooms');

//commands with custom actions
var alexBot      = require('./custom_commands/alex-bot');
var flynnBot     = require('./custom_commands/flynn-bot-timesheet');
var emailBot     = require('./custom_commands/email');
var birthdayBot  = require('./custom_commands/birthdays');
var api = require('./custom_commands/api');
//var testit = require('./commands/index.html');

//var postbot      = require('./custom_commands/postbot');
var userCmds     = require('./custom_commands/user-commands');
var userMentions = require('./custom_commands/user-mentions');
var sysTriggers  = require('./custom_commands/system-triggers');
var quotes       = require('./custom_commands/quotes');
var atEveryone   = require('./custom_commands/at-everyone');
var funCommands  = require('./custom_commands/fun-commands');
var gif          = require('./custom_commands/giphy-api');
var catFact      = require('./custom_commands/cat-fact');
var urbanDict    = require('./custom_commands/urban-dictionary');


var moment = require('moment-timezone');

moment.tz.setDefault('America/Toronto');

//var date = moment().utcOffset(-300).format('LLLL');
var date = moment().format('LLLL');
//var go         = require('./modules/server.js');
var fs           = require('fs');
var concat       = require('concat');
var cron = require('node-cron');
var express = require('express');
var nodemailer = require('nodemailer');
app = express();
var weather = require('weather-js');
var colors = require('colors');
var chalk = require('chalk');
//chalk.enabled = true;
//import { Octokit } from "@octokit/core";


//load config
var config       = require('./config/config');
var HTTPS        = require('https');

//Temporarily just an array of the commands functions. Make an object with configuration values.
var checkCommandsHSH = [alexBot, flynnBot, emailBot, birthdayBot, api, mods, sysTriggers, userCmds, userMentions, sysCommands, atEveryone, funCommands, quotes, rooms, gif, catFact, urbanDict];

exports.init = function() {
  var req = this.req;
  init.initPage(req, function(body){
    this.res.writeHead(200, {"Content-Type": "text/html"});
    this.res.end(body);
  });
}



exports.respond = function(botRoom) {
  var request = JSON.parse(this.req.chunks[0]);

  var dataHash = {

    request:      request,
    currentBot:   rooms.getRoom(botRoom),
    isMod:        mods.isMod(request.user_id),
    bots:         rooms.getRooms(),
    botARoom:     rooms.getUserPath(botRoom),
    funMode:      sysCommands.fun_mode(),
    owner:        config.env().owner
  };

  this.res.writeHead(200);
  this.res.end();

 // if (dataHash.request.sender_type == 'bot') return;
  dataHash.request.text = dataHash.request.text.trim();

  if (!rooms.getRoom(botRoom).id && botRoom != 'config')
    return;

//if (rooms.getRoom(botRoom) == '282865de8ce30137567238148f')
    //logName = botRoom.name;



  for(var lib in checkCommandsHSH) {
    checkCommandsHSH[lib].checkCommands(dataHash, function(check, result, attachments){
      if (check) sendDelayedMessage(result, attachments, rooms.getRoom(botRoom).id);
    });
}
  }

/*
exports.countdown = function() {
  //var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  var output = countdowner;
  //var output = cmdArr;
//var output = checkCommandsHSH[].getCmdListDescription();

//return cmdArr;
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);
//this.res.end(cmdArr);
}
*/

exports.commands = function() {
  var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  var output = commandList.buildHTML(cmdArr, config.bot_name);

  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);

}







//-----------------
exports.commands_success = function() {

//var db = require('./index.js');

  var cmdArr = [];
  //function cmdit() {
//console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
//}
  var outputSuccess = commandListSuccess.buildHTML(cmdArr, config.bot_name);


var name = this.req.body.name;

    var email = this.req.body.email;

    var pass = this.req.body.password;

    var phone = this.req.body.phone;

  

    var data = {

        "name": name,

        "email": email,

        "password": pass,

        "phone": phone

    }


 /*
  var collection = {
  "name": name,
  "email": email,
  "password": pass,
  "phone": phone
  }
*/

var cursor = db.getAllDocuments();

  // var cursor = db.collection('details').find({name});
var ret = [];
var results = cursor; //.each();

//var done = "this.res.statusCode = 200; this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*'); var html = fs.readFileSync(path.join(__dirname + "/index.html")); this.res.write(html); this.res.end();";
function trw() {
  var html = fs.readFileSync(path.join(__dirname + "/signup_success.html"));

  this.res.write(html);
}
function getAllDocs() {

db.getAllDocuments()
//db.collection('details').find({name}).toArray(function(err, docs) {
//if(err) throw err;

if (docs < 1) {
//additFunc();
console.log("error");
throw err;
//var html = fs.readFileSync(path.join(__dirname + "/signup_success.html"));

}
if (docs) {
//cmdit();
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
  console.log('displaying commands at /commands_success');
//console.log(docs); //db.close();
}
//});
}

//var res = null;
/*
var res = {
"name": name
}
*/
function additFunc() {
//results.forEach(iterateFunc, errorFunc);

//var one = {{"name": 1}, {unique: true}};
//if (!collection.name) {
db.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log(data.name + "\n User added");
//console.log(result + "\n added");
});

}

function iterateFunc(doc, callback) {

console.log(JSON.stringify(doc, null, 4));


}
function errorFunc(error) {
console.log(error);
}

getAllDocs();


  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var html = fs.readFileSync(path.join(__dirname + "/commands_success/command_success.html"));
//trw();
this.res.write();
//this.res.redirect('signup_success.html');
this.res.end(outputSuccess);
/*
this.res.writeHead(200, {"Content-Type": "text/html"}); 
this.res.end(outputSuccess);
*/
}




//------------------

exports.commandlist = function() {
  var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  var output = commandList.buildHTML(cmdArr, config.bot_name);

  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);

}


exports.teston = function() {


  //console.log('displaying commands at /commands');
  var req = this.req
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);


 // var output = testit(user_name);

  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end();
}


/*router.get('/',(req, res) => {
  res.sendfile("index.html");
});
*/

function sendDelayedMessage(msg, attachments, botID, logID, nickName) {
  setTimeout(function() {
    postMessage(msg, attachments, botID, logID, nickName);
   // logMessage(msg, attachments, logID, logName);

  }, config.delay_time);
}

function postMessage(botResponse, attachments, botID, logID, nickName) {
  var options, body, botReq, logReq, botID, logID, nickName;
botID = botID;
logID = "b6c42cc2a1bee3c38f07723d78";
var chalk = require('chalk');
//chalk.enabled = true;
var nN = chalk.red;

var date = moment.tz('America/Toronto').format('LLLL');

//var nn = moment.tz().format('LLLL');
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



  //console.log('sending response to ' + nickName + '\n' + botResponse);



botReq = HTTPS.request(options, function(res) {
//console.log('\x1b[31m%s\x1b[0m', 'Hi' + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode + '\n' + botResponse)
var chalk = require('chalk');





console.log('\n' + nickName);
console.log(date);
//console.log(nn);



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

//-------




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
    "bot_id"      : logID,
    "text"        : nickName + "\n" + botResponse
  };



/* body1 = {

    "attachments" : attachments,
    "bot_id"      : logID,
    "text"        : nickName + "\n" + botResponse
  };
*/


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

 // console.log('sending response to ' + logName + '\n' + botResponse);



logReq = HTTPS.request(options, function(res) {
console.log(logName + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode + '\n' + botResponse)


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


/*
function logMessage(logResponse, attachments, request, botID, bot_id, logName, botRoom, callback) {
  var options, body, logReq, logName, bot_id, logID, botRoom;
var botName;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


for (room in rooom) {
room = rooom[room];

//var logName = '';
      if (request.currentBot == '308boonbot') { // == 'b6c42cc2a1bee3c38f07723d78') {
           logName = "BoonBot";
       /*     } else if (id == '282865de8ce30137567238148f') {
           logName = '308BoonBot';
           } else if (id == '8631a4c35f0f0f250bd5d46f44') {
           logName = 'FlynnBot';
           } else if (id == '2184cee4d169628e83e82ee05f') {
           logName = 'AshleyBot';
           } else {
             logName = bot_id;

}

  body = {

    "attachments" : attachments,
    "bot_id"      : "b6c42cc2a1bee3c38f07723d78",
   // "text"        : logName
    "text"        : logName + logResponse
    //"name"        : logName
  };





logReq = HTTPS.request(options, function(res) {
console.log('Status: ' + res.statusMessage + ', Status code: ' + res.statusCode)
      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });


  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
    //logReq.end(JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });

logReq.on('end', function() {
this.res.writeHead(200); //, {"Content-Type": "application/json"});
this.res.end();
});

 // logReq(logName));



  logReq.end(JSON.stringify(body));
}


}

*/
