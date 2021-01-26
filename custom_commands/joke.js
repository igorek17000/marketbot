var db = require('../modules/db.js');
var db_table = 'user_jokes';
//var db_tables = 'user_triggers';

var cmds = [cmdSaveJoke, cmdRandomJoke]; //, cmdRandomUserJoke]; //cmdRandomQuotes, cmdRandomUserQuote];

function saveJoke(jokeHash, callback){
  db.addDoc(db_table, jokeHash, callback);
}

function findJokes(id, callback){
  db.findDocs(db_table, {user_id: id}, callback);
}

function countJokes(callback){
  db.countDocs(db_table, callback);
}

function getOneRandomJoke(callback){
  db.randomDoc(db_table, callback);
}

function getRandomJokes(callback){
  db.randomDocs(db_tables, callback);
}


exports.checkCommands = function(dataHash, callBack){
  for (var cmd in cmds) {
    var test = cmds[cmd](dataHash.funMode, dataHash.request, function(msg){
      callBack(true, msg, []);
    });

    if (test)
      return test;
  }
}

exports.getCmdListDescription = function () {
  var cmdArr = [
    {cmd: "/joke add 'quote text'", desc: "Add a joke to database", fun: true},
    {cmd: "/joke", desc: "Shares a random quote that's been saved from the user", fun: true}
   // {cmd: "/quote", desc: "Shares a random quote from all of the saved quotes", fun: true}
  ];

  return cmdArr;
}

function cmdSaveJoke(funMode, request, callback) {
  var regex = /^\/joke add ([\s\S]+)/i;

  if (regex.test(request.text)){
    if(!funMode){
      callback("Sorry I'm no fun right now.");
      return "Sorry I'm no fun right now.";
    }
    
    var val = regex.exec(request.text);
    var msg = "";

   // if (
//request.attachments[0].user_ids; //) {
/*
      msg = "You have to @user for the person you're trying to quote.";
    } else if (!request.attachments[0].loci[0][1] == 12) {
      msg = "Please @the person you're quoting before their message. EX: /quote save @user this is their quote";
    } else if (request.attachments[0].user_ids.length > 1) {
      msg = "You can only quote 1 user at a time.";
    } else if (val[1].length <= request.attachments[0].loci[0][1]){
      msg = "... You want to quote their silence?";
    } else {
*/
      var user_id = request.user_id; //attachments[0].user_id[0];

    //  var start = request.attachments[0].loci[0][0];
    //  var end = start + request.attachments[0].loci[0][1];
      var name = request.name; //text.substring(start, end);
      //var name = request.text.substring(end, request.text.length);
      var joke; //= val[3]; // request.text.substring(end, request.text.length);
      //var description = request.text.substring(end, request.text.length);
      //var message = request.text.substring(end, request.text.length);
     // joke = joke.trim();

      var moment = require('moment'); 
      var date = moment().utcOffset(-300).format('LLLL');

      //var date = new Date();
      //var year = date.getFullYear();
      //var month = date.getMonth() + 1;
      //var day = date.getDate();
      //date = day + "-" + month + "-" + year;
      var jokeHash = {
        name: name,
        user_id: user_id,
        //user_name: user_name,
        joke: val[1], //joke,
        answer: "hi",
        date: date
      }

      saveJoke(jokeHash);
      msg = "Joke saved!";
   // }
    callback(msg);
    return msg;
  } else {
    return false;
  }
}
/*
function cmdRandomUserJoke(funMode, request, callback) {
  var regex = /^\/joke (.+)/i;

  if (regex.test(request.text)){
    if(!funMode){
      callback("Sorry I'm no fun right now.");
      return "Sorry I'm no fun right now.";
    }
    if (!request.attachments[0].user_ids)
      return "You have to @user for the person you're trying to quote.";

    findQuotes(request.attachments[0].user_ids[0], function(docs){
      if (docs.length > 0){
        var rnd = Math.floor(Math.random() * docs.length);
        var msg = '"' + docs[rnd].quote + '" - ' + docs[rnd].date;
        callback(msg);
      }
    });
    return true;
  } else {
    return false;
  }
}
*/
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

/*
function cmdRandomQuotes(funMode, request, callback) {
  var regex = /^\/lists$/i;

  if (regex.test(request.text)){
    if(!funMode){
      callback("Sorry I'm no fun right now.");
      return "Sorry I'm no fun right now.";
    }
    getRandomQuotes(function(docs){
      //var srt = sort.({name: 1});
var cbold = 'cmd: ';
var dbold = ' desc: ';
var s = '/';
var naame = docs.name;
//var deesc = docs.desc;
var msg = 'cmd: /' + docs.name + ' - desc: ' + docs.description;
 
      callback(msg);
    });
    return true;
  } else {
    return false;
  }
}
*/
