//
//
var fun_mode = true;
var sysCommands = [dateCmd, weatherCurrentCmd, weatherForecastCmd, funCmd, noFunCmd, idCmd, aboutCmd, eemailCmd, helpCmd, hiCmd, listCmd, nest18Cmd, nest19Cmd, nest20Cmd, nest21Cmd, nest22Cmd, nowCmd, gmCmd];
var { stdin, stdout } = process;
//var weather = require('./toronto');
var chalk = require('chalk'); 
chalk.enabled = true; 


exports.modName = "System Commands";

/*function toronto(result, callback) {
weather.toronto(result, callback);
}
*/
exports.checkCommands = function(dataHash, callback) {
  for (command in sysCommands) {
    var test = sysCommands[command](dataHash, callback);
    if (test)
      return test;
  }

  return false;
}

exports.fun_mode = function(){
  return fun_mode;
}

exports.getmdListDescription = function () {
  return [
    {cmd: "/date", desc: "Current date"},
    {cmd: "/fun", desc: "Enable commands designated as fun commands", mod: true},
    {cmd: "/nofun", desc: "Disable commands designated as fun commands", mod: true},
    {cmd: "/id", desc: "Notifies the requester of their GroupMe ID"},
    {cmd: "/about", desc: "Responds with a short message about the bot"},
    {cmd: "/go", desc: "Send a test email to bot", mod: true},
    {cmd: "/nest18", desc: "Set Nest temperature to 18 degrees celsius", mod: true},
    {cmd: "/nest19", desc: "Set Nest temperature to 19 degrees celsius", mod: true},
    {cmd: "/nest20", desc: "Set Nest temperature to 20 degrees celsius", mod: true},
    {cmd: "/nest21", desc: "Set Nest temperature to 21 degrees celsius", mod: true},
    {cmd: "/nest22", desc: "Set Nest temperature to 22 degrees celsius", mod: true}
  ];
}







//return main();

function listCmd(dataHash, callback) {
  var regex = /^\/list$/;

  if (regex.test(dataHash.request.text)) {

    var { stdin, stdout } = process;

function prompt(question) {

return new Promise((resolve, reject) => {

stdin.resume();

stdout.write(question);

stdin.on('data', data => resolve(data.toString().trim()));

stdin.on('error', err => reject(err));

});

}




callback(true, []);
    async function main() {

try {

var name = await prompt("What's your name? ")

var age = await prompt("What's your age? ");

var email = await prompt("What's your email address? ");

var user = { name, age, email };

console.log(user);

stdin.pause();

} catch(error) {

console.log("There's an error!");

console.log(error);

}

process.exit();

}

    //return data;
    //return main();

 // var question = require('./modules/question');
//question;
} else {
return false;
}
}

//keys = Object.keys(object)
//console.log(keys);
//console.log(keys.length)


//---------

