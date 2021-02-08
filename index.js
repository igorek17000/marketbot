#!/bin/env node
/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var config = require('./config/config');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto');
var cors = require('cors');
var mongoose = require('mongoose');

var imageRouter = require('./uploads/routes/image');
let gfs;
gfs = new mongoose.mongo.GridFSBucket({ //connect, db) { 
bucketName: "uploads" 
});

//var app = express();



// view engine setup

upp.set('views', path.join(__dirname, '/uploads/views'));
upp.set('view engine', 'jade');

upp.use(cors({
    origin: '*',
}));
upp.use(logger('dev'));
upp.use(express.json());
upp.use(express.urlencoded({ extended: false }));
upp.use(cookieParser());
upp.use(methodOverride('_method'));
upp.use(express.static(path.join(__dirname, './uploads/public')));

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var url = config.mongoURI;

var connect = require('./modules/db.js'); //mongoose.connection; //connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to the database
connect.then(() => {
  console.log('Connected to database: GridApp');
}, (err) => console.log(err));
*/
/*
    GridFs Configuration
*/
/*
// create storage engine
var storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                var filename = buf.toString('hex') + path.extname(file.originalname);
                var fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

var upload = multer({ storage });

//app.use(upp); //imageRouter(upload));
/*
// catch 404 and forward to error handler
upp.use(function(req, res, next) {
  next(createError(404));
});

// error handler
upp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.upp.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
exports.upp = upp;
/*
exports.upp = upp;
*/



var express = require("express");
var bodyParser = require("body-parser");
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
var app = express();
var upp = express();
var imageRouter = require('./uploads/app'); //routes/image');
var mongoose = require('mongoose');
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var customerSchema = new mongoose.Schema({ name: String, answer: String, joke: String, regex: String, description: String, password: String });
var Customer = mongoose.model('Customer', customerSchema, 'joke_bot');
var dbt = mongoose.connection;

var matchHash;
matchHash = this.res;
var nodemailer = require('nodemailer');
var moment = require('moment-timezone');
moment.tz.setDefault('America/Toronto');
var date = moment().format('LLLL');
var commandListSuccess = require('./commands_success/command-list.js'); //commandListSuccess.buildHTML(cmdArr, config.bot_name);
var ccml = require('./modules/command-list.js');




var path = require('path');
var fs = require('fs');
var http, director, bot, router, server, port, ip, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');


router = new director.http.Router({
  '/'    : {
    get: ping
  },

'/home' : {
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

  '/init' : {
    get:  bot.init,
    post: bot.init
  },

/*
'/countdown' : {
    get: count
 },
*/

'/commands_success' : {
  get: bot.command_success,
  post: commands_success
},

'/rend_command' : {
  get: rend_command
},

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








if(req.url === '/countdown' || req.url === '/login' || req.url === '/details' || req.url === '/detail' || req.url === '/jokes' || req.url === '/amaral' || req.url === '/images' || req.url === '/images/:id' || req.url === '/me') {
app(req, res);
}

if(req.url === '/upp' || req.url === '/delete/:id' || req.url === '/recent' || req.url === '/multiple' || req.url === '/files' || req.url === '/file/:filename' || req.url === '/image/:filename' || req.url === '/file/del/:id' || req.url === '/uploads') {
  upp(req, res);

  } else {

router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
  res.end(err.message);
    });
  }
});

port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

server.listen(port, ip, function() {
console.log('Server started at ' + date + ' & listening on port ' + port);

});

//--------------

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.set('view engine', 'ejs');
upp.engine('jade', require('jade').__express);
upp.engine('ejs', require('ejs').renderFile);

/*
upp.get('/uploads', function(req, res) {
//res.writeHead(200);
//res.send("I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
//res.send('Hello');
res.render('/uploads/views/layout.jade');
});
*/

app.get('/countdown', function(req, res) {
//res.writeHead(200);
res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/countdown.html"));
//this.res.write(html);
//this.res.end();
res.send(html);
//res.send('Hello');
});

app.get('/jokes', function(req, res) {
res.render('index', { details: null });
});

app.get('/detail', function(req, res) {
res.render('getdetails');
});

