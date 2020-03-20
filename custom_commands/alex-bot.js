//A module for handling responses triggered by AlexBot commands
var alexbot;
var db_table = 'alex_bot';
var bot = require('../bot.js');
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');
var alexBotCommands = [addAlexBotCmd, describeAlexBotCmd, editAlexBotCmd];
var db = require('../modules/db.js');
var http = require('http');
var server, port, ip;
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

function updateAlexBotMessage(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$set: { "message": alexb.message}}, callback);
}

function updateAlexBotModDate(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$push: { "date modified": date}}, callback);
}

function updateAlexBotModDateMessage(alexb, callback) {
  db.updateOneDoc(db_table, {"name": alexb.name}, {$push: { "date modified.date": alexb.message}}, callback);
}

//var request = require('request'); 
function getQuote() { 

server = http.createServer(function (req, res) {
  req.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

var promise = new Promise(function(resolve, reject) { 
setTimeout(() => resolve(server), 1000); }).then(function(result) { alert(result); // 1 
return promise;
}
//new Promise((resolve, reject) => { // (*) 
//setTimeout(() => resolve(result), 1000); });

//port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
//ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

//server.listen(port, ip);

if (result, function(error, response, body) { 
if (error) return reject(error); 
resolve(body); 
}); 
}); 
} 
async function main() { 
try { 
var quote = await getQuote(); 
console.log(quote); 
} 
catch(error) { 
console.error(error); 
} 
} 




function dateone() {
  var moment = require('moment'); 
var dateres = moment().utcOffset(-240).format('LLLL');
  return dateres;
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

      callback(true, alexb.message, alexb.attachments, []);
      break;
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
      var bold = msg.bold();
      callback(true, bold, []);
      return msg;
    }


main(); 
console.log('Ron once said,');

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



