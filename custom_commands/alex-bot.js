//A module for handling responses triggered by AlexBot commands



/*var current;
var forecast;
var weatherData = require('weather-js');

var itemArray; //= weather.weatherItem;
var currentArray; //= weather.weatherItem.current;
var forecastArray; //= weather.weatherItem.forecast;
itemArray : weather.weatherItem;
currentArray : weather.weatherItem.null[1];
forecastArray : weather.weatherItem.null[2];
*/


var alexbot;
var db_table = 'alex_bot';
var bot = require('../bot.js');
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');
var alexBotCommands = [addAlexBotCmd, describeAlexBotCmd, editAlexBotCmd, restartCmd];
var db = require('../modules/db.js');
var http = require('http');
var HTTPS = require('https');

var weather = require('weather-js');
var msg;

function current(err, result) { 
weather.find({search: 'M6E4A3, ON', degreeType: 'C'}, function(err, result) {
var result = [];
return result
});
}

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

function updateAlexBotMessage(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$set: { "message": alexb.message}}, callback);
}

function updateAlexBotModDate(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$push: { "date modified": date}}, callback);
}

function updateAlexBotModDateMessage(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$push: { "date modified.date": alexb.message}}, callback);
}

exports.checkCommands = function(dataHash, callback) {
  //if (dataHash.isMod)
  for (alexb in alexbot) {
    alexb = alexbot[alexb];
    //hard coded temporarily ... maybe permanently ... losing motivation to work on this
    //if(alexb.name == 'cc' && dataHash.currentBot.type == 'hp')
      //continue;
    var alexbReg = new RegExp(alexb.regex, "i");
    if (dataHash.request.text && alexbReg.test(dataHash.request.text)){
      var val = alexbReg.exec(dataHash.request.text);
   // if (dataHash.currentBot("282865de8ce30137567238148f")) {
      //var msg = "308BoonBot\n" + alexb.message;
      callback(true, alexb.message, alexb.attachments, []);
      break;
   // }
  }
}


  for (cmd in alexBotCommands) {
    var test = alexBotCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}

//exports.checkCommands = function(dataHash, callback) {
  //if (dataHash.isMod) 
    //for (alexb in alexbot) {
      //alexb = alexbot[alexb];
   //if(trigger.name == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;

     //var alexbReg = new RegExp(alexb.regex, "i");
       
        
      //if (alexb.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && alexbReg.test(dataHash.request.text)){
        //var val = alexbReg.exec(dataHash.request.text);

        //callback(true, alexb.message, []);
        //break;
      //}
    //}
  

  //for (cmd in alexBotCommands) {
    //var test = alexBotCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    //if (test)
      //return test;
  //}
 //}


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
  var regex = /^\/alexbot add (.+?) ([\s\S]+)/i;
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
      name: val[1].toLowerCase(), 
      regex: "^\/" + val[1] + "$",
      message: val[2],
      bots: Object.keys(bots),
      date: date
    };

    alexbot.push(alexbHash);
    addAlexBotToDB(alexbHash);


    var msg = "AlexBot command added! Use '/alexbot describe " + val[1] + "' to add a description";
    callback(true, msg, []);
    return msg;
  }
}

function describeAlexBotCmd(request, bots, isMod, callback) {
  var regex = /^\/alexbot describe (.+?) ([\s\S]+)/i;
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

function editAlexBotCmd(request, bots, isMod, callback) {
  //var regex = /^\/cmd edit (.+?) ([\s\S]+)/i;
  var regex = /^\- (.+?) ([\s\S]+)/i;
  
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to edit commands"
      callback(true, msg, []);
      return msg;
    }

    //val[1] = val[1].toLowerCase();
    //val[1] = "308boonave";
    //alexbot[alexb].name = "308boonave";
    for (alexb in alexbot) {
      if (alexbot[alexb].name == "308boonave") {
        alexbot[alexb].message = "- " + val[1] + " " + val[2];
        updateAlexBotModDate(alexbot[alexb]);
        updateAlexBotMessage(alexbot[alexb]);
        updateAlexBotModDateMessage(alexbot[alexb]);
        

        var msg = alexbot[alexb].name + " message updated.";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + "doesn't exist";
    callback(true, msg, []);
    return msg;
  }
}



//------------
function restartCmd(request, isMod, callback) {
  var regex = /^\/restart (.+?) ([\s\S]+)/i;
  var reqText = request.text;
  //var https = require('https');
  var options, body, logReq, logID, text;

  if (regex.test(reqText)){
  var val = regex.exec(reqText);
var https = require('https');

    if (!isMod) {
     callback(true, "Sorry I'm no fun right now.", []);
     return "Sorry I'm no fun right now.";
    }

if (val[1] == "text") {
  text = val[2];



//function cmdPost(msg, attachments, logID) {
  //var options, body, logReq, logID;
//botID = botID;
logID = "b6c42cc2a1bee3c38f07723d78";
//var msg = val[1];




    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


    body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID, 
    "text"        : text
  };




  console.log('sending response to text object ' + '\n' + msg);

//var https = require('https');

logReq = HTTPS.request(options, function(res) { 
console.log(' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });





  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  logReq.end(JSON.stringify(body));



var msg = "Posting message\n";
//callback(true, msg, []);
//var msg = require('./postbot');
return msg;

  }
       
} else {
    


    return false;
  }
}



//-----------


/*
function restartCmd(request, isMod, callback) {
  var regex = /^\/restart/i;
  var reqText = request.text;
  if (regex.test(reqText)){
    if (!isMod) {
     callback(true, "Sorry I'm no fun right now.", []);
     return "Sorry I'm no fun right now.";
    }



//var msg = require('./postbot');
//callback(true, "One test\n", []);
var msg = require('./postbot');
msg;
       } else {
    


    return false;
  }
}

*/


//-------
/*
function weatherAlexBotCmd(request, bots, isMod, result, callback) {
  var regex = /^\/cmd weather$/;
   //var regex = /^\/(.+?)$/;
  //var regex = /^\- (.+?) ([\s\S]+)/i;
  
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);
var msg;;
    if (!isMod) {
      var msg = "You don't have permission to edit commands"
      callback(true, msg, []);
      return msg;
    }

    //val[1] = val[1].toLowerCase();
    //val[1] = "308boonave";
    //alexbot[alexb].name = "308boonave";
  
// Options:

// search:     location name or zipcode

// degreeType: F or C

 

weather.find({search: 'M6E4A3, ON', degreeType: 'C'}, function(err, result) {

  if(err) 
console.log(err);

 

  console.log(JSON.stringify(result, null, 2));


for (item in itemArray) { 
console.log(item); // logs items in myArray }



//items = itemArray.forEach(item) //{ 
 
weather = weather.find;
weather.getCurrent("Toronto", function(current) { 
console.log( 
["currently:" + current.temperature() + "and" + current.conditions()].join(" ") 
); 
//}); 
Weather.getForecast("Toronto", function(forecast) { 
console.log("Forecast High in Kelvin: " + forecast.high()); 
console.log("Forecast High in Fahrenheit" + Weather.kelvinToFahrenheit(forecast.high())); 
console.log("Forecast High in Celsius" + Weather.kelvinToCelsius(forecast.high())); 
});

var winn = require('./weatherrr');
winn;
callback(result)
return result;


//var msg = result;
 //callback(true, msg, []);
        //return msg;
}
}

*/
