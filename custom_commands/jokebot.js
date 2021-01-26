//A module for handling responses triggered by AlexBot commands

//

var fs = require('fs');
var jokebot;
var db_table = 'joke_bot';
var db_test = 'test';
var bot = require('../bot.js');
var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');
var jokeBotCommands = [addJokeBotCmd, describeJokeBotCmd, editJokeBotCmd, answerJokeBotCmd, cmdRandomJoke]; // retartCmd];
var db = require('../modules/db.js');
var http = require('http');
var HTTPS = require('https');

var msg;


getAllJokebot();
exports.modName = "JokeBot";

function getAllJokebot() {
  db.getAllDocuments(db_table, function(res){
    jokebot = res;
  });
}

function addJokeBotToDB(jokeb, callback) {
  db.addDoc(db_table, jokeb, callback);
}

function updateJokeBotDesc(jokeb, callback) {
  db.updateOneDoc(db_table, {"name": jokeb.name}, {$set: { "description": jokeb.description}}, callback);
}

function updateJokeBotInDB(jokeb, callback) {
  db.updateOneDoc(db_table, {"name": jokeb.name}, {$set: { "joke": jokeb.joke}}, callback);
}

function updateJokeBotAnswer(jokeb, callback) {
  db.updateOneDoc(db_table, {"name": jokeb.name}, {$set: { "answer": jokeb.answer}}, callback);
}

function updateJokeBotModDateMessage(jokeb, callback) {
  db.updateOneDoc(db_table, {"name": jokeb.name}, {$push: { "date modified.date": alexb.message}}, callback);
}

function moveOneDoc(jokeb, callback) {
db.moveOneDoc(db_test, jokeb, callback);
}


function getOneRandomJoke(callback){
  db.randomDoc(db_table, callback);
}

exports.checkCommands = function(dataHash, callback) {

  for (jokeb in jokebot) {
    jokeb = jokebot[jokeb];
      var jokebReg = new RegExp(jokeb.regex, "i");
    if (dataHash.request.text && jokebReg.test(dataHash.request.text)){
      var val = jokebReg.exec(dataHash.request.text);
      callback(true, jokeb.joke, jokeb.attachments, []);
setTimeout(() => { 
callback(true, jokeb.answer, jokeb.attachments, []); 
}, 10000); //callback(msg); });
      break;
   // }
  }
}


  for (cmd in jokeBotCommands) {
    var test = jokeBotCommands[cmd](dataHash.funMode, dataHash.request, dataHash.bots, dataHash.isMod, function(msg){ //callback);
   callback(true, msg, []); 
});
   if (test)
      return test;
  }
}



exports.setAll = function(jokebHash) {
  jokebot = jokebHash;
}

exports.getAll = function() {
  return jokebot;
}

exports.getCmdListDescription = function () {
  return null;
}


function moveJokeBotCmd(request, bots, isMod, callback) {
  var regex = /^\/jokebot move ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);


    if (!isMod) {
      var msg = request.name + " you have no power here!";

      callback(true, msg, []);
      return msg;
    }


    for (jokeb in jokebot) {
      if (jokebot[jokeb].name == val[1]) {

jokebot.push(jokebot[jokeb]);
moveOneDoc(jokebot[jokeb]);

        var msg = val[1] + " copied";
        callback(true, msg, []);


        return msg;
      }
    }




    var msg = "JokeBot command not found";
    callback(true, msg, []);
    return msg;
  }
}

function addJokeBotCmd(request, bots, isMod, callback) {
  var regex = /^\/joke add (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);


    if (!isMod) {
      var msg = request.name + " you have no power here!";

      callback(true, msg, []);
      return msg;
    }


    for (jokeb in jokebot) {
      if (jokebot[jokeb].name == val[1]) {
        var msg = val[1] + " already exists";
        callback(true, msg, []);


        return msg;
      }
    }

    var jokebHash = {
      name: val[1].toLowerCase(),
      regex: "^\/" + val[1] + "$",
      joke: val[2],
      answer: "Pending Answer",
      description: "Pending Description",
      bots: Object.keys(bots),
      date: date
    };

    jokebot.push(jokebHash);
    addJokeBotToDB(jokebHash);


    var msg = "Joke added! Use '/joke answer " + val[1] + "' to add an answer to this joke";
    callback(true, msg, []);
    return msg;
  }
}

function answerJokeBotCmd(request, bots, isMod, callback) {
  var regex = /^\/joke answer (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (jokeb in jokebot) {
      if (jokebot[jokeb].name == val[1]) {
        jokebot[jokeb]["answer"] = val[2];
        updateJokeBotAnswer(jokebot[jokeb]);
        var msg = val[1] + " Joke answer updated! Use '/joke describe " + val[1] + "' to add a description";

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}




function describeJokeBotCmd(request, bots, isMod, callback) {
  var regex = /^\/joke describe (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (jokeb in jokebot) {
      if (jokebot[jokeb].name == val[1]) {
        jokebot[jokeb]["description"] = val[2];
        updateJokeBotDesc(jokebot[jokeb]);
        var msg = val[1] + " JokeBot command description updated";

        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}

function editJokeBotCmd(request, bots, isMod, callback) {
  var regex = /^\- (.+?) ([\s\S]+)/i;

  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to edit commands"
      callback(true, msg, []);
      return msg;
    }


    for (jokeb in jokebot) {
      if (jokebot[jokeb].name == "308boonave") {
        jokebot[jokeb].message = "- " + val[1] + " " + val[2];
        updateJokeBotModDate(jokebot[jokeb]);
        updateJokeBotMessage(jokebot[jokeb]);
        updateJokeBotModDateMessage(jokebot[jokeb]);


        var msg = jokebot[jokeb].name + " message updated.";
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
function cmdRandomJoke(funMode, request, callback) {
  var regex = /^\/joke$/i;

  if (regex.test(request.text)){
    if(!funMode){
      callback("Sorry I'm no fun right now.");
      return "Sorry I'm no fun right now.";
    }
    getOneRandomJoke(function(docs){
      var msg = docs.joke;
var answer = docs.answer; 
callback(msg);
setTimeout(() => { 
callback(answer); }, 10000);
      //callback(msg);
    });
    return true;
  } else {
    return false;
  }
}
