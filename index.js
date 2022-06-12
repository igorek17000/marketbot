var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var getIpData = require('./ipdatadata.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

   var ip = '24.114.79.251';
   //var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

app.get('/yo', async function(req, res) {
  //var ip = '24.114.79.251';
  //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var ipdata = await getIpData(ip);
  var { is_threat, is_anonymous } = ipdata.threat;
  if (is_threat) {
    console.log("Blocked IP");
    res.status(403).send("Blocked IP");
    return;
  }
  if (!is_anonymous) {
    console.log("VPN's are not allowed");
    res.status(403).send("VPNs are not allowed");
    return;
  }
  console.log("Welcome\n" + is_threat + '\n' + is_anonymous);
  res.status(200).send("Welcome");

});
/*
app.post("/yo", async (req, res) => {
  const ip = req.connection.remoteAddress;
  const ipdata = await getIpData(ip);
  const { is_threat, is_anonymous } = ipdata;
  if (is_threat) {
    res.status(403).send("Blocked IP");
    return;
  }
  if (is_anonymous) {
    res.status(403).send("VPNs are not allowed");
    return;
  }
res.status(200).send("Welcome");
});
*/
app.listen(8080);
