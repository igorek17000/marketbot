var fun_mode = true;
var sysCommands = [dateCmd, funCmd, noFunCmd, idCmd, aboutCmd, emailCmd];

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
    {cmd: "/email", desc: "Send a test email to bot", mod:true}
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

function emailCmd(dataHash, callback) {
  var regex = /^\/email$/;
  var sendemail =

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {
       callback(true, next)
      
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alexdeabot@gmail.com',
    pass: '308boonave'
  }
});

var mailOptions = {
  from: 'alexdeabot@gmail.com',
  to: 'alexdeabot@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

    } else {
      callback(true, "You are not authorized to send e-mails", []);
    }
  } else {
    return false;
  }
}