function weatherCurrentCmd(dataHash, callback) {
  var regex = /^\/weather current$/;

var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');
//var toronto = weather.find({search: 'Toronto, ON', degreeType: 'C'}); //, function(err, result) {
//if(err) console.log(err);
//console.log(JSON.stringify(result, null, 2));
//callback(result);
//});

var request = require('request');
var apiKey = '3ff9b16eb3019ed16c69ce87658e04d3';
var city = 'toronto';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//var weather = JSON.parse(body);

//var direction;
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;



  if (regex.test(dataHash.request.text)) {


      //callback(true, "Test it out", []);
  request(url, function (err, response, body) {
if(err){
console.log('error:', error);

} else {


var weather = JSON.parse(body);
//<<<<<<< HEAD
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//=======
var oneof = "";
oneof += body;
//var oneoff = JSON.parse(oneof);
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa


//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;

var direction = "";
if (weather.wind.deg == 350 || weather.wind.deg == 360 || weather.wind.deg == 10) {
direction = "N";
} else if (weather.wind.deg == 20 || weather.wind.deg == 30) {
direction = "N/NE";
} else if (weather.wind.deg == 40 || weather.wind.deg == 50) {
direction = "NE";
} else if (weather.wind.deg == 60 || weather.wind.deg == 70) {
direction = "E/NE";
} else if (weather.wind.deg == 80 || weather.wind.deg == 90 || weather.wind.deg == 100) {
direction = "E";
} else if (weather.wind.deg == 110 || weather.wind.deg == 120) {
direction = "E/SE";
} else if (weather.wind.deg == 130 || weather.wind.deg == 140) {
direction = "SE";
} else if (weather.wind.deg == 150 || weather.wind.deg == 160) {
direction = "S/SE";
} else if (weather.wind.deg == 170 || weather.wind.deg == 180 || weather.wind.deg == 190) {
direction = "S";
} else if (weather.wind.deg == 200 || weather.wind.deg == 210) {
direction = "S/SW";
} else if (weather.wind.deg == 220 || weather.wind.deg == 230) {
direction = "SW";
} else if (weather.wind.deg == 240 || weather.wind.deg == 250) {
direction = "W/SW";
} else if (weather.wind.deg == 260 || weather.wind.deg == 270 || weather.wind.deg == 280) {
direction = "W";
} else if (weather.wind.deg == 290 || weather.wind.deg == 300) {
direction = "W/NW";
} else if (weather.wind.deg == 310 || weather.wind.deg == 320) {
direction = "NW";
} else if (weather.wind.deg == 330 || weather.wind.deg == 340) {
direction = "N/NW";
}
direction: direction;


//var message = `It's ${weather.main} degrees in ${weather.name}!`;



var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;


//<<<<<<< HEAD
var msg = weather.name + " weather at " + weather.dt_txt + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees.";

//=======
var msg = weather.name + " weather at " + date + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Gusts: " + weather.wind.gust + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees."; 
//var msg = oneof;
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa
console.log(message);


callback(true, msg, []);
return msg;

}
});
} else {
//return msg;




return false;
}
}


function weatherForecastCmd(dataHash, callback) {
  var regex = /^\/weather forecast$/;

var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');
//var toronto = weather.find({search: 'Toronto, ON', degreeType: 'C'}); //, function(err, result) {
//if(err) console.log(err);
//console.log(JSON.stringify(result, null, 2));
//callback(result);
//});

var request = require('request');
var apiKey = '3ff9b16eb3019ed16c69ce87658e04d3';
var city = 'toronto';
//<<<<<<< HEAD
//var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
//=======
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=2&appid=${apiKey}` 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa
//var weather = JSON.parse(body);

//var direction;
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;



  if (regex.test(dataHash.request.text)) {


      //callback(true, "Test it out", []);
  request(url, function (err, response, body) {
if(err){
console.log('error:', error);

} else {

var forecast = JSON.parse(body);
//<<<<<<< HEAD
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//=======
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
var oneof = "";
oneof += body;
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;

/*var direction = "";
if (forecast.wind.deg == 350 || forecast.wind.deg == 360 || forecast.wind.deg == 10) {
direction = "N";
} else if (forecast.wind.deg == 20 || forecast.wind.deg == 30) {
direction = "N/NE";
} else if (forecast.wind.deg == 40 || forecast.wind.deg == 50) {
direction = "NE";
} else if (forecast.wind.deg == 60 || forecast.wind.deg == 70) {
direction = "E/NE";
} else if (forecast.wind.deg == 80 || forecast.wind.deg == 90 || forecast.wind.deg == 100) {
direction = "E";
} else if (forecast.wind.deg == 110 || forecast.wind.deg == 120) {
direction = "E/SE";
} else if (forecast.wind.deg == 130 || forecast.wind.deg == 140) {
direction = "SE";
} else if (forecast.wind.deg == 150 || forecast.wind.deg == 160) {
direction = "S/SE";
} else if (forecast.wind.deg == 170 || forecast.wind.deg == 180 || forecast.wind.deg == 190) {
direction = "S";
} else if (forecast.wind.deg == 200 || forecast.wind.deg == 210) {
direction = "S/SW";
} else if (forecast.wind.deg == 220 || forecast.wind.deg == 230) {
direction = "SW";
} else if (forecast.wind.deg == 240 || forecast.wind.deg == 250) {
direction = "W/SW";
} else if (forecast.wind.deg == 260 || forecast.wind.deg == 270 || forecast.wind.deg == 280) {
direction = "W";
} else if (forecast.wind.deg == 290 || forecast.wind.deg == 300) {
direction = "W/NW";
} else if (forecast.wind.deg == 310 || forecast.wind.deg == 320) {
direction = "NW";
} else if (forecast.wind.deg == 330 || forecast.wind.deg == 340) {
direction = "N/NW";
}
direction: direction;
*/

//var message = `It's ${forecast.main} degrees in ${forecast.name}!`;



//<<<<<<< HEAD
//var message = `It's ${forecast.main.temp} degrees in ${forecast.name}!`;


//var msg = "Current weather in " + forecast.name + "\n" + "Currently: " + forecast.main.temp + "° celsius" + "\n" + "Mainly: " + forecast.weather[0].description + "\n" + "High: " + forecast.main.temp_max +  "° celcius" + "\n" + "Low: " + forecast.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + forecast.main.humidity + "\n" + "Wind: " + forecast.wind.speed + " km/h" + "\n" + "Wind gusts: " + forecast.wind.gust + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + forecast.wind.deg + "° degrees.";
//=======
//var message = `It's ${forecast.main.temp} degrees in ${forecast.name}!`; 


var msg = oneof; //"Current weather in " + forecast.name + "\n" + "Currently: " + forecast.main.temp + "° celsius" + "\n" + "Mainly: " + forecast.weather[0].description + "\n" + "High: " + forecast.main.temp_max +  "° celcius" + "\n" + "Low: " + forecast.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + forecast.main.humidity + "\n" + "Wind: " + forecast.wind.speed + " km/h" + "\n" + "Wind gusts: " + forecast.wind.gust + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + forecast.wind.deg + "° degrees."; 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa

console.log(msg); //message);


callback(true, msg, []);
return msg;

}
});
} else {
//return msg;




return false;
}
}


