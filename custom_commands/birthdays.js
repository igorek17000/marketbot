var commands;
var birthdayCommands = [addCmd, addressCmd, answerCmd, getCmd, describeCmd, editCmd, modCommandCmd, removeCmd];

var db = require('../modules/db.js');
var db_table = 'commands';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');


getAllCommands();
exports.modName = "Birthday Commands";

function getAllCommands() {
  db.getAllDocuments(db_table, function(res){
    commands = res;
  });
}

exports.getAllCommands = function(){
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
  }

  db.updateOneDoc(db_table, findHash, updateJson, callback);
}

function describeCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "description": cmd["description"]
    }
  };

  updateCmdDB(cmd, updateHash, callback);
}

function changeMsgCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "message": cmd["message"]
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


  for (cmd in birthdayCommands) {
    var test = birthdayCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}

exports.setAll = function(bHash) {
  commands = bHash;
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



function birthdayAddCmd(request, bots, isMod, callback) {
  var regex = /^\/birthday add (.+?) (.+?) (.+?) (.+?) (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to add commands"
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].name == val[1]) {
        var msg = val[1] + " already exists";
        callback(true, msg, []);
        return msg;
      }
    }

    var bHash = {
      name: val[1].toLowerCase(),
      full: val[1] + val[2], 
      day: val[3]
      month: val[4],
      year: val[5],
      regex: "^\/" + "birthday " + val[1] + "$",
      message: val[6],
      description: val[1] + val[2] + "'s date of birth.",
      date: date
    };

    commands.push(bHash);
    addCmdToDB(bHash);
    var msg = val[1] + " command added! please use \"/cmd describe " + val[1] + " <description>\" to add a description for your new command";
    callback(true, msg, []);
    return msg;
  }
}

function birthdayDescribeCmd(request, bots, isMod, callback) {
  var regex = /^\/birthday describe (.+?) (.+?) ([\s\S]+)/i;
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
        commands[cmd]["description"] = val[3];
        birthdayDescribeCmdDB(commands[cmd]);

        var msg = commands[cmd].full + "'s date of birth description updated";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}

//----------
/*
function addressCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd address (.+?) (.+?) ([\s\S]+)/i;
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
        commands[cmd]["address"] = val[2];
        addressCmdDB(commands[cmd]);

        var msg = val[1] + " address updated";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}
//-------
function modCommandCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd mod (.+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to mod a command";
      callback(true, msg, []);
      return msg;
    }
    //val[2] = 'true';
    for (cmd in commands) {
      if (commands[cmd].name == val[1].toLowerCase()) {
       
        commands[cmd]["mod"] = true;
        modCommandCmdDB(commands[cmd]);

        var msg = val[1] + " Command has been updated";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}

//-------
*/
//----------

function removeCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd remove (.+)/i;
  var reqText = request.text.toLowerCase();

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to remove commands"
      callback(true, msg, []);
      return msg;
    }

    val[1] = val[1].toLowerCase();

    for (cmd in commands) {
      if (commands[cmd].name == val[1]) {
        deleteCmdFromDB(commands[cmd]);
        commands.splice(cmd, 1);
        var msg = val[1] + " command deleted for ever and ever and ever and ... you get it.";
        callback(true, msg, []);
        return msg;
      }
    }

    callback(true, "No such command.", []);
    return msg;
  }
}


function editCmd(request, bots, isMod, callback) {
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
