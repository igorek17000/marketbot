#!/bin/env node

var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var config = require('./uploads/server/config');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto');
var cors = require('cors');
var mongoose = require('mongoose');
var connectt = mongoose.connection;
var imageRouter = require('./uploads/server/routes/image');
let gfs;
var fetch = require('node-fetch');
GMAIL_USER = process.env.GMAIL_USER;
GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;


var express = require("express");
var bodyParser = require("body-parser");
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
var app = express();
var upp = require('./uploads/server/app.js'); //express();
var uppp = express(); //require('./uploads/routes/image');
var mongoose = require('mongoose');
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var customerSchema = new mongoose.Schema({ name: String, answer: String, joke: String, regex: String, description: String, password: String });
var Customer = mongoose.model('Customer', customerSchema, 'joke_bot');
var dbt = mongoose.connection;

var matchHash;
matchHash = this.res;
var nodemailer = require('nodemailer');
var moment = require('moment');
//moment.tz.setDefault('America/Toronto');
//var date = moment().format('LLLL');
//var date = moment().utcOffset(-400).format('LLLL');


var commandListSuccess = require('./commands_success/command-list.js'); //commandListSuccess.buildHTML(cmdArr, config.bot_name);
var ccml = require('./modules/command-list.js');




var path = require('path');
var fs = require('fs');
var http, director, bot, router, server, port, ip, db, GMAIL_USER, GMAIL_PASSWORD;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');


router = new director.http.Router({
/*
  '/'    : {
    get: ping
  },

'/' : {
get: home
},

'/login' : {
get: login
//get: clicks
//console.log(req.body);
},

'/clicks' : {
get: clicks
//post: clicks
},

'/signup_success' : {
post: signup
},


'/amaral' : {
get: amaral
},

'/commandlist' : {
get: bot.commands
},


'/rend' : {
get: rend,
//post: login
},


'/test' : {
get: test
},
*/
  '/init' : {
    get:  bot.init,
    post: bot.init
  },

/*
'/countdown' : {
    get: count
 },
*/
/*
'/commands_success' : {
  get: bot.command_success,
  post: commands_success
},

'/rend_command' : {
  get: rend_command
},
*/
  '/commands' : {
//  get: signup,
//post: signup
   post: bot.commands
},


  '/bot/:botRoom' : {
    get: ping,
    post: bot.respond
  },

});


server = http.createServer(function(req, res) {
  req.chunks = [];
  res.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());

  });







if(req.url === '/init' || req.url === '/commands' || req.url === '/bot/:botRoom' || req.url === '/bot/308boonbot') {

router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
  res.end(err.message);
    });
}  else {
app(req, res);
}
});

port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";
GMAIL_USER = process.env.GMAIL_USER;
GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
server.listen(port, ip, function() {
var date = moment().utcOffset(-240).format('LLLL');
console.log('Server started at ' + date + ' & listening on port ' + port);

});

//--------------

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(express.static('views/partials'));
app.set('view engine', 'ejs');
app.set('views', 'views'); 
/*

app.get('/', function(req, res) {


var date = moment().utcOffset(-300).format('LLLL'); 
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var year = moment().utcOffset(-300).format('YYYY');
var month = moment().utcOffset(-300).format('MM');
var day = moment().utcOffset(-300).format('DD');
//var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var click = {ip: ip, date: date}; //, repeat: {date}}; //new Date()};
var repeat = "visited: " + date + "\n" + req.url;
var findDay = {day};
var findIp = "{ip: ip}";
dbt.collection(year + '-' + month).find({"ip": ip}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data;
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month).insertOne({ip: ip, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection('returning-visitor').find({"ip": ip}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection('returning-visitor').insertOne( {ip: ip, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
//});
} else if(docs) {
dbt.collection('returning-visitor').updateOne( {"ip": ip}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});

console.log(date);
console.log(ip);
console.log(req.url);
res.setHeader('Content-type', 'text/html');
   // var html = "https://ai.marketing/en/campaign/klknl5jjd1";
var html = fs.readFileSync(path.join(__dirname + "/views/aihcaptchabutton.html"));
res.send(html);

});
*/

