//A module for handling responses triggered by FlynnBot commands
var flynnbot;
var db_table = 'flynn_bot_timesheet';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');
var flynnBotCommands = [addFlynnBotCmd, describeFlynnBotCmd, sundayFlynnBotCmd, mondayFlynnBotCmd, tuesdayFlynnBotCmd, wednesdayFlynnBotCmd, thursdayFlynnBotCmd, fridayFlynnBotCmd, saturdayFlynnBotCmd];
var db = require('../modules/db.js');
//var mods = require('../modules/mods');

getAllFlynnbot();
exports.modName = "flynnBot";

function getAllFlynnbot() {
  db.getAllDocuments(db_table, function(res){
    flynnbot = res;
  });
}

function updateDbCurrent(flynnb, updateJson, callback){
  var findHash = {
    "current": flynnb.current
  };

  db.updateOneDoc(db_table, findHash, updateJson, callback);
}

function addFlynnBotToDB(flynnb, callback) {
  db.addDoc(db_table, flynnb, callback);
}

function updateFlynnBotDesc(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name}, {$set: { "description": flynnb.description}}, callback);
}

function updateFlynnBotCurrent(flynnb, callback) {
  //var uncurrentHash = {
    //$unset: {
    //"current": flynnb["current"]
  //}
  //};
    

//var findHash = {
    //"current": flynnb.current
 // };

  db.updateOneDoc(db_table, {"current": flynnb.current}, {$unset: { "current":"flynnb.current"}}, callback);
}

function updateFlynnBotSun(flynnb, callback) {
  db.updateOneDoc(db_table, {"name": flynnb.name} || {"current": flynnb.current}, {$set: { "sunday": flynnb.sunday}}, callback);
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
    for (flynnb in flynnbot) {
      flynnb = flynnbot[flynnb];
   //if(trigger.name == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;

     var flynnbReg = new RegExp(flynnb.regex, "i");
       
        
      if (flynnb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbReg.test(dataHash.request.text)){
        var val = flynnbReg.exec(dataHash.request.text);

        var msg = "";
    if (!flynnb.sunday) {
      msg = "Please submit hours for Sunday";
    } else if (!flynnb.monday) {
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
        //callback(msg, []);
        
        
        //callback(true, "Sunday\n" + "Captured " + flynnb.sunday + "\n" + "Monday\n" + "Captured " + flynnb.monday + "\n" + "Tuesday\n" + "Captured " + flynnb.tuesday + "\n" + "Wednesday\n" + "Captured " + flynnb.wednesday + "\n" + "Thursday\n" + "Captured " + flynnb.thursday + "\n" + "Friday\n" + "Captured " + flynnb.friday + "\n" + "Saturday\n" + "Captured " + flynnb.saturday, []);
        break;
      }
    }

  for (cmd in flynnBotCommands) {
    var test = flynnBotCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
 }


exports.setAll = function(flynnbHash) {
  flynnbot = flynnbHash;
}

exports.getAll = function() {
  return flynnbot;
}

exports.getCmdListDescription = function () {
  return null;
}

function addFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet add (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " you have no power here!";
      callback(true, msg, []);
      return msg;
    }

    for (flynnb in flynnbot) {   
      if (flynnbot[flynnb].name == val[1]) {
        var msg = val[1] + " already exists";
        callback(true, msg, []);
        return msg;
        
      }
    }
    
      if (flynnbot[flynnb].current) {
        updateFlynnBotCurrent(flynnbot[flynnb]);
        //var msg = "Current week updated";
        //callback(true, msg, []);
        }
      
        
      var flynnbHash = {
      name: val[1].toLowerCase(),
      regex: "^\/" + val[1] + "$",
      message: val[2],
      bots: Object.keys(bots),
      current: "current",
      date: date
     };
    
    flynnbot.push(flynnbHash);
    addFlynnBotToDB(flynnbHash);
    var msg = val[1] + " FlynnBot timesheet added! Use '/timesheet describe " + val[1] + " to add a description";
    callback(true, msg, []);
    return msg;
  }
}


function describeFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet describe (.+?) ([\s\S]+)/i;
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
        flynnbot[flynnb]["description"] = val[2];
        updateFlynnBotDesc(flynnbot[flynnb]);
        var msg = val[1] + " FlynnBot timesheet description updated for " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }
   
  
  var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}



function sundayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet sunday (.+?) ([\s\S]+)/i;
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
        flynnbot[flynnb]["sunday"] = val[2];
        updateFlynnBotSun(flynnbot[flynnb]);
                
        var msg = "FlynnBot timesheet hours captured for Sunday, week of " + flynnbot[flynnb].name;

        callback(true, msg, []);
        return msg;
      }
    }
    
if (flynnbot[flynnb].current == val[1]) {
        flynnbot[flynnb]["sunday"] = val[2];
updateFlynnBotSun(flynnbot[flynnb]); 

    var msg = "FlynnBot timesheet hours captured for Sunday, week of " + flynnbot[flynnb].name;
    callback(true, msg, []);
    return msg;
}
  
    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}

function mondayFlynnBotCmd(request, bots, isMod, callback) {
  var regex = /^\/timesheet monday (.+?) ([\s\S]+)/i;
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
        flynnbot[flynnb]["monday"] = val[2];
        updateFlynnBotMon(flynnbot[flynnb]);
        var msg = val[1] + " FlynnBot timesheet hours captured for Monday, week of " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
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
        var msg = val[1] + " FlynnBot timesheet hours captured for Tuesday, week of " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
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
        var msg = val[1] + " FlynnBot timesheet hours captured for Wednesday week of " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
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
        var msg = val[1] + " FlynnBot timesheet hours captured for Thursday, week of " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
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
        var msg = val[1] + " FlynnBot timesheet hours captured for Friday, week of " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
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
        updateFlynnBotSun(flynnbot[flynnb]);
        var msg = val[1] + " FlynnBot timesheet hours captured for Saturday, week of " + val[1];

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}
//
