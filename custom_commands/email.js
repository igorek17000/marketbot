
var commands;
var userCommands = [emailCmd, subjectCmd, deleteCmd, bodyCmd];

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

  for (cmd in userCommands) {
    var test = userCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
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
    {cmd: "/cmd add 'name' 'message'", desc: "Add a new custom command", mod: true},
    {cmd: "/cmd describe 'name' 'description'", desc: "Adds a description to a custom command for this command list", mod: true},
    {cmd: "/cmd edit 'name' 'message with tags'", desc: "Changes the response of an existing command", mod: true},
    {cmd: "/cmd remove 'name'", desc: "Deletes a custom command", mod: true}
  ];

  for (cmd in commands) {
    cmdArr.push({cmd: "/" + commands[cmd].name, desc: commands[cmd].description});
  }

  return cmdArr;
}


function emailCmd(request, bots, isMod, callback) {
  var regex = /^\/email (.+?)/i;
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
        deleteCmdFromDB(commands[cmd]);
        commands.splice(cmd, 1);
        //var msg = "Draft email deleted. You may start another email";
        //callback(true, msg, []);
        //return msg;
      //}
    //}

    var cmdHash = {
      name: "draft",
      date: date
     
    };

    commands.push(cmdHash);
    addCmdToDB(cmdHash);
    var msg = "Type /subject followed by email subject to continue;
    callback(true, msg, []);
    return msg;
      }
    }
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
  var regex = /^\/delete draft (.+)/i;
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
        var msg = val[1] + "Email draft deleted. You can start another email by typing /email followed by email address";
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
        commands[cmd].body = val[1];
        bodyCmdDB(commands[cmd]);

        var msg = val[1] + "Email body added. Type /send to send email.";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = "No draft emails available.";
    callback(true, msg, []);
    return msg;
  }
}
