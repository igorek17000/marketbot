var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var getIpData = require('./modules/ipdata.js');
var routes = require('./routes/routes.js');
var port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

   var ip = '24.114.79.251';
   //var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
app.use(routes);

app.listen(port, function(error) {
  if(error) {
    console.log(error);
  }
  console.log('Server running on Port: ' + port);
});
