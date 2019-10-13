//'use strict';

//require('dotenv').config();
var set = require('./nest21');


var nodemailer = require('nodemailer');


var fun_mode = true;
var sysCommands = [dateCmd, funCmd, noFunCmd, idCmd, aboutCmd, goCmd, nest21Cmd];

exports.modName = "System Commands";

exports.checkCommands = function(dataHash, callback) {
  for (command in sysCommands) {
    var test = sysCommands[command](dataHash, callback);
    if (test)
      return test;
  }

  return false;
}

exports.fun_mode = function(){
  return fun_mode;
}

exports.getCmdListDescription = function () {
  return [
    {cmd: "/date", desc: "Current date"},
    {cmd: "/fun", desc: "Enable commands designated as fun commands", mod: true},
    {cmd: "/nofun", desc: "Disable commands designated as fun commands", mod: true},
    {cmd: "/id", desc: "Notifies the requester of their GroupMe ID"},
    {cmd: "/about", desc: "Responds with a short message about the bot"},
    {cmd: "/go", desc: "Send a test email to bot", mod: true},
    {cmd: "/nest21", desc: "Set Nest temperature to 21 degrees celsius"}
  ];
}


function dateCmd(dataHash, callback) {
  var regex = /^\/date$/;
  //var date = new Date();


var date = new Date().toLocaleDateString();

//var time = new Date().toLocaleTimeString();

  if (regex.test(dataHash.request.text)) {
callback(true, date);
  //if (regex.test(dataHash.request.text)) {
    //callback(true, time);
// --var datetime = new Date();
// --console.log(datetime);
//console.log(estDate);
//callback(datetime);
//return (new Date());
} else {
return false;
}
}

function funCmd(dataHash, callback) {
  var regex = /^\/fun$/;

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {
      if (fun_mode) {
        callback(true, "I'm already as much fun as I can be!", []);
      } else {
        fun_mode = true;
        callback(true, "I'm fun again!", []);
      }
    } else {
      callback(true, "You're not the boss of me", []);
    }
  } else {
    return false;
  }
}

function noFunCmd(dataHash, callback) {
  var regex = /^\/nofun$/;

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {
      if (!fun_mode) {
        callback(true, "I can't be any less fun right now.", []);
      } else {
        fun_mode = false;
        callback(true, "I'm no fun anymore!", []);
      }
    } else {
      callback(true, "You're not the boss of me", []);
    }
  } else {
    return false;
  }
}

function idCmd(dataHash, callback) {
  var regex = /^\/id$/;

  if (regex.test(dataHash.request.text)) {
    callback(true, "Your groupme id is: " + dataHash.request.sender_id);
  } else {
    return false;
  }
}

function aboutCmd(dataHash, callback) {
  var regex = /^\/about$/;

  if (regex.test(dataHash.request.text)) {
    callback(true, "Groupme Bot Beta Version 0.1 By Fo0. If you're interested the source can be found at:\n\nhttps://github.com/jmatty1983/Groupme-Bot.\n\nFeel free to fork and contribute! Thanks!");
  } else {
    return false;
  }
}


//**********************************************************************

function goCmd(dataHash, callback) {
  var regex = /^\/go$/;

//var go = require('./server');
  if (regex.test(dataHash.request.text)) {
var nodemailer = require('nodemailer');
var Transport = nodemailer.createTransport('smtp://dstl%5Fmike1%40hotmail.com:113Hopest%21@smtp-mail.outlook.com');


//var Transport = nodemailer.createTransport({
//host: 'smtp-mail.outlook.com', // hostname 
//secureConnection: false, // TLS requires secureConnection to be false 
//port: 465, // port for secure SMTP 
//auth: {
//type: 'OAuth2',
//user: 'dstl_mike1@hotmail.com',
//pass: '113Hopest!'
// Your gmail address.
// Not @developer.gserviceaccount.com
//clientId: '33283131522-cq29rhd7rljomaj05rmj3akduug5ssag.apps.googleusercontent.com',
//clientSecret: 'q4c5EwEjj55y49uI3jiOTuFf',
//refreshToken: '1/erwx2VawfafgCpfx6N674Nzdae4klHplI9qAV4ZI5HM'

//}
//}
//});

var mailOptions = {
to: 'alexdeabot@gmail.com',
from: 'dstl_mike1@hotmail.com',
subject: 'Hello',
generateTextFromHTML: true,
html: '<b>Hello world</b>'
};

Transport.sendMail(mailOptions, function(error, response) {
//transporter.sendMail(mailOptions, function(error, info){ 
//if(error) { 
//res.send(400); 
//} else { 
//res.send(202); 
//} 
//});

if (error) {
console.log(error);
} else {
console.log(response);
}
//Transport.close();
});
}
}

//---------


function nest21Cmd(dataHash, callback) {
  var regex = /^\/nest21$/;

if (regex.test(dataHash.request.text)) {
  var nest21 = require('./nest21');
nest21;
} else {
return false;
}
};

//----------

function nest20Cmd(dataHash, callback) {
  var regex = /^\/nest20$/;

//if (regex.test(dataHash.request.text)) {
  var nest20 = require('./nest21');
set.nest20;
//} else {
//return false;
}
};
