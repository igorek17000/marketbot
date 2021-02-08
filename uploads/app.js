var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var config = require('./config');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto');
var cors = require('cors');
//
var imageRouter = require('./routes/image');

var upp = express();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
    origin: '*',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/*
var url = config.mongoURI;
var connectt = mongoose.connection; //connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to the database
connectt.then(() => {
  console.log('Connected to database: GridApp');
}, (err) => console.log(err));
*/
/*
    GridFs Configuration
*/

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

app.use(imageRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