//---------




function dateCmd(dataHash, callback) {
  var regex = /^\/date$/;

var moment = require('moment');
var date = moment().utcOffset(-240).format('LLLL');

  if (regex.test(dataHash.request.text)) {
var toronto = require('./toronto');
toronto;

      callback(true, date);

} else {
return false;
}
}


function funCmd(dataHash, callback) {
  var regex = /^\/fun$/;

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {
      if (fun_mode) {
        callback(true, "I'm already as much fun as I can be!", []);
      } else {
        fun_mode = true;
        callback(true, "I'm fun again!", []);
      }
    } else {
      callback(true, "You're not the boss of me", []);
    }
  } else {
    return false;
  }
}

function noFunCmd(dataHash, callback) {
  var regex = /^\/nofun$/;

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {
      if (!fun_mode) {
        callback(true, "I can't be any less fun right now.", []);
      } else {
        fun_mode = false;
        callback(true, "I'm no fun anymore!", []);
      }
    } else {
      callback(true, "You're not the boss of me", []);
    }
  } else {
    return false;
  }
}

function idCmd(dataHash, callback) {
  var regex = /^\/id$/;

  if (regex.test(dataHash.request.text)) {
    callback(true, "Your groupme id is: " + dataHash.request.sender_id);
  } else {
    return false;
  }
}

function aboutCmd(dataHash, callback) {
  var regex = /^\/about$/;

  if (regex.test(dataHash.request.text)) {
    callback(true, "AlexBot\n A Groupme bot written in NodeJs");
  } else {
    return false;
  }
}


//*****************This is where all the magic happens***************************

async function date1Cmd(dataHash, callback) {

  var regex = /^\/date1$/;

var moment = require('moment');

var date = moment().utcOffset(-300).format('LLLL');

  var dater = new promise(resolve, reject);


  if (regex.test(dataHash.request.text)) {



      callback(true, date);



} else {

return false;

}

}






//------------
function eemailCmd(dataHash, request, callback) {
  var regex = /^\/email (.+?) ([^\n])([\s\S]+)/i;
  var reqText = dataHash.request.text;

  if (regex.test(dataHash.request.text)) {
var nodemailer = require('nodemailer');

var Transport = nodemailer.createTransport({

service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest'
}
});

var mailOptions = {
to: val[1],
from: 'alexdeabot@gmail.com',
subject: val[2],
generateTextFromHTML: true,
text: val[3]
};

Transport.sendMail(mailOptions, function(error, response) {

if (error) {
console.log(error);
} else {
console.log(response);
}
Transport.close();
});
}
}

