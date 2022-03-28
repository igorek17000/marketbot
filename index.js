#!/bin/env node

var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto');
var cors = require('cors');
var mongoose = require('mongoose');
var connectt = mongoose.connection;
var fetch = require('node-fetch');
GMAIL_USER = process.env.GMAIL_USER;
GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

var bodyParser = require('body-parser');
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var customerSchema = new mongoose.Schema({ name: String, answer: String, joke: String, regex: String, description: String, password: String });
var Customer = mongoose.model('Customer', customerSchema, 'joke_bot');
var dbt = mongoose.connection;

var nodemailer = require('nodemailer');
var moment = require('moment');
//moment.tz.setDefault('America/Toronto');
//var date = moment().format('LLLL');
//var date = moment().utcOffset(-400).format('LLLL');

var path = require('path');
var fs = require('fs');
var http, director, bot, router, server, port, ip, db, GMAIL_USER, GMAIL_PASSWORD;

http        = require('http');
director    = require('director');


router = new director.http.Router({

 
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
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(express.static('views/partials'));
app.set('view engine', 'ejs');
app.set('views', 'views'); 

function ping() {
  this.res.writeHead(200);
  this.res.end(); //"I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
}
/*
app.get('/p', (req, res) => {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + month + "-" + day + "-" + year + " " + time + "\n" + "Page URL: " + req.url;
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

dbt.collection(year + '-' + month).insertOne({ip: ipp, date: date, time: time, info: info}, (err, result) => { 
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

dbt.collection(year + '-' + 'returning-visitor').insertOne( {ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
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
var html = fs.readFileSync(path.join(__dirname + "/views/marketbothome.ejs")); //hcaptchabutton.ejs")); //hcaptchabutton.ejs
res.render('marketbothome.ejs');
});
*/
app.get('/', (req, res) => {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + month + "-" + day + "-" + year + " " + time + "\n" + "Page URL: " + req.url;
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

dbt.collection(year + '-' + month).insertOne({ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection(year + '-' + month + '-' + 'returning-visitor').find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month + '-' + 'returning-visitor').insertOne( {ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});

} else if(docs) {
dbt.collection(year + '-' + month + '-' + 'returning-visitor').updateOne( {"ip": ipp}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});
console.log(date + ' ' + time);
console.log(ip);
console.log(req.url);

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/hcaptchabutton.ejs")); //hcaptchabutton.ejs
res.render('menu.ejs'); //hcaptchabutton.ejs');
});

app.get('/bot', (req, res) => {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + month + "-" + day + "-" + year + " " + time + "\n" + "Page URL: " + req.url;
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

dbt.collection(year + '-' + month).insertOne({ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection(year + '-' + month + '-' + 'returning-visitor').find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month + '-' + 'returning-visitor').insertOne( {ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});

} else if(docs) {
dbt.collection(year + '-' + month + '-' + 'returning-visitor').updateOne( {"ip": ipp}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});
console.log(date + ' ' + time);
console.log(ip);
console.log(req.url);

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/hcaptchabutton.ejs")); //hcaptchabutton.ejs
res.render('bot.ejs'); //hcaptchabutton.ejs');
});

app.get('/home', (req, res) => {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var click = {ip: ip, date: date, info: info};
var repeat = "visited: " + month + "-" + day + "-" + year + " " + time + "\n" + "Page URL: " + req.url;
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

dbt.collection(year + '-' + month).insertOne({ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});
} else if(docs) {
dbt.collection(year + '-' + month + '-' + 'returning-visitor').find({"ip": ipp}).toArray(function(err, docs) {
if (err) { 
return console.log(err); 
}
if (docs < 1) { 
json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
var info = data; 
var ipp = ip.split(/, /)[0];

dbt.collection(year + '-' + month + '-' + 'returning-visitor').insertOne( {ip: ipp, date: date, time: time, info: info}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
});

} else if(docs) {
dbt.collection(year + '-' + month + '-' + 'returning-visitor').updateOne( {"ip": ipp}, {$push: {repeat}}, (err, result) => { 
if (err) { 
return console.log(err); 
} 
});
}
});
}
});
console.log(date + ' ' + time);
console.log(ip);
console.log(req.url);

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/home.ejs")); //hcaptchabutton.ejs
res.render('hcaptchabutton.ejs');
});


app.get('/unsubscribe', function(req, res) {
res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/un-test.ejs"));
res.send(html);
});

app.post('/unsubscribe', function(req, res) {
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
if (error) { 
console.log(error);
}
console.log(response);
console.log(name + '\n' + email + '\n' + reason);
Transport.close();
});

res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/un-test-ai.ejs"));
res.send(html);
});


app.get('/topup', function(req, res) {
console.log('Redirected to https://refer.ndax.io/vdEA');
res.setHeader('Content-type', 'text/html');
res.status(301).redirect('https://refer.ndax.io/vdEA');
});

app.get('/signin', (req, res) => {
console.log('Redirected to https://ai.marketing/en/campaign/dwkxjvw4m6');
res.setHeader('Content-type', 'text/html');
res.status(301).redirect('https://ai.marketing/en/campaign/dwkxjvw4m6');
});

app.get('/signup', (req, res) => {
console.log('Redirected to https://ai.marketing/en/campaign/xkknl8vip0');
res.setHeader('Content-type', 'text/html');
res.status(301).redirect('https://ai.marketing/en/campaign/xkknl8vip0');
});

app.get('/sitemap.xml', function(req, res) {
res.setHeader('Content-type', 'text/xml');
var html = fs.readFileSync(path.join(__dirname + "/views/sitemap.xml"));
res.send(html);
//res.sendFile('sitemap.xml');
});
