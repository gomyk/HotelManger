var express = require('express');
var passport = require('passport');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var max ;

var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var reserv;
router.get('/',function(req,res,next){
  console.log("ddddd");
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){

     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  if(req.user.GRADE == "2"){
   res.render('showreservlist',{title:'Express',username:username,grade:grade});
  }
  else{
    res.render('index', { title: 'Express'});
  }
});

router.post('/',function(req,res,next){
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){

     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  reserv = {date:req.param('date'),number:req.param('number')};
  console.log(reserv);
  if(!hotelSystem.serviceManage("deletereserv",reserv)){
    check = true;
    var data = [];
    var count = 0;
    var username = '';
    var grade = 0;

      if(req.user){

       username = req.user.NAME;
       grade = req.user.GRADE;
      }

      db.serialize(function () {
        db.each("SELECT COUNT(*) as RESULT FROM RESERVATION",function(err, row) {
            console.log('max:', row.RESULT);
            max = row.RESULT;
            if(max == 0){
                res.render('showreservlist', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
            }
        });
        db.each("SELECT * FROM RESERVATION",function(err, row) {
          console.log('REUSLT:', row);

          if(max!=0){
            data[count] = row;
              count++;
          }
          if(max == count){
              res.render('showreservlist', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
          }
        });
      });
  }else{
    res.render('index', { title: 'Express'});
  }
});
module.exports = router;
