var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
  res.render('create_account', { title: 'Express',username:username,grade:grade});
});

module.exports = router;
