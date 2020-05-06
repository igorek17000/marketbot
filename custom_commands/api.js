//A module for handling responses triggered by AlexBot commands



var alexbot;
var db_table = 'api';
var bot = require('../bot.js');
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');
var apiCommands = [restartPostCmd, restartGetCmd];
var db = require('../modules/db.js');
var http = require('http');
var HTTPS = require('https');


var msg;

getAllAlexbot();
exports.modName = "AlexBot";

function getAllAlexbot() {
  db.getAllDocuments(db_table, function(res){
    alexbot = res;
  });
}

function addAlexBotToDB(alexb, callback) {
  db.addDoc(db_table, alexb, callback);
}

function updateAlexBotDesc(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$set: { "description": alexb.description}}, callback);
}

function updateAlexBotMessage(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$set: { "message": alexb.message}}, callback);
}

function updateAlexBotModDate(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$push: { "date modified": date}}, callback);
}

function updateAlexBotModDateMessage(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$push: { "date modified.date": alexb.message}}, callback);
}

exports.checkCommands = function(dataHash, callback) {
  //if (dataHash.isMod)
  for (alexb in alexbot) {
    alexb = alexbot[alexb];
    //hard coded temporarily ... maybe permanently ... losing motivation to work on this
    //if(alexb.name == 'cc' && dataHash.currentBot.type == 'hp')
      //continue;
    var alexbReg = new RegExp(alexb.regex, "i");
    if (dataHash.request.text && alexbReg.test(dataHash.request.text)){
      var val = alexbReg.exec(dataHash.request.text);
   // if (dataHash.currentBot("282865de8ce30137567238148f")) {
      //var msg = "308BoonBot\n" + alexb.message;
      callback(true, alexb.message, alexb.attachments, []);
      break;
   
  }
}


  for (cmd in apiCommands) {
    var test = apiCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}




exports.setAll = function(alexbHash) {
  alexbot = alexbHash;
}

exports.getAll = function() {
  return alexbot;
}

exports.getCmdListDescription = function () {
  return null;
}





//------------
function restartPostCmd(request, isMod, callback) {
  var regex = /^\/restartt (.+?) ([\s\S]+)/i;
  var reqText = request.text;
  //var https = require('https');
  var options, body, logReq, logID, v3, text, post, endpoint, res;

  if (regex.test(reqText)){
  var val = regex.exec(reqText);


    if (!isMod) {
     callback(true, "Sorry I'm no fun right now.", []);
     return "Sorry I'm no fun right now.";
    }


if (val[1] == "post") {
  text = val[2];

logID = "b6c42cc2a1bee3c38f07723d78";





    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


    body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID, 
    "text"        : text
  };



//var req = http.request(options, callback).end();




  console.log('sending response to text object ');



logReq = HTTPS.request(options, function(res) {  //.end();

console.log(' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


     
  });





  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  logReq.end(JSON.stringify(body));



//var msg = "Posting message\n";
//callback(true, msg, []);
//return msg;

  
}
       
} else {
    


    return false;
  }
}


function restartGetCmd(request, isMod, callback) {
  var regex = /^\/restartt (.+?) ([\s\S]+)/i;
  var reqText = request.text;
  //var https = require('https');
  var options, body, logReq, logID, v3, text, post, endpoint, res;

  if (regex.test(reqText)){
  var val = regex.exec(reqText);


    if (!isMod) {
     callback(true, "Sorry I'm no fun right now.", []);
     return "Sorry I'm no fun right now.";
    }


if (val[1] == "get") {
  text = val[2];

logID = "b6c42cc2a1bee3c38f07723d78";





    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots?token=nQMmW22iRiJY4TL3W3aoWaCbNpkGO0yIVAaHRvaR',
    method: 'GET'
  };

/*
    body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID
    //"text"        : text
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
//callback(str);

body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : str
  };

logReq.end(JSON.stringify(body));

}); 
} 

var req = HTTPS.request(options, callback).end();




  console.log('sending response to text object ');



logReq = HTTPS.request(options, function(res) {  //.end();

console.log(' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


     
  });





  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
 // logReq.end(JSON.stringify(body));



//var msg = "Posting message\n";
//callback(true, msg, []);
//return msg;

  
}
       
} else {
    


    return false;
  }
}





 
  

/*

  console.log('sending response to text object ');

//var req = HTTPS.request(options, callback).end();
*/

//-----------


/*
function restartCmd(request, isMod, callback) {
  var regex = /^\/restart/i;
  var reqText = request.text;
  if (regex.test(reqText)){
    if (!isMod) {
     callback(true, "Sorry I'm no fun right now.", []);
     return "Sorry I'm no fun right now.";
    }



//var msg = require('./postbot');
//callback(true, "One test\n", []);
var msg = require('./postbot');
msg;
       } else {
    


    return false;
  }
}

*/



//callback = function(response) { response.on('data', function (chunk) { str += chunk; }); response.on('end', function () { console.log(req.data); console.log(str); // your code here if you want to use the results ! }); } var req = http.request(options, callback).end();


