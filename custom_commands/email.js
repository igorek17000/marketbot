//A module for sending e-mails
var commands;
var db_table = 'email';
var db_tables = 'email_draft';
var db_tabled = 'email_sent';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');
var emailCommands = [addFlynnBotCmd, describeFlynnBotCmd, sundayFlynnBotCmd, mondayFlynnBotCmd, tuesdayFlynnBotCmd, wednesdayFlynnBotCmd, thursdayFlynnBotCmd, fridayFlynnBotCmd, saturdayFlynnBotCmd];
var db = require('../modules/db.js');
//var mods = require('../modules/mods');

getAllCommands();
exports.modName = "email";

function getAllCommands() {
  db.getAllDocuments(db_table, function(res){
    commands = res;
  });
}



function addEmailToDB(cmd, callback) {
  db.addDoc(db_table, cmd, callback);
}

function updateDraft(flynnb, updateJson, callback){
  var findHash = {
    "draft": cmd.draft
  };

  db.updateOneDoc(db_table, findHash, updateJson, callback);
}

function updateUndraft(cmd, callback) {
  db.updateOneDoc(db_table, {"draft": cmd.draft}, {$unset: { "draft": cmd.draft}}, callback);
}

function updateSubject(cmd, callback) {
  db.updateOneDoc(db_table, {"draft": cmd.draft}, {$set: { "subject":"cmd.subject"}}, callback);
}

function updateBody(cmd, callback) {
  db.updateOneDoc(db_table, {"draft": cmd.draft}, {$set: { "body": cmd.body}}, callback);
}

function updateFlynnBotMon(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "monday": flynnb.monday}}, callback);
}

function updateFlynnBotTue(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "tuesday": flynnb.tuesday}}, callback);
}

function updateFlynnBotWed(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "wednesday": flynnb.wednesday}}, callback);
}

function updateFlynnBotThu(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "thursday": flynnb.thursday}}, callback);
}

function updateFlynnBotFri(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "friday": flynnb.friday}}, callback);
}

function updateFlynnBotSat(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "saturday": flynnb.saturday}}, callback);
}


exports.checkCommands = function(dataHash, callback) {
  if (dataHash.isMod) 
    for (cmd in commands) {
      cmd = commands[cmd];
   //if(trigger.name == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;

     var cmdReg = new RegExp(cmd.regex, "i"); 

     //var flynnbcReg = new RegExp(flynnb.regexcurrent, "i");  
        
      if (dataHash.request.text && cmdReg.test(dataHash.request.text)){
        var val = cmdReg.exec(dataHash.request.text);
      
     // } else if (flynnbc.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
        //var val = flynnbcReg.exec(dataHash.request.text);
   

      //if (flynnb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
        //var val = flynnbcReg.exec(dataHash.request.text);



        var msg = "";
    if (!cmd.sunday) {
      msg = "Please submit hours for Sunday";
    } else if (!cmd.monday) {
      msg = "Sunday\n" + flynnb.sunday;
    } else if (!flynnb.tuesday) {
      msg = "Sunday\n" + flynnb.sunday + "\n" + "Monday\n" + flynnb.monday;
    } else if (!flynnb.wednesday) {
      msg = "Sunday\n" + flynnb.sunday + "\n" + "Monday\n" + flynnb.monday + "\n" + "Tuesday\n" + flynnb.tuesday;
    } else if (!flynnb.thursday) {
      msg = "Sunday\n" + flynnb.sunday + "\n" + "Monday\n" + flynnb.monday + "\n" + "Tuesday\n" + flynnb.tuesday + "\n" + "Wednesday\n" + flynnb.wednesday;
    } else if (!flynnb.friday) {
      msg = "Sunday\n" + flynnb.sunday + "\n" + "Monday\n" + flynnb.monday + "\n" + "Tuesday\n" + flynnb.tuesday + "\n" + "Wednesday\n" + flynnb.wednesday + "\n" + "Thursday\n" + flynnb.thursday;
    } else if (!flynnb.saturday){
      msg = "Sunday\n" + flynnb.sunday + "\n" + "Monday\n" + flynnb.monday + "\n" + "Tuesday\n" + flynnb.tuesday + "\n" + "Wednesday\n" + flynnb.wednesday+  "\n" + "Thursday\n" + flynnb.thursday + "\n" + "Friday\n" + flynnb.friday;
    } else {
      msg = "Sunday\n" + flynnb.sunday + "\n" + "Monday\n" + flynnb.monday + "\n" + "Tuesday\n" + flynnb.tuesday + "\n" + "Wednesday\n" + flynnb.wednesday + "\n" + "Thursday\n" + flynnb.thursday + "\n" + "Friday\n" + flynnb.friday + "\n" + "Saturday\n" + flynnb.saturday;
    }
         callback(true, flynnb.name + "\n" + msg, []);
    

    break;
    }
  }

  for (cmd in emailCommands) {
    var test = emailCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
 }


exports.botName = "emailBot";

exports.setAll = function(emailHash) {
  commands = emailHash;
}

exports.getAll = function() {
  return commands;
}

exports.getCmdListDescription = function () {
  return null;
}

function addEmailCmd(request, bots, isMod, callback) {
  var regex = /^\/email ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " you have no power here!";
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {   
      if (commands[cmd].draft) {
        updateUndraft(commands[cmd]);
        //var msg = "Current week updated";
        //callback(true, msg, []);
        }
      
        
      var emailHash = {
      name: "Drafted by " + request.name + " on " + date,
      to: val[1];
      draft: "draft",
      description: "Email Bot",
      date: date
     };
    
    commands.push(emailHash);
    addEmailToDB(emailHash);
    var msg = "Email address received, type /subject followed by email subject to continue";
    callback(true, msg, []);
    return msg;
  }
}


function addSubjectCmd(request, bots, isMod, callback) {
  var regex = /^\/subject ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].draft) {
        commands[cmd]["subject"] = val[1];
        updateSubject(commands[cmd]);
        var msg = "Email subject recieved, type /body followed by email body to continue";

        callback(true, msg, []);
        return msg;
      }
    }
   
  
 // var msg = val[1] + " doesn't exist";
   // callback(true, msg, []);

   // return msg;
  }
}