app.get('/home', (req, res) => {
var date = moment().utcOffset(-300).format('LLLL'); 
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-300).format('YYYY');
var month = moment().utcOffset(-300).format('MM');
var day = moment().utcOffset(-300).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + date + "\n" + "Page URL: " + req.url;
var findDay = {day};
var findIp = "{ip: ip}";
var info = []; 
function json(ip) { 
ip = ip; 
var ipp = ip.split(/, /)[0];
return fetch(ip).then(res => res.json()); 
} 

let apiKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8'; 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
//console.log(data); 
console.log(data.city); 
console.log(data.country_code); 
console.log(data);
var ipp = ip.split(/, /)[0];
});

dbt.collection(year + '-' + month).find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data;
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month).insertOne({ip: ipp, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection(year + '-' + 'returning-visitor').find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + 'returning-visitor').insertOne( {ip: ipp, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
//});
} else if(docs) {
dbt.collection(year + '-' + 'returning-visitor').updateOne( {"ip": ipp}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});
console.log(date);
console.log(ip);
console.log(req.url);

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/marketbothome.ejs")); //hcaptchabutton.ejs
res.send(html);
});


/*

app.get('/unsubscribe', function(req, res) {
//res.writeHead(200);
res.setHeader('Content-type', 'text/html');
   // var html = "https://ai.marketing/en/campaign/klknl5jjd1";
var html = fs.readFileSync(path.join(__dirname + "/views/unsubscribe.ejs"));
res.send(html);
});

app.post('/unsubscribe', function(req, res) {
//res.writeHead(200);
var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: 'mmyryttchudyncma'
}
});


var to = "alexdeabot@gmail.com";
var subject = "Unsubscribe Request";
var name = req.body.name;
var email = req.body.email;
var reason = req.body.reason;
var text = "Name\n" + name + "\n\nEmail\n" + email + "\n\nReason for leaving\n" + reason;


var mailOptions = {


to: to,
from: 'alexdeabot@gmail.com',
subject: subject,
generateTextFromHTML: true,
text: text
};




Transport.sendMail(mailOptions, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log(name + '\n' + email + '\n' + reason);

Transport.close();
});





res.setHeader('Content-type', 'text/html');
   // var html = "https://ai.marketing/en/campaign/klknl5jjd1";
var html = fs.readFileSync(path.join(__dirname + "/views/unsubscribe-ai.ejs"));
res.send(html);
});
*/

app.post('/clicked', (req, res) => { 
var date = moment().utcOffset(-240).format('LLLL');

var click = {clickTime: date}; //new Date()}; 
console.log(click); 
//console.log(db); 
dbt.collection('clicks').insertOne(click, (err, result) => { 
if (err) { 
return console.log(err); 
} 
console.log('click added to db'); 
res.sendStatus(201); 
}); 
}); 


function ping() {
  this.res.writeHead(200);
  this.res.end(); //"I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
}

app.get('/marketbot', (req, res) => {
var date = moment().utcOffset(-300).format('LLLL'); 
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-300).format('YYYY');
var month = moment().utcOffset(-300).format('MM');
var day = moment().utcOffset(-300).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + date + "\n" + "Page URL: " + req.url;
var findDay = {day};
var findIp = "{ip: ip}";
var info = []; 
function json(ip) { 
ip = ip; 
var ipp = ip.split(/, /)[0];
return fetch(ip).then(res => res.json()); 
} 

let apiKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8'; 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
//console.log(data); 
console.log(data.city); 
console.log(data.country_code); 
console.log(data);
var ipp = ip.split(/, /)[0];
});

dbt.collection(year + '-' + month).find({"ip": ip}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data;
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month).insertOne({ip: ip, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection(year + '-' + 'returning-visitor').find({"ip": ip}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + 'returning-visitor').insertOne( {ip: ip, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
//});
} else if(docs) {
dbt.collection(year + '-' + 'returning-visitor').updateOne( {"ip": ip}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});
console.log(date);
console.log(ip);
console.log(req.url);

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/hcaptchabutton.ejs")); //hcaptchabutton.ejs
res.send(html);
});

app.get('/', (req, res) => {
var date = moment().utcOffset(-300).format('LLLL'); 
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-300).format('YYYY');
var month = moment().utcOffset(-300).format('MM');
var day = moment().utcOffset(-300).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + date + "\n" + "Page URL: " + req.url;
var findDay = {day};
var findIp = "{ip: ip}";
var info = []; 
function json(ip) { 
ip = ip; 
var ipp = ip.split(/, /)[0];
return fetch(ip).then(res => res.json()); 
} 

let apiKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8'; 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
//console.log(data); 
console.log(data.city); 
console.log(data.country_code); 
console.log(data);
var ipp = ip.split(/, /)[0];
});

