

var express = require('express'); 

var bodyParser = require('body-parser'); 

  

var mongoose = require('mongoose'); 

mongoose.connect('mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'); 

var db = mongoose.connection; 

db.on('error', console.log.bind(console, "connection error")); 

db.once('open', function(callback){ 

    console.log("connection succeeded"); 
}) 

  

var app = express() 

  

  
app.use(bodyParser.json()); 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 

    extended: true
})); 

  

app.post('/sign_up', function(req,res){ 

    var name = req.body.name; 

    var email = req.body.email; 

    var pass = req.body.password; 

    var phone = req.body.phone; 

  

    var data = { 

        "name": name, 

        "email": email, 

        "password": pass, 

        "phone": phone 

    } 

db.collection('details').insertOne(data,function(err, collection){ 

        if (err) throw err; 

        console.log("Record inserted Successfully"); 

              

    }); 

          

    return res.redirect('signup_success.html'); 
}) 

  

  

app.get('/',function(req,res){ 
res.set({ 

    'Access-control-Allow-Origin': '*'

    }); 

return res.redirect('index.html'); 
}).listen(port) 

  
var port = 27017 || 8080 || 3002;
var ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

//server.listen(port);

/*
server.listen(port, ip, function() { 
console.log('Server started at ' + date + ' & listening on port ' + port);
router.post('Server');

//console.log((new Date()) + ' Server is listening on port ' + port);
});

  */

console.log("server started"); 
