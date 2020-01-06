//A module for handling responses triggered by AlexBot commands
var alexbot;
var db_table = 'alex_bot';
var alexBotCommands = [addAlexBotCmd, describeAlexBotCmd];
var db = require('../modules/db.js');
//var mods = require('../modules/mods');

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

exports.checkCommands = function(dataHash, callback) {
  if (dataHash.isMod) 
    for (alexb in alexbot) {
      alexb = alexbot[alexb];
   //if(trigger.name == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;

     var alexbReg = new RegExp(alexb.regex, "i");
       
        
      if (alexb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && alexbReg.test(dataHash.request.text)){
        var val = alexbReg.exec(dataHash.request.text);

        callback(true, alexb.message, []);
        break;
      }
    }
  

  for (cmd in AlexBotCommands) {
    var test = AlexBotCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
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

function addAlexBotCmd(request, bots, isMod, callback) {
  var regex = /^\/addalexbot (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " you have no power here!";
      callback(true, msg, []);
      return msg;
    }

    for (alexb in alexbot) {
      if (alexbot[alexb].name == val[1]) {
        var msg = val[1] + " already exists";
        callback(true, msg, []);
        return msg;
      }
    }

    var alexbHash = {
      name: val[1],
      regex: val[1],
      message: val[2],
      bots: Object.keys(bots)
    };

    alexbot.push(alexbHash);
    addAlexBotToDB(alexbHash);
    var msg = val[1] + " AlexBot command added!";
    callback(true, msg, []);
    return msg;
  }
}

function describeAlexBotCmd(request, bots, isMod, callback) {
  var regex = /^\/describealexbot (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (alexb in alexbot) {
      if (alexbot[alexb].name == val[1]) {
        alexbot[alexb]["description"] = val[2];
        updateAlexBotDesc(alexbot[alexb]);
        var msg = val[1] + " AlexBot command description updated";

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}
