var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  var check = false;
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
      check = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    hotelSystem.printwho();
    hotelSystem.changewho(username);
    res.render('index', { title: 'Express',login:check,username:username,grade:grade});
});

module.exports = router;