app.post('/detail', function(req, res) {
Customer.findOne({name: req.body.name}, function(err, user) {
if (err) {
console.log(err);
} else if (user){

var query = Customer.find({}); //, function(err, allDetails) {
query.sort({name: 'asc'}).exec(function(err, allDetails) {
if (err) {
console.log(err);
} else {
res.render('getdetails', { details: allDetails });
}
});

} else {
res.send('Invalid Credentials'); //, { details: allDetails });
}
});
});



/*
app.get('/jokes', function(req, res) {
//res.writeHead(200);
//res.setHeader('Content-type', 'text/html');

//var html = fs.readFileSync(path.join(__dirname + "/views/index.html"));

//var name = req.name;

// var password = req.password;

//dbt.collection('joke_bot').find({name}, function(err, Customer) {
//if (err) throw err;
// object of all the users
res.render("index.ejs", {details: null});
});
//res.setHeader('Content-type', 'text/html');
//var html = fs.readFileSync(path.join(__dirname + "/views/index.html"));

//this.res.write(html);
//this.res.end();

//res.send(html);
//res.send('Hello');
//});
*/

app.get('/details', function(req, res) {
Customer.find({}, function(err, allDetails) {
if (err) {
console.log(err);
} else {
res.render('getdetails', { details: allDetails });
}
});
});

app.get('/login', function(req, res) {
res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/index.html"));
res.send(html);
});


app.get('/amaral', function(req, res) {
res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/amaral.html"));
res.send(html);
});

app.get('/home', function(req, res) {
//res.writeHead(200);
res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/home.html"));
res.send(html);
});



var routes = require('./routes/homemodel');
// connect to mongodb with default port (27017)
//mongoose.connect('mongodb://localhost/imagespath');

app.use(routes);
//app.use(uploadroutes);
//app.use(retrieveroutes);

// URL : http://localhost:8000/images/
// To get all the images/files ids stored in MongoDB

/*
app.get('/images', (req, res) => {

    // http://mongoosejs.com/docs/api.html#model_Model.create
    routes.getImages((err, docs) => {
        if (err) {
            throw err;
        }
        //res.json(docs.map(doc => doc['_id']));
    });
});
*/

routes.get('/images', (req, res) => {

    // http://mongoosejs.com/docs/api.html#model_Model.create
/*    routes.getImages((err, docs) => {
        if (err) {
            throw err;
        }
        //res.json(docs.map(doc => doc['_id']));
    });
*/
});

routes.get('/images/:id', (req, res) => {

    // http://mongoosejs.com/docs/api.html#model_Model.create
   /* routes.getImagesById((err, docs) => {
        if (err) {
            throw err;
        }

res.render('image', { image: 'data:image/jpeg; base64,' + base64ArrayBuffer(file.data)});

    });
*/
});

upp.use(imageRouter);
/*
//var me = require('./uploads/server/models/image.js');
upp.get('/uploads', (req, res) => {

res.render('./uploads/model/index', { details: null });
});
*/

imageRouter.get('/uploads', (req, res) => {
//res.writeHead(200);
//res.send("I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
//res.send('Hello');
//res.render('/uploads/views/layout.jade');
});

function ping() {
  this.res.writeHead(200);
  this.res.end("I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
}

function count() {
  this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/countdown.html"));
this.res.write(html);
this.res.end();
}

function test() {
  this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/test.html"));
this.res.write(html);
this.res.end();
}



function home() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/home.html"));
this.res.write(html);


 // this.res.write(fs.readFile(path.join(__dirname + "./countdown.html")));
  this.res.end();
}


function login() {
//var username = config.username;
//var userpassword = config.userpassword
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var html = fs.readFileSync(path.join(__dirname + "/views/index.html"));
this.res.write(html);
this.res.end();
}

