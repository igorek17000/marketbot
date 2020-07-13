//
//A module for handling responses triggered by FlynnBot commands
var flynnbot;
var db_table = 'flynn_bot_timesheet';
var moment = require('moment'); 
var date = moment().utcOffset(-240).format('LLLL');
var flynnBotCommands = [addFlynnBotCmd, describeFlynnBotCmd, sundayFlynnBotCmd, mondayFlynnBotCmd, tuesdayFlynnBotCmd, wednesdayFlynnBotCmd, thursdayFlynnBotCmd, fridayFlynnBotCmd, saturdayFlynnBotCmd];
var db = require('../modules/db.js');
var config = require('../config/config.js');
//var mods = require('../modules/mods');
var rooms = require('../modules/rooms.js');
var bot = require('../bot.js')
var botName; //= '';
var that = this;

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
setTimeout(function() {
  db.addDoc(db_table, flynnb, callback);
  }, config.delay_update);
}

function updateFlynnBotDesc(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name }, { $set: { "description": flynnb.description }}, callback);
}

function updateFlynnBotCurrentDate(flynnb, callback) {
setTimeout(function() {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "current": date}}, callback);
}, config.delay_one);
}

function updateFlynnBotRegexCurrentDate(flynnb, callback) {
//setTimeout(function() {
db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "regexcurrent": flynnb.regexcurrent }}, callback);   //flynnb.regexcurrent }}, callback);
//}, 200);
}

function updateFlynnBotCurrent(flynnb, callback) {
setTimeout(function() {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $rename: { "current": "lastUpdate" }}, callback);
}, config.delay_three);
}

function updateFlynnBotRegexCurrent(flynnb, callback) {
setTimeout(function() {
    db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $rename: { "regexcurrent": "botRoom" }}, callback);
}, config.delay_two);
}






/*
function updateFlynnBotCurrent(flynnb, callback) {
  db.updateOneDoc(db_table, { "current": flynnb.current } || { "current": flynnbot[flynnb]["current"] }, { $set: { "current": date, "regexcurrent": date }}, callback);
}

function updateFlynnBotRegexCurrent(flynnb, callback) {
setTimeout(function() {
    db.updateOneDoc(db_table, { "current": flynnb.current } || { "current": flynnbot[flynnb]["current"] }, { $rename: { "current": "lastUpdate", "regexcurrent": "completed" }}, callback);
  }, config.delay_rename);
}
*/

function updateFlynnBotSun(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "sunday": flynnb.sunday }}, callback);
}

function updateFlynnBotMon(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "monday": flynnb.monday }}, callback);
}

function updateFlynnBotTue(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "tuesday": flynnb.tuesday }}, callback);
}

function updateFlynnBotWed(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "wednesday": flynnb.wednesday }}, callback);
}

function updateFlynnBotThu(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "thursday": flynnb.thursday }}, callback);
}

function updateFlynnBotFri(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "friday": flynnb.friday }}, callback);
}

function updateFlynnBotSat(flynnb, callback) {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $set: { "saturday": flynnb.saturday }}, callback);
}


