var express = require('express');
var passport = require('passport');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var company;
router.get('/',function(req,res,next){
  console.log("ddddd");
  var username = '';
  var grade = 0;
  var max = 0;
  var count = 0;
  var data = [];
    console.log(req.user);
    if(req.user){
      check = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  if(grade >1){
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM COMPANY",function(err, row) {
          console.log('max:', row.RESULT);
          max = row.RESULT;
          if(max ==0){
              res.render('index', { title: 'Express',count:count,data:JSON.stringify(data),login:check,username:username,grade:grade});
          }
      });
      db.each("SELECT * FROM COMPANY",function(err, row) {
        console.log('REUSLT:', row);

        if(max!=0){
          data[count] = row;
            count++;
        }
        if(max == count){
           res.render('deletecompany',{title:'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
        }
      });
    });
  }
  else{
    res.render('index', { title: 'Express',login:check,username:username,grade:grade});
  }
});

router.post('/',function(req,res,next){
  var username = '';
  var grade = 0;
  var check = false;
    console.log(req.user);
    if(req.user){
      check = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  company = {name:req.param('name')};
  console.log(company);
  if(!hotelSystem.companyManage("delete",company)){
    res.render('index',{title:'Express',login:check,username:username,grade:grade});
  }else{
    res.render('index', { title: 'Express'});
  }
});
module.exports = router;
