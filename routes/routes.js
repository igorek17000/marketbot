var express = require('express');
var router = express.Router();
var app = express();
var routes = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var moment = require('moment');
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var getIpData = require('../modules/ipdata.js');
getAllDocuments = require('../modules/dbfunctions.js')
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(async function(req, res, next) {
  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(/, /)[0];
  var ipdata = await getIpData(ipp);
  var ipdataa = ipdata.ip + ipdata.city + ipdata.country_name + ipdata.threat;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

  if (is_threat) {
    console.log("Blocked is_threat IP at " + date + " " + time + "\n" + ipdata.ip);
    res.status(403).end("Access Denied");
    return;
  }
    if (is_known_abuser) {
    console.log("Blocked is_known_abuser IP at " + date + " " + time + "\n" + ipdata.ip);
    res.status(403).end("Access Denied");
    return;
  }
    if (is_known_attacker) {
    console.log("Blocked is_known_attacker IP at " + date + " " + time + "\n" + ipdata.ip);
    res.status(403).end("Access Denied");
    return;
  }
  if (is_anonymous) {
    console.log("VPN's are not allowed at " + date + " " + time + "\n" + ipdata.ip);
    res.status(403).end("VPN's are not allowed.");
    return;
  }

  //if (process.env.NODE_ENV != 'development') {
  if (!req.secure || req.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || req.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') {
  return res.status(301).redirect('https://marketbotai.com');
  }
  /*
    if (req.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || req.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') { // || //request.headers.host == 'marketbot.ca') { // || request.headers.host == 'https://www.marketbot-ai.com' || request.headers.host == 'marketbot-ai.com' || !request.secure) {
  return res.status(301).redirect('https://marketbotai.com/home');
  }
  */
  //}
  next();
  });

app.get('/', async function(req, res, next) {
  var logg = date + ' ' + time + '\n' + ip + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + ipdata.city + ', \n' + 'Contry: ' + ipdata.country_name + ', \n' + 'Postal: ' + ipdata.postal + ', \n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + ipdata.asn.name + ', \n' + 'Domain: ' + ipdata.asn.domain + '\n' + '}';
  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(/, /)[0];
  var ipdata = await getIpData(ipp);
  var { ip } = ipdata;
  var reqUrl = req.path;
  var { is_threat, is_anonymous } = ipdata.threat;

getAllDocuments(ipp, reqUrl);

  console.log(logg);
  res.render('menu2.ejs');
});

app.get('/home', async function(req, res, next) {
  var logg = date + ' ' + time + '\n' + ip + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + ipdata.city + ', \n' + 'Contry: ' + ipdata.country_name + ', \n' + 'Postal: ' + ipdata.postal + ', \n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + ipdata.asn.name + ', \n' + 'Domain: ' + ipdata.asn.domain + '\n' + '}';
  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(/, /)[0];
  var ipdata = await getIpData(ipp);
  var { ip } = ipdata;
  var reqUrl = req.path;
  var { is_threat, is_anonymous } = ipdata.threat;

getAllDocuments(ipp, reqUrl);

  console.log(logg);
  res.render('menu.ejs');
});


module.exports = app;
