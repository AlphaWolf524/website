var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var forceSSL = require('express-force-ssl');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var contact = require('./routes/contact');
var summer = require('./routes/summer');
var competition = require('./routes/competition');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(forceSSL);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('helmet') ());

app.use('/', routes);
app.use('/users', users);
app.use('/contact', contact);
app.use('/summer', summer);
app.use('/competition', competition);

app.use('/notresponsible', function(req, res, next) {
  res.render("notresponsible/index");
});

app.use('/3VStAmagb2vEFNn3QHkbTRGx', function(req, res, next) {
  if(fs.existsSync(path.join(__dirname, 'public/Temp/this.7z')))
    res.download('./public/Temp/this.7z');
  else
    res.render("notresponsible/oops");
});

// app.get('/health-check', (req, res) => res.sendStatus(200));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