dbt.collection(year + '-' + month).find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data;
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month).insertOne({ip: ipp, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection(year + '-' + 'returning-visitor').find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + 'returning-visitor').insertOne( {ip: ipp, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
//});
} else if(docs) {
dbt.collection(year + '-' + 'returning-visitor').updateOne( {"ip": ipp}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});
console.log(date);
console.log(ip);
console.log(req.url);

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/hcaptchabutton.ejs")); //hcaptchabutton.ejs
res.send(html);
});


app.get('https://ai-marketing-canada.b9ad.pro-us-east-1.openshiftapps.com', (req, res) => {
console.log('Redirected from ' + req.url);

res.setHeader('Content-type', 'text/html');
res.redirect(301, 'https://ai.marketing/en/campaign/dwkxjvw4m6');
});


app.get('/unsubscribe', function(req, res) {
//res.writeHead(200);
res.setHeader('Content-type', 'text/html');
   // var html = "https://ai.marketing/en/campaign/klknl5jjd1";
var html = fs.readFileSync(path.join(__dirname + "/views/unsubscribe.ejs"));
res.send(html);
});

app.post('/unsubscribe', function(req, res) {
//res.writeHead(200);
var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: GMAIL_USER,
pass: GMAIL_PASSWORD
}
});


var to = "alexdeabot@gmail.com";
var subject = "Unsubscribe Request";
var name = req.body.name;
var email = req.body.email;
var reason = req.body.reason;
var text = "Name\n" + name + "\nEmail\n" + email + "\nReason for leaving\n" + reason; //" " + email + " " + reason;


var mailOptions = {


to: to,
from: 'alexdeabot@gmail.com',
subject: subject,
generateTextFromHTML: true,
text: text
};




Transport.sendMail(mailOptions, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log(name + '\n' + email + '\n' + reason);

Transport.close();
});





res.setHeader('Content-type', 'text/html');
   // var html = "https://ai.marketing/en/campaign/klknl5jjd1";
var html = fs.readFileSync(path.join(__dirname + "/views/unsubscribe-ai.ejs"));
res.send(html);
});


app.get('/topup', function(req, res) {
res.setHeader('Content-type', 'text/html');
res.redirect(301, 'https://refer.ndax.io/vdEA');
});

/*

app.get('/', (req, res) => {
var date = moment().utcOffset(-300).format('LLLL'); 
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var ippp = req.connection.remoteAddress;
var year = moment().utcOffset(-300).format('YYYY');
var month = moment().utcOffset(-300).format('MM');
var day = moment().utcOffset(-300).format('DD');
var click = {ip: ip, date: date, info: info}; //, repeat: {date}}; //new Date()};
var repeat = "visited: " + date;
var findDay = {day};
var findIp = "{ip: ip}";

var info = []; //json('https://api.ipdata.co/' + ip + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => { data = data; });


//var ipp = "https://api.ipdata.co/" + ippp + "?api-key=${apiKey}";
function json(ip) { 
ip = ip;
var ipp = ip.split(/, /)[0];
return fetch(ip).then(res => res.json()); 

} 

let apiKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8'; 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var ipp = ip.split(/, /)[0];
console.log(data); 
console.log(data.city); 
console.log(data.country_code); 

});


dbt.collection(year + '-' + month + '-' + day).find({"ip": ip}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; // []; // data;
var ipp = ip.split(/, /)[0];
//console.log(data); 
//console.log(data.city); 
//console.log(data.country_code); 

dbt.collection(year + '-' + month + '-' + day).insertOne( {ip: ip, date: date, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {

dbt.collection(year + '-' + month + '-' + day).updateOne({"ip": ip}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}


});
console.log(date);
console.log(ip);


res.setHeader('Content-type', 'text/html');
   
var html = fs.readFileSync(path.join(__dirname + "/views/hcaptchabutton.ejs"));
res.send(html);
});
*/
/*
app.get('/sitemap.xml', async function(req, res, next){ 
let xml_content = [ 
'<?xml version="1.0" encoding="UTF-8"?>', 
'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
'<xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">', 
'<xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
' <url>', 
' <loc>https://www.marketbotai.com/</loc>', 
' <lastmod>2022-01-07T22:07:55+00:00</lastmod>', 
' </url>', 
'</urlset>' 
] 
res.set('Content-Type', 'text/xml');
res.send(xml_content.join('\n'));
});
*/