async function clicks() {
var out = "";
var output = out += docs;
var docs = await db.collection('details').find({}).toArray(function(err, docs) {
if(err) throw err;
var out = "";
var output = out += docs;
});


//var docs = "";
var i;
for (var i in docs) {
i = 0; i++;
}
//var name = await getAllDo(docs[name]).catch(error => console.log(error.stack));
 //this.req.body.name;
  /*
  var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;
*/
//var ret = [];
//var docs = {};
//var msg = docs[{name}];

async function getAllDo(docs) {

var docs = await db.collection('details').find({}).toArray(function(err, docs) {
if(err) throw err;
var out = "";
var output = out += docs;
});
var out = "";
var output = out += docs;

//init();
db.collection('details').find({}).toArray(function(err, docs) {
if(err) throw err;
//docs = docs[i];

/*
if (docs < 1) { //docs[name] != null || docs[name] != data.name) { //< 1) {
//additFunc();
}
*/
//if (docs) {
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
  console.log('Docs found');
console.log(docs); //db.close();
//}
});
//bot.command_success();
return docs;
}

/*db.collection('details').find({ALEX DE AGUIAR}).toArray(function(err, docs) { // callback) { if (docs || callback) { callback(ret[docs].name); } });
if (err) throw err;
console.log(docs);
});
//this.res.write("Hi");
*/
 /*  var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;
*/
getAllDo();
this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/plain', 'Access-control-Allow-Origin', '*');
/*
var dbhs;
db.collection('details').find({}, function(err, docs) {

var dbhs = docs;
if (err) console.log(err);
//this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');


if (docs) {
this.res.read(dbhs[{name}]);
console.log(dbhs[{name}]);//this.res.send(result);
}
});
*/
/*
if (name)
console.log(name);
*/
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
this.res.write("Hi");
this.res.write(output);
this.res.end();
//});
}

function rend_command() {
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var html = fs.readFileSync(path.join(__dirname + "/index.html")); //"/commands_success/index.html"));
this.res.write(html);
this.res.end();
}


function commands_success() {
/*
var mainHTML, allHTML, modHTML, ownerHTML;
var fs = require('fs');
//var config = require('../config/config');


//init();

function init() {
  getFileAll('commands_success/command_success.html', function(data) {
    mainHTML = data;
  });
  getFileAll('commands_success/partials/_all.html', function(data) {
    allHTML = data;
  });
  getFileAll('commands_success/partials/_mod.html', function(data) {
    modHTML = data;
  });
  getFileAll('commands_success/partials/_owner.html', function(data) {
    ownerHTML = data;
  });
}

//feels pointless, come up with a better way to do this
function getFileAll(path, callback) {
//fs.readFileSync(path.join, 'utf8', function(err, data){ //(__dirname + "/views/amaral.html"));

  fs.readFile(path, 'utf8', function(err, data){
    callback(data);
  });
}

var buildHTML = function (cmdArray, bot_name) {
  var modArr   = [];
  var ownerArr = [];
  var allArr   = [];
  //bot_name     = config.bot_name;

  cmdArray.sort(function(a, b) {
    if (a.cmd < b.cmd)
      return - 1;
    else if (a.cmd > b.cmd)
      return 1;
    else
      return 0;
  });

  for (cmd in cmdArray) {
    if (!cmdArray[cmd].desc)
      cmdArray[cmd].desc = "No description provided ... thanks lazy mods";

    if (cmdArray[cmd].owner)
      ownerArr.push(cmdArray[cmd]);
    else if (cmdArray[cmd].mod)
      modArr.push(cmdArray[cmd]);
    else
      allArr.push(cmdArray[cmd]);
  }

  //put this repetitive code in a function ... you're better than this
  var allBuiltHTML   = '';
  var modBuiltHTML   = '';
  var ownerBuiltHTML = '';

  for (cmd in allArr) {
    var addHTML = allHTML.replace('$$command_name', allArr[cmd].cmd);
    addHTML = addHTML.replace('$$command_desc', allArr[cmd].desc);
    allBuiltHTML += addHTML;
  }

  for (cmd in modArr) {
    var addHTML = modHTML.replace('$$command_name', modArr[cmd].cmd);
    addHTML = addHTML.replace('$$command_desc', modArr[cmd].desc);
    modBuiltHTML += addHTML;
  }

  for (cmd in ownerArr) {
    var addHTML = ownerHTML.replace('$$command_name', ownerArr[cmd].cmd);
    addHTML = addHTML.replace('$$command_desc', ownerArr[cmd].desc);
    ownerBuiltHTML += addHTML;
  }

  var mainBuiltHTML = mainHTML;
  mainBuiltHTML = mainBuiltHTML.replace('$$bot_name', 'Alex Bot');
  mainBuiltHTML = mainBuiltHTML.replace('$$all', allBuiltHTML);
  mainBuiltHTML = mainBuiltHTML.replace('$$mod', modBuiltHTML);
  mainBuiltHTML = mainBuiltHTML.replace('$$owner', ownerBuiltHTML);

  return mainBuiltHTML;
}
*/


//_______€€€_______


  var bot_name = "AlexBot";
  var cmdArr = [];
  //function cmdit() {
//console.log('displaying commands at /commands');

  /*
 for(var lib in bot.checkCommandsHSH){
    var newCmds = bot.checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
*/
//}

 var output = commandListSuccess.buildHTML(cmdArr, bot_name); //; //ccml.buildHTML(cmdArr, bot_name); //buildHTML(cmdArr, bot_name);


var name = this.req.body.name;
    var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;

  

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }

   var cursor = db.collection('details').find({name});
