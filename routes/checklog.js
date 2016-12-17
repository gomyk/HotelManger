var passport = require('passport');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var check ;
/* GET home page. */
  router.post('/', function (req, res, next) {
          if (req.body.id.length == 0 || req.body.password.length == 0) {
              //    res.redirect('/login');
          } else {
              next();
          }
      }, passport.authenticate('local-login', {
          failureFlash: 'invalid id or password',
          successFlash: 'login Success',
          successRedirect : '/',
          failureRedirect: '/login',
          failureFlash: true

      }), function (req, res) {
        //  res.send('/', { title: 'Express',user:req.user});
    }
  );


module.exports = router;