function addBodyCmd(request, bots, isMod, callback) {
  var regex = /^\/body ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].draft) {
        commands[cmd]["body"] = val[1];
        updateBody(commands[cmd]);
                
        var msg = "Email body recieved, type /send to send email";

        callback(true, msg, []);
        return msg;
      }
    }
  }
}

function sendEmailCmd(request, bots, isMod, callback) {
  var regex = /^\/sendemail$;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].body && commands[cmd].subject && commands[cmd].to) {
        flynnbot[flynnb]["monday"] = val[2];
        updateFlynnBotMon(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Monday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["monday"] = val[2];
    updateFlynnBotMon(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Monday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = "Current week not set";
    callback(true, msg, []);

    return msg;
  }
}

function tuesdayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet tuesday (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (flynnb in flynnbot) {
      if (flynnbot[flynnb].name == val[1]) {
        flynnbot[flynnb]["tuesday"] = val[2];
        updateFlynnBotTue(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Tuesday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["tuesday"] = val[2];
    updateFlynnBotTue(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Tuesday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = val[1] + "Current week not set";
    callback(true, msg, []);

    return msg;
  }
}

function wednesdayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet wednesday (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (flynnb in flynnbot) {
      if (flynnbot[flynnb].name == val[1]) {
        flynnbot[flynnb]["wednesday"] = val[2];
        updateFlynnBotWed(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Wednesday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["wednesday"] = val[2];
    updateFlynnBotWed(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Wednesday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = "Current week not set";
    callback(true, msg, []);

    return msg;
  }
}

function thursdayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet thursday (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (flynnb in flynnbot) {
      if (flynnbot[flynnb].name == val[1]) {
        flynnbot[flynnb]["thursday"] = val[2];
        updateFlynnBotThu(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Thursday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["thursday"] = val[2];
    updateFlynnBotThu(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Thursday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = val[1] + "Current week not set";
    callback(true, msg, []);

    return msg;
  }
}

function fridayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet friday (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (flynnb in flynnbot) {
      if (flynnbot[flynnb].name == val[1]) {
        flynnbot[flynnb]["friday"] = val[2];
        updateFlynnBotFri(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Friday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["friday"] = val[2];
    updateFlynnBotFri(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Friday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = val[1] + "Current week not set";
    callback(true, msg, []);

    return msg;
  }
}

function saturdayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet saturday (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (flynnb in flynnbot) {
      if (flynnbot[flynnb].name == val[1]) {
        flynnbot[flynnb]["saturday"] = val[2];
        updateFlynnBotSat(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Saturday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["saturday"] = val[2];
    updateFlynnBotSat(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Saturday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = val[1] + "Current week not set";
    callback(true, msg, []);

    return msg;
  }
}