var ret = [];
var results = cursor; //.each();

function getAllDocs() {
//init();
db.collection('details').find({name}).toArray(function(err, docs) {
if(err) throw err;

if (docs < 1) { //docs[name] != null || docs[name] != data.name) { //< 1) {
additFunc();
}

if (docs) {
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
  console.log('displaying commands at /commands_success');
console.log(docs); //db.close();
}
});
//bot.command_success();
}


function additFunc() {
//results.forEach(iterateFunc, errorFunc);

db.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log("User " + data.name + " added");
});
}

function iterateFunc(doc, callback) {
console.log(JSON.stringify(doc, null, 4));
}
function errorFunc(error) {
console.log(error);
}

getAllDocs();
//bot.commands();
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var bot_name = "AlexBot";
  var cmdArr = [];
  //function cmdit() {
//console.log('displaying commands at /commands');
/*
   for(var lib in bot.checkCommandsHSH){
    var newCmds = bot.checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
*/
var html = fs.readFileSync(path.join(__dirname + "/commands_success/command_success.html"));
//var outputSuccess = buildHTML(cmdArr, bot_name);
this.res.write(output);
//this.res.write(html);
//this.res.redirect('signup_success.html');
this.res.end();
//this.res.writeHead(200, {"Content-Type": "text/html"});
//this.res.end();
}





function signup() {
var output;



var name = this.req.body.name;

    var email = this.req.body.email;

    var pass = this.req.body.password;

    var phone = this.req.body.phone;

  

    var data = {

        "name": name,

        "email": email,

        "password": pass,

        "phone": phone

    }


 /*
  var collection = {
  "name": name,
  "email": email,
  "password": pass,
  "phone": phone
  }
*/


   var cursor = db.collection('details').find({name});
var ret = [];
var results = cursor; //.each();

//var done = "this.res.statusCode = 200; this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*'); var html = fs.readFileSync(path.join(__dirname + "/index.html")); this.res.write(html); this.res.end();";

function getAllDocs() {


db.collection('details').find({name}).toArray(function(err, docs) {
if(err) throw err;

if (docs < 1) {
additFunc();
//var html = fs.readFileSync(path.join(__dirname + "/signup_success.html"));

}
if (docs) {

//var html = fs.readFileSync(path.join(__dirname + "/index.html"));

console.log(docs); //db.close();
}
});
}

//var res = null;
/*
var res = {
"name": name
}
*/
function additFunc() {
//results.forEach(iterateFunc, errorFunc);

//var one = {{"name": 1}, {unique: true}};
//if (!collection.name) {
db.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log(data.name + "\n User added");
//console.log(result + "\n added");
});

}

function iterateFunc(doc, callback) {

console.log(JSON.stringify(doc, null, 4));


}
function errorFunc(error) {
console.log(error);
}

getAllDocs();
var cmdArr = [];
var cmdarray = [];

  console.log('displaying commands at /commands');

  for(var lib in bot.checkCommandsHSH){
    var newCmds = bot.checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
 }

//var output = bot.commandList.buildHTML(cmdArr, bot.config.bot_name);


  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
//var html = fs.readFileSync(path.join(__dirname + "/commands_success/command_success.html")); //"/signup_success.html"));
var html = bot.commands(output); //bot.commands();
this.res.write(html);
//this.res.redirect('signup_success.html');
this.res.end();
}



function amaral() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/amaral.html"));
this.res.write(html);


 // this.res.write(fs.readFile(path.join(__dirname + "./countdown.html")));
  this.res.end();
}

function rend() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/login.html"));
this.res.write(html);


 // this.res.write(fs.readFile(path.join(__dirname + "./views/login.html")));
  this.res.end();
}
