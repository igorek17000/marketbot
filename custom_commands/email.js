
var commands;
var emailCommands = [emailCmd, subjectCmd, deleteCmd, bodyCmd, sendCmd];

var db = require('../modules/db.js');
var db_table = 'email';

var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');

getAllCommands();
exports.modName = "Custom Commands";

function getAllCommands() {
  db.getAllDocuments(db_table, function(res){
    commands = res;
  });
}

function addCmdToDB(cmd, callback) {
  db.addDoc(db_table, cmd, callback);
}

function updateCmdDB(cmd, updateJson, callback){
  var findHash = {
    "name": cmd["name"]
  };

  db.updateOneDoc(db_table, findHash, updateJson, callback);
}

function unsetDraftCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "name": cmd["draft unset"],
      "draft unset date": cmd[date]
    }
  };

  updateCmdDB(cmd, updateHash, callback);
}

function sentCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "name": cmd["sent"],
      "sent date": cmd[date]
    }
  };

  updateCmdDB(cmd, updateHash, callback);
}




function subjectCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "subject": cmd["subject"]
    }
  };

  updateCmdDB(cmd, updateHash, callback);
}

function bodyCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "body": cmd["body"]
    }
  };

  updateCmdDB(cmd, updateHash, callback);
}

function deleteCmdFromDB(cmd, callback){
  var findJson = { "name": cmd["name"] };

  db.removeOneDoc(db_table, findJson);
}

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

  for (cmd in emailCommands) {
    var test = emailCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}

exports.setAll = function(cmdHash) {
  commands = cmdHash;
}

exports.getAll = function() {
  return commands;
}

exports.getCmdListDescription = function () {
  cmdArr = [
    {cmd: "/email 'email address'", desc: "Send an email", mod: true},
    {cmd: "/subject 'email subject'", desc: "Add a subject to the email to send", mod: true},
    {cmd: "/body 'email body'", desc: "Add the mody to the email to send", mod: true},
    {cmd: "/delete draft", desc: "Deletes email draft", mod: true}
  ];

  for (cmd in commands) {
    cmdArr.push({cmd: "/" + commands[cmd].name, desc: commands[cmd].description});
  }

  return cmdArr;
}


function emailCmd(request, bots, isMod, callback) {
  var regex = /^\/email ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to send emails"
      callback(true, msg, []);
      return msg;
    }

    
      if(cmd.name == "draft") 
        unsetDraftCmdFromDB(commands[cmd]);
        //var msg = "Draft email deleted. You may start another email";
        //callback(true, msg, []);
        //return msg;
      //}
    //}

    var cmdHash = {
      name: "draft",
      email: val[1],
      date: date
     
    };

    commands.push(cmdHash);
    addCmdToDB(cmdHash);
    var msg = "Type /subject followed by email subject to continue";
    callback(true, msg, []);
    return msg;
      }
    }


function subjectCmd(request, bots, isMod, callback) {
  var regex = /^\/subject ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to send emails"
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].name == "draft") {
        commands[cmd]["subject"] = val[1];
        subjectCmdDB(commands[cmd]);

        var msg = "Subject received. Type /body followed by email body to continue";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = "No draft emails available.";
    callback(true, msg, []);

    return msg;
  }
}

function deleteCmd(request, bots, isMod, callback) {
  var regex = /^\/delete draft$/;
  var reqText = request.text.toLowerCase();

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to send emails"
      callback(true, msg, []);
      return msg;
    }

    //val[1] = val[1].toLowerCase();

    for (cmd in commands) {
      if (commands[cmd].name == "draft") {
        deleteCmdFromDB(commands[cmd]);
        commands.splice(cmd, 1);
        var msg = "Email draft deleted. You can start another email by typing /email followed by email address";
        callback(true, msg, []);
        return msg;
      }
    }
    var msg = "No draft emails available."
    callback(true, msg, []);
    return msg;
  }
}


function bodyCmd(request, bots, isMod, callback) {
  var regex = /^\/body ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to edit commands"
      callback(true, msg, []);
      return msg;
    }

    //val[1] = val[1].toLowerCase();
    for (cmd in commands) {
      if (commands[cmd].name == "draft") {
        commands[cmd]["body"] = val[1];
        bodyCmdDB(commands[cmd]);

        var msg = "Email body added. Type /send to send email.";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = "No draft emails available.";
    callback(true, msg, []);
    return msg;
  }
}


function sendCmd(request, callback) {
  var regex = /^\/send$/; 
  var reqText = request.text; 

  if (regex.test(request.text)) {
var nodemailer = require('nodemailer');
    if(cmd.name = "draft") {
    sentCmdDb(commands[cmd]);

var Transport = nodemailer.createTransport({

service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest'
}
});

        

      
       
var mailOptions = {
to: cmd.email,
from: 'alexdeabot@gmail.com',
subject: cmd.subject,
generateTextFromHTML: true,
text: cmd.body
};
      
Transport.sendMail(mailOptions, function(error, response) {

if (error) {
console.log(error);
} else {
console.log(response);
}
Transport.close();
});
}
}
//
