//A module for sending e-mails

var commands;
var db_table = 'email';
var db_tables = 'email_draft';
var db_tabled = 'email_sent';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');
var emailCommands = [addEmailCmd, addSubjectCmd, addBodyCmd, sendEmailCmd];
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

function findDraft(cmd, callback){
  var matchHash = {
    "status": cmd.status
  };

  db.findDocs(db_table, matchHash, callback);
}


function updateDraft(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "status": cmd.status}}, callback);
}

function updateSent(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "sent": cmd.status}}, callback);
}

function updateSubject(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "subject":cmd.subject}}, callback);
}

function updateBody(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "body": cmd.body}}, callback);
}




exports.checkCommands = function(dataHash, callback) {
 if (dataHash.isMod) 
    for (cmd in commands) {
      cmd = commands[cmd];
  //if (cmd.draft == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;

     var cmdReg = new RegExp(cmd.regex, "i"); 

     //var flynnbcReg = new RegExp(flynnb.regexcurrent, "i");  
        
     // if (dataHash.request.text && cmdReg.test(dataHash.request.text)){
      //  var val = cmdReg.exec(dataHash.request.text);
      
     // } else if (flynnbc.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
        //var val = flynnbcReg.exec(dataHash.request.text);
   

      //if (cmd.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && cmdReg.test(dataHash.request.text)){
        var val = cmdReg.exec(dataHash.request.text);

//var msg = "Hello there";
         //callback(true, cmd.status, cmd.attachments, []);
    

    //break;
    //}
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
      if (commands[cmd].status = "draft") {
        updateUndraft(commands[cmd]);
        //var msg = "Current week updated";
        //callback(true, msg, []);
        }
      }
        
      var emailHash = {
      name: "Drafted by " + request.name + " on " + date,
      to: val[1],
      status: "draft",
      description: "Email Bot",
      bots: Object.keys(bots),
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
      if (commands[cmd].status == "draft") {
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
      if (commands[cmd].status == "draft") {
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
  var regex = /^\/sendemail$/;
  var reqText = request.text;
  var too = commands[cmd]["to"];
  var subjecto = commands[cmd]["subject"];
  var texto = commands[cmd]["text"];
var nodemailer = require('nodemailer');

  if (regex.test(reqText)){
    var val = regex.exec(reqText);
    

    

   // for (cmd in commands) {
      if (commands[cmd]["status"] = "draft") 
        to: commands[cmd]["to"];
        subject: commands[cmd]["subject"];
        text: commands[cmd]["body"];
        
        //commands[cmd]["status"] = "sent";
       
        findDraft(commands[cmd]);
       //commands[cmd]["status"] = "Email sent.";
        //callback(true, msg, []);
}
var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest'
}
});

    
var mailOptions = {
to: commands[cmd]["to"],
from: 'alexdeabot@gmail.com',
subject: commands[cmd]["subject"],
generateTextFromHTML: true,
text: commands[cmd]["body"]
};
Transport.sendMail(mailOptions, function(error, response) {

if (error) {
console.log(error);


var msg = "error";
    callback(true, msg, []);
    return msg;

//console.log(error);
} else {
console.log(response);

var msg = "Email sent";

    callback(true, msg, []);
    
}
console.log(response);
}
Transport.close();
});

}

//
