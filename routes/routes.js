var express = require('express');
var router = express.Router();
var app = express();
var routes = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var moment = require('moment');
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var getIpData = require('../modules/ipdata.js');
getAllDocuments = require('../modules/dbfunctions.js')
//var ip = '24.114.79.251';
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(async function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ip.split(/, /)[0];
  var ipdata = await getIpData(ipp);
  var { is_threat, is_anonymous } = ipdata.threat;
  if (is_threat) {
    console.log("Blocked IP");
    res.status(403).end("Not Allowed");
    return;
  }
  if (is_anonymous) {
    console.log("VPN's are not allowed");
    res.status(403).end("VPN's are not allowed."); //"VPNs are not allowed");
    return;
  }
  if (process.env.NODE_ENV != 'development') {
    /*
  if (!req.secure) { // || request.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || request.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') { // || //request.headers.host == 'marketbot.ca') { // || request.headers.host == 'https://www.marketbot-ai.com' || request.headers.host == 'marketbot-ai.com' || !request.secure) {
  return res.status(301).redirect('https://marketbotai.com/home');
  }
  */
    if (req.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || req.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') { // || //request.headers.host == 'marketbot.ca') { // || request.headers.host == 'https://www.marketbot-ai.com' || request.headers.host == 'marketbot-ai.com' || !request.secure) {
  return res.status(301).redirect('https://marketbotai.com/home');
  }
  }
  next();
  });

   //var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

app.get('/', async function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ip.split(/, /)[0];


//getIpData(ipp);
  //var matchHash = {ip: ipp, reqUrl: req.url, date: date, time: time, info: info};
  var ipdata = await getIpData(ipp);
  var { is_ip } = ipdata;
  //var ipp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var reqUrl = req.path; //is_ip;
//var info = [];
  var { is_threat, is_anonymous } = ipdata.threat;
  if(!is_threat) {
getAllDocuments(reqUrl);
}
  console.log(req);
  res.status(200).send("Welcome");

});


module.exports = app;
