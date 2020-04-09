var commands;
var birthdayCommands = [addCmd, addressCmd, answerCmd, getCmd, describeCmd, editCmd, modCommandCmd, removeCmd];

var db = require('../modules/db.js');
var db_table = 'birthdays';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');


getAllCommands();
exports.modName = "Birthday Commands";

function getAllCommands() {
  db.getAllDocuments(db_table, function(res){
    birthdays = res;
  });
}

exports.getAllCommands = function(){
db.getAllDocuments(db_table, function(res){
    birthdays = res;
  });
}

function addCmdToDB(bday, callback) {
  db.addDoc(db_table, bday, callback);
}

function updateCmdDB(bday, updateJson, callback){
  var findHash = {
    "name": bday["name"]
  }

  db.updateOneDoc(db_table, findHash, updateJson, callback);
}

function describeCmdDB(bday, callback) {
  var updateHash = {
    $set: {
      "description": bday["description"]
    }
  };

  updateCmdDB(bday, updateHash, callback);
}

function changeMsgCmdDB(bday, callback) {
  var updateHash = {
    $set: {
      "message": bday["message"]
    }
  };

  updateCmdDB(bday, updateHash, callback);
}

function deleteCmdFromDB(bday, callback){
  var findJson = { "name": bday["name"] };

  db.removeOneDoc(db_table, findJson);
}

//exports
exports.checkCommands = function(dataHash, callback) {
  for (bday in birthdays) {
    bday = birthdays[bday];
    //hard coded temporarily ... maybe permanently ... losing motivation to work on this
    if(bday.name == 'cc' && dataHash.currentBot.type == 'hp')
      continue;
    var cmdReg = new RegExp(bday.regex, "i");
    if (dataHash.request.text && cmdReg.test(dataHash.request.text)){
      var val = cmdReg.exec(dataHash.request.text);

      callback(true, bday.message, bday.attachments);
      break;
    }
  }


  for (cmd in birthdayCommands) {
    var test = birthdayCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}

exports.setAll = function(cmdHash) {
  birthdays = cmdHash;
}

exports.getAll = function() {
  return birthdays;
}

exports.getCmdListDescription = function () {
  cmdArr = [
    {cmd: "/cmd add 'name' 'message'", desc: "Add a new custom command", mod: true},
    {cmd: "/cmd describe 'name' 'description'", desc: "Adds a description to a custom command for this command list", mod: true},
    {cmd: "/cmd edit 'name' 'message with tags'", desc: "Changes the response of an existing command", mod: true},
    {cmd: "/cmd remove 'name'", desc: "Deletes a custom command", mod: true}
  ];

  for (cmd in birthdays) {
    cmdArr.push({cmd: "/" + birthdays[cmd].name, desc: birthdays[cmd].description});
  }

  return cmdArr;
}



function addCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd add (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);
    var vel = val[5];

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

    var cmdHash = {
      name: val[1].toLowerCase(),
      regex: "^\/" + val[1] + "$",
      message: val[2],
      date: date
    };

    commands.push(cmdHash);
    addCmdToDB(cmdHash);
    var msg = val[1] + " command added! please use \"/cmd describe " + val[1] + " <description>\" to add a description for your new command";
    callback(true, msg, []);
    return msg;
  }
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

//----------
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
