var express = require('express');
var router = express.Router();
var app = express();
var routes = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var ejs = require('ejs');
var path = require('path');
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
app.use(express.static('partials'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(/, /)[0];
  var ipdata = await getIpData(ipp);
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

  if (is_threat || is_known_abuser || is_known_attacker) {
    var ipdataa = date + " " + time + "\n" + ipp + "\n" + "Blocked Threat!" + "\n" + req.protocol + '://' + domain + "\n" + req.protocol + '://' + domain + "\n" + "ip: " + ipp + "\n" + "City: " + city + "\n" + "Country: " + country_name + "\n" + "Threat: {" + "\n" + "is_threat: " + is_threat + "\n" + "is_known_attacker: " + is_known_attacker + "\n" + "is_known_abuser: " + is_known_abuser + "\n" + "is_anonymous: " + is_anonymous + "\n" + "}";
    var domain = ipdata.asn.domain;
    var ip = ipdata.ip;
    var city = ipdata.city;
    var country_name = ipdata.country_name;
    var postal = ipdata.postal;
    console.log(ipdataa);
    res.status(403).end("Access Denied");
    return;
  }

  if (is_anonymous) {
    var ipdataa = date + " " + time + "\n" + ipp + "\n" + "VPN's are not allowed" + "\n" + req.protocol + '://' + domain + "\n" + req.protocol + '://' + domain + "\n" + "ip: " + ipp + "\n" + "City: " + city + "\n" + "Country: " + country_name + "\n" + "Threat: {" + "\n" + "is_threat: " + is_threat + "\n" + "is_known_attacker: " + is_known_attacker + "\n" + "is_known_abuser: " + is_known_abuser + "\n" + "is_anonymous: " + is_anonymous + "\n" + "}";
    var domain = ipdata.asn.domain;
    var ip = ipdata.ip;
    var city = ipdata.city;
    var country_name = ipdata.country_name;
    var postal = ipdata.postal;
    console.log(ipdataa);
    res.status(403).end("VPN's are not allowed.");
    return;
  }

  //if (process.env.NODE_ENV != 'development') {
  if (!req.secure || req.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || req.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') {
  return res.status(301).redirect('https://marketbotai.com');
  }
//}
  next();
  });

app.get('/', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(/, /)[0];
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ip + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + ', \n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '}';

  console.log(logg);
  res.render('ai.marketing.ejs');
});

app.get('/home', async function(req, res, next) {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipp = ippp.split(/, /)[0];
  var reqUrl = req.path;
  var ipdata = await getIpData(ipp);
  var { ip, city, country_name, postal } = ipdata;
  var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;

getAllDocuments(ipp, reqUrl);
var logg = date + ' ' + time + '\n' + ip + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + ', \n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '}';

  console.log(logg);
  res.render('menu.ejs');
});


module.exports = app;