//---------


function nest18Cmd(dataHash, callback) {
  var regex = /^\/nest18$/;

if (regex.test(dataHash.request.text)) {
  if (dataHash.isMod) {

    var fs = require('fs');
    var moment = require('moment');
    var date = moment().utcOffset(-300).format('LLLL');


    var stream = fs.createWriteStream("append.txt", {flags:'a'});
    console.log(new Date().toISOString());
    [...Array(10000)].forEach( function (item,index) {
      stream.write(index + "\n");
    });
    console.log(new Date().toISOString());
    stream.end();
    //});

    //var content;
    fs.readFile('./modules/modules/nest.txt', function read(err, data) {
      if (err) //{
        throw err;
               //}
      var content = data;
     console.log(data);
    });
      //});
    //console.log(data);
    callback(true, "Thermostat set to 18 degrees celsius", []);

  var nest18 = require('./modules/nest18');
nest18;
} else {
callback(true, "Access Denied! Only mods can adjust the temperature", []);
}
}
}

//-------------
function nest19Cmd(dataHash, callback) {
  var regex = /^\/nest19$/;

if (regex.test(dataHash.request.text)) {
  if (dataHash.isMod || (dataHash.request.sender_id = 685)) {

callback(true, "Thermostat set to 19 degrees celsius", []);
  var nest19 = require('./modules/nest19');
nest19;
} else {
callback(true, "Access Denied! Only mods can adjust the temperature", []);
}
}
}

//----------

function nest20Cmd(dataHash, callback) {
  var regex = /^\/nest20$/;

if (regex.test(dataHash.request.text)) {
  if (dataHash.isMod) {

callback(true, "Thermostat set to 20 degrees celsius", []);
var nest20 = require('./modules/nest20');
nest20;
} else {
callback(true, "Access Denied! Only mods can adjust the temperature", []);
}
}
}

//----------------***********-------------

function nest21Cmd(dataHash, callback) {
  var regex = /^\/nest21$/;

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {

callback(true, "Thermostat set to 21 degrees celsius", []);
var nest21 = require('./modules/nest21');
nest21;
} else {
      callback(true, "Access Denied! Only mods can adjust the temperature", []);
}
}
}

//-----------------------------------------
function nest22Cmd(dataHash, callback) {
  var regex = /^\/nest22$/;

  if (regex.test(dataHash.request.text)) {
    if (dataHash.isMod) {

callback(true, "Thermostat set to 22 degrees celsius", []);
var nest22 = require('./modules/nest22');
nest22;
} else {
      callback(true, "Access Denied! Only mods can adjust the temperature", []);
}
}
}

//-----------

function helpCmd(dataHash, callback) {
  var regex = /^\/help$/;

  if (regex.test(dataHash.request.text)) {
   // if (dataHash.isMod) {

callback(true, "Click the link for a list of commands\nhttp://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/commands", []);

} else {
      return false;
}
}




//function helpCmd(dataHash, callback, result) {
 // var regex = /^\/help$/;

  //if (regex.test(dataHash.request.text)) {
    //if (dataHash.isMod) {
//var fs = require('fs');
//var path = require('path');
//fs.readFile(path.resolve(__dirname, "./modules/help.txt"), (err, data) => {

 // //var helpful = require('../help');
// //fs.readFile('', (err, data) => {
//if (err) {
//console.error(err)
//return;
//}
////console.log(data) })
////callback(true, data, []);
//callback(true, "Command List \n" + data, []);


//return data;
////callback(true, "Help", []);
//})


    ////callback(true, "Command List ", {}, []);




  //} else {
    //return false;
  //}
//}
//}

//----------

function nowCmd(dataHash, botResponse, callback) {
var regex = /^\/now$/;
  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
if (regex.test(dataHash.request.text)) {
if (dataHash.isMod) {

callback(true, "now", []);
  return botResponse;
rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    print('Thank you for your valuable feedback: ${answer}');

  rl.close();
  var when = rl.on('line', (input) => {
    console.log('Received: ${input}'); });
 });
} else {
callback(true, "Not now", []);
}
}
  }


