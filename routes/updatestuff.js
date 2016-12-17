var express = require('express');
var passport = require('passport');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var stuff;
router.get('/',function(req,res,next){
  console.log("ddddd");
  var chec = false;
  var username = '';
  var grade = 0;
  var max = 0;
  var max2 =0;
  var count2 = 0;
  var count = 0;
  var data = [];
  var data2 = [];
    console.log(req.user);
    if(req.user){
      chec = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
  if(grade >1){
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM STUFF",function(err, row) {
          console.log('max:', row.RESULT);
          max2 = row.RESULT;
          if(max2 ==0){
          }
      });
      db.each("SELECT * FROM STUFF",function(err, row) {
        console.log('REUSLT:', row);

        if(max2!=0){
          data2[count2] = row;
            count2++;
        }
        if(max2 == count2){
        }
      });
      db.each("SELECT COUNT(*) as RESULT FROM COMPANY",function(err, row) {
          console.log('max:', row.RESULT);
          max = row.RESULT;
          if(max ==0){
              res.render('index', { title: 'Express',login:check,username:username,grade:grade});
          }
      });
      db.each("SELECT * FROM COMPANY",function(err, row) {
        console.log('REUSLT:', row);

        if(max!=0){
          data[count] = row;
            count++;
        }
        if(max == count){
           res.render('updatestuff',{title:'Express',count2:count2,data2:JSON.stringify(data2),count:count,data:JSON.stringify(data),username:username,grade:grade});
        }
      });
    });
  }
  else{
    res.render('index', { title: 'Express',login:chec,username:username,grade:grade});
  }
});

router.post('/',function(req,res,next){
  var chec = false;
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
    chec = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
  stuff = {name:req.param('name'),company:req.param('company'),count:req.param('count'),price:req.param('price'),code:req.param('code')};
  console.log(stuff);

  if(!hotelSystem.stuffManage("update",stuff)){
    res.render('index', { title: 'Express',login:chec,username:username,grade:grade});
  }else{
      res.render('index', { title: 'Express',login:chec,username:username,grade:grade});
  }
});
module.exports = router;
