var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var sqlite3 = require('sqlite3').verbose();
//var client = redis.createClient(6379, '127.0.0.1');
var db = new sqlite3.Database('TEST.db');
var flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session');
var hotelSystems = require('./routes/hotelsystem');
global.hotelSystem = new hotelSystems();
////////////////////////////////////////////////
var routes = require('./routes/index');
var users = require('./routes/users');
var account_routes = require('./routes/create_account');
var check = require('./routes/checksign');
var log_in = require('./routes/login');
var log_out = require('./routes/logout');
var check_log = require('./routes/checklog');
//reservation
var show_room = require('./routes/showroom');
var reserv_room = require('./routes/reserv');
var showreservation = require('./routes/showreservation');
var showreservation2 = require('./routes/showreservation2');
var deletereservation = require('./routes/deletereservation');

//employee
var addemployee = require('./routes/addemp');
var updateemployee = require('./routes/updateemp');
var deleteemployee = require('./routes/deleteemp');
var showemployee = require('./routes/showemployee');
var showroomlist = require('./routes/showroomlist');
var addroom = require('./routes/addroom');
var updateroom = require('./routes/updateroom');
var deleteroom = require('./routes/deleteroom');
var addcompany = require('./routes/addcompany');
var updatecompany = require('./routes/updatecompany');
var deletecompany = require('./routes/deletecompany');
var showcompany = require('./routes/showcompany');
var addstuff = require('./routes/addstuff');
var deletestuff = require('./routes/deletestuff');
var updatesutff = require('./routes/updatestuff');
var showstuff = require('./routes/showstuff');
var showsalelist = require('./routes/showsalelist');

var app = express();

db.serialize(function () {
  db.run("CREATE TABLE if not exists CUSTOMER (ID TEXT NOT NULL,PASSWORD TEXT NOT NULL,NAME TEXT NOT NULL,EMAIL CHAR(50),POINT INT,GRADE INT)");
  db.run("CREATE TABLE if not exists EMPLOYEE (ID TEXT NOT NULL,PASSWORD TEXT NOT NULL,NAME TEXT NOT NULL,EMAIL CHAR(50),SALARY INT,AUTHO INT)");
  db.run("CREATE TABLE if not exists ROOMS (ROOMNUMBER TEXT NOT NULL, CLEAN INT, RESERVED INT,RESERVID TEXT,RESERVNAME TEXT,GRADE INT)");
  db.run("CREATE TABLE if not exists RESERVATION (CODE TEXT NOT NULL,ID TEXT,NAME TEXT,ROOMNUMBER TEXT,DATE TEXT)");
  db.run("CREATE TABLE if not exists COMPANY (NAME TEXT NOT NULL,TEL TEXT,FEE INT)");
  db.run("CREATE TABLE if not exists STUFF (CODE TEXT NOT NULL,NAME TEXT,COMPANY TEXT,COUNT INT,PRICE INT)");
  db.run("CREATE TABLE if not exists SALE (NUMBER INT NOT NULL, NAME TEXT, PLUS TEXT, DATE TEXT)");
});
app.use(flash());


require('./auth/passport').setup();
app.use(session({ secret: 'secret',
resave: false,
saveUninitialized: false,
cookie: {
    maxAge: 1000 * 60 * 60
}
 }));



app.use(passport.initialize());
app.use(passport.session());

function IsAuthorized(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        return res.redirect('/');

}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/create_account',account_routes);
app.use('/checksign',check);
app.use('/login',log_in);
app.use('/checklog',check_log);
app.use('/logout',log_out);
app.use('/showroom',show_room);
app.use('/reservation',reserv_room);
app.use('/showreservation',showreservation);
app.use('/showreservation2',showreservation2);
app.use('/showcompany',showcompany);
app.use('/deletereservation',deletereservation);
app.use('/addemployee',addemployee);
app.use('/updateemployee',updateemployee);
app.use('/deleteemployee',deleteemployee);
app.use('/showemployee',showemployee);
app.use('/showroomlist',showroomlist);
app.use('/addroom',addroom);
app.use('/updateroom',updateroom);
app.use('/deleteroom',deleteroom);
app.use('/addcompany',addcompany);
app.use('/updatecompany',updatecompany);
app.use('/deletecompany',deletecompany);
app.use('/addstuff',addstuff);
app.use('/deletestuff',deletestuff);
app.use('/updatestuff',updatesutff);
app.use('/showstuff',showstuff);
app.use('/showsalelist',showsalelist);

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404');
  next(err);
});
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