//----------

function hiCmd(dataHash, callback) {
  var regex = /^\/hi$/;

var moment = require('moment');
var date = moment().utcOffset(-240).format('LLLL');
var time = moment().utcOffset(-240).hour();
var msg;

  if (regex.test(dataHash.request.text)) {
if (time < 12) {
msg = "Good morning";
} else if (time < 17) {
msg = "Good afternoon";
} else if (time > 17) {
msg = "Good evening";
}
callback(true, msg, []);
  return msg;
} else {
return false;
}
}


//-------


function gmCmd(dataHash, callback) {
  var regex = /^\/gm$/;

var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');
//var toronto = weather.find({search: 'Toronto, ON', degreeType: 'C'}); //, function(err, result) {
//if(err) console.log(err);
//console.log(JSON.stringify(result, null, 2));
//callback(result);
//});

var request = require('request');
var url = 'https://api.groupme.com/v3/groups?token=nQMmW22iRiJY4TL3W3aoWaCbNpkGO0yIVAaHRvaR'
   // method: 'GET'
  //};
/*
var url = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };




body = {
    
    "attachments" : "attachments",
    "bot_id"      : logID,
    "text"        : response + [] 
  };
*/

//var direction;
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;



  if (regex.test(dataHash.request.text)) {


      //callback(true, "Test it out", []);
  request.get(url, function (err, response, body) {
if(err){
console.log('error:', err);

} else {


var gm = JSON.parse(body);
//<<<<<<< HEAD
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//=======
var oneof = "";
oneof += body;
//var oneoff = JSON.parse(oneof);
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa


//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;
/*
var direction = "";
if (weather.wind.deg == 350 || weather.wind.deg == 360 || weather.wind.deg == 10) {
direction = "N";
} else if (weather.wind.deg == 20 || weather.wind.deg == 30) {
direction = "N/NE";
} else if (weather.wind.deg == 40 || weather.wind.deg == 50) {
direction = "NE";
} else if (weather.wind.deg == 60 || weather.wind.deg == 70) {
direction = "E/NE";
} else if (weather.wind.deg == 80 || weather.wind.deg == 90 || weather.wind.deg == 100) {
direction = "E";
} else if (weather.wind.deg == 110 || weather.wind.deg == 120) {
direction = "E/SE";
} else if (weather.wind.deg == 130 || weather.wind.deg == 140) {
direction = "SE";
} else if (weather.wind.deg == 150 || weather.wind.deg == 160) {
direction = "S/SE";
} else if (weather.wind.deg == 170 || weather.wind.deg == 180 || weather.wind.deg == 190) {
direction = "S";
} else if (weather.wind.deg == 200 || weather.wind.deg == 210) {
direction = "S/SW";
} else if (weather.wind.deg == 220 || weather.wind.deg == 230) {
direction = "SW";
} else if (weather.wind.deg == 240 || weather.wind.deg == 250) {
direction = "W/SW";
} else if (weather.wind.deg == 260 || weather.wind.deg == 270 || weather.wind.deg == 280) {
direction = "W";
} else if (weather.wind.deg == 290 || weather.wind.deg == 300) {
direction = "W/NW";
} else if (weather.wind.deg == 310 || weather.wind.deg == 320) {
direction = "NW";
} else if (weather.wind.deg == 330 || weather.wind.deg == 340) {
direction = "N/NW";
}
direction: direction;
*/

//var message = `It's ${weather.main} degrees in ${weather.name}!`;



var message = `It's ${gm.response.name}'; degrees in ${gm.response.name}!`;


//<<<<<<< HEAD
var msg = gm.response.name + " weather at " + gm.response.group_id; // + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees.";

//=======
//var msg = weather.name + " weather at " + date + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Gusts: " + weather.wind.gust + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees."; 
//var msg = oneof;
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa
//console.log(response.body);


callback(true, msg, []);
return msg;

}
});
} else {
//return msg;




return false;
}
}