exports.checkCommands = function(dataHash, callback) {
  //if (dataHash.isMod) 
    for (flynnb in flynnbot) {
      flynnb = flynnbot[flynnb];
   //if(cmd.name == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;



     var flynnbReg = new RegExp(flynnb.regex, "i"); //|| new RegExp(flynnb.regexcurrent, "i"); //|| (flynnb.regexcurrent, "i"); // || new RegExp(flynnb.regexcurrent, "i"); 
     var flynnbcReg = new RegExp(flynnb.regexcurrent, "i");  
        
//if (flynnbReg.test(dataHash.request.text) || flynnbcReg.test(dataHash.request.text))
//continue;
      //if (flynnb.current == "current") 
     // flynnbReg = new RegExp(flynnb.regexcurrent, "i"); //.regex == flynnb.regex || flynnb.regexcurrent == flynnb.regex; //var flynnbcReg = new RegExp(flynnb.regexcurrent, "i");
  

     // // if (flynnb.regex(dataHash.request.text))
if (dataHash.request.text == "/current" && flynnb.regexcurrent == "^/current$") //     flynnb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
     flynnbReg = new RegExp(flynnb.regexcurrent, "i");
   
     
      if (dataHash.request.text && flynnbReg.test(dataHash.request.text)){  //      flynnb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbReg.test(dataHash.request.text)){
        var val = flynnbReg.exec(dataHash.request.text); // || flynnbcReg.exec(dataHash.request.text) ;
      
      //if (dataHash.request.text && flynnbcReg.test(dataHash.request.text)){  //     flynnb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
      //var val = flynnbcReg.exec(dataHash.request.text);
   

     // if (flynnb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
      //  var val = flynnbcReg.exec(dataHash.request.text);



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
        var intro = "FlynnBot Timecard for " + flynnb.name + "\n";
         callback(true, "FlynnBot Timecard for " + flynnb.name + "\n" + msg, flynnb.attachments, []); //, []);
    

    break;
} 
} 




  for (cmd in flynnBotCommands) {
    var test = flynnBotCommands[cmd](dataHash.request, dataHash.bots, dataHash.currentBot, dataHash.isMod, callback);
    if (test)
      return test;
  }
 }


//exports.botName = "FlynnBot";

exports.setAll = function(flynnbHash) {
  flynnbot = flynnbHash;
}

exports.getAll = function() {
  return flynnbot;
}

exports.getCmdListDescription = function () {
  return null;
}

function addFlynnBotCmd(request, bots, isMod, currentBot, callback) {
  var regex = /^\/timesheet add (.+?) ([\s\S]+)/i;
  var reqText = request.text;
  var path = path || 'path' || Path || PATH || 'Path' || 'PATH';
  var botRoom;
  var botName = Object.values(currentBot);
  var data = path;
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
        
      }l
    }
    if (flynnbot[flynnb].current || flynnbot[flynnb].regexcurrent) {


//if (flynnbot["rooms"].name == rooms.getRoom(room)) { // botRoom == '308boonbot') {
//botName = Object.values(currentBot); //rooms.getUserPath(botRoom);

//if (rooms.getRoom().room) //&& botRoom == '308boonbot') { //flynnbot[flynnb].bots.indexOf(getARoom.type) > -1 && botRoom == 'true') {
botName = Object.values(rooms.getData(botRoom)); //botName = Object.keys(currentBot); //(botRoom).type; //botRoom; 

flynnbot[flynnb]["regexcurrent"] = botName; //rooms.getUserPath(); //botName; //rooms.getARoom();
        updateFlynnBotCurrentDate(flynnbot[flynnb]);
        updateFlynnBotRegexCurrentDate(flynnbot[flynnb]);
     updateFlynnBotCurrent(flynnbot[flynnb]);
       updateFlynnBotRegexCurrent(flynnbot[flynnb]);
       
        //var msg = "Current week updated";
        //callback(true, msg, []);
       // }
}
/*
//for (flynnb in flynnbot) {   
      if (flynnbot[flynnb].current || flynnbot[flynnb].regexcurrent) {
       updateFlynnBotCurrent(flynnbot[flynnb]);
       updateFlynnBotRegexCurrent(flynnbot[flynnb]);
       
        //var msg = "Current week updated";
        //callback(true, msg, []);
        }
      */
        
      var flynnbHash = {
      name: val[1].toLowerCase(),
      regex: "^\/" + val[1] + "$",
      regexcurrent: "^\/" + "current" + "$",
      message: val[2],
      description: "Timesheet week of " + val[1],
      bots: Object.keys(bots),
      botIDs: Object.values(bots),
      //bot: Object.keys(currentBot),
      //botRoom: Object.values(currentBot),
      current: "current",
      date: date
     };
    
    flynnbot.push(flynnbHash);
    addFlynnBotToDB(flynnbHash);
    var msg = "FlynnBot timesheet added and current week updated! Description set for week of " + val[1];
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
        var msg = "FlynnBot timesheet description updated for " + flynnbot[flynnb].name;

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
  
    var msg = "Current week not set";
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
