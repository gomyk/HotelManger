var express = require('express');
var passport = require('passport');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var router = express.Router();
var max;
var reserv;
router.get('/',function(req,res,next){
  console.log("ddddd");
  var username = '';
  var grade = 0;
  var data = [];
  max = 0;
  var count = 0;
  var chec = false;
  console.log("가지고온것 : ",req.param('number'));
  if(req.user){
    chec = true;
   username = req.user.NAME;
   grade = req.user.GRADE;
   db.serialize(function () {
     db.each("SELECT COUNT(*) as RESULT FROM ROOMS",function(err, row) {
         console.log('max:', row.RESULT);
         max = row.RESULT;
         if(max ==0){
             res.render('reservationjade', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade,num:req.param('number')});
         }
     });
     db.each("SELECT * FROM ROOMS",function(err, row) {
       console.log('REUSLT:', row);

       if(max!=0){
         data[count] = row;
           count++;
       }
       if(max == count){
         res.render('reservationjade', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade,num:req.param('number')});
       }
     });
   });
  }
  else{
    res.render('login', {title:'Express',login:chec,username:username,grade:grade});
  }
});

router.post('/',function(req,res,next){
  var username = '';
  var grade = 0;
  var chec = false;
    console.log(req.user);
    if(req.user){
      chec = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
  reserv = {id:req.user.ID,name:req.user.NAME,email:req.user.EMAIL,extra:req.param('message'),date:req.param('date'),number:req.param('number')};
  console.log(reserv);
  hotelSystem.serviceManage("reservation",reserv);
  res.render('index',{title:'Express',login:chec,username:username,grade:grade});
});
module.exports = router;
