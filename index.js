var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var getIpData = require('./modules/ipdata.js');
var routes = require('./routes/routes.js');
var port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
//var ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

   //var ip = '24.114.79.251';
   //var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
app.use(routes);

app.listen(port, function(error) {
  if(error) {
    console.log(error);
  }
  console.log('Server running on Port: ' + port + ', IP: ' + ip);
});
