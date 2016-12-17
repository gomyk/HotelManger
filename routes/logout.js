var passport = require('passport');
var express = require('express');
var router = express.Router();
/* GET home page. */
var check = false;
  router.get('/', function (req, res, next) {
        req.logout();
        req.session.destroy();
        if(req.user){
          check = true;
        }
        res.render('index', { title: 'Express',login:check});
      }
  );


module.exports = router;
