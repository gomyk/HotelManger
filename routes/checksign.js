
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var login = true;
var check ;
var insertDB = db.prepare("INSERT INTO CUSTOMER VALUES (?,?,?,?,?,?)");

/* GET home page. */
router.post('/', function(req, res ,next) {
//res.render('index', { title: 'Express',login:login});
  var name = req.param('name');
  var id = req.param('id');
  var email = req.param('email');
  check = true;
  var password = req.param('password');

  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  //var password = request.param('password');
  db.serialize(function () {

    db.each("SELECT COUNT(*) as RESULT FROM CUSTOMER WHERE ID = ?",id,function(err, row) {
      console.log('row:',row.RESULT);
      if(row.RESULT != 0){
      check = false;
      }
      if(check){
        insertDB.run(id,password,name,email,0,0);
      //  updateDB.run();
        res.redirect('/');
      }
      else{
        res.render('create_account',{ title: 'Express',fail:true,username:username,grade:grade});
      }
    });
  });
});

module.exports = router;
