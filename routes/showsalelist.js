var express = require('express');
var router = express.Router();
var check;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var max ;
var salemanagers = require('./salemanager');
var salemanager = new salemanagers;

router.get('/',function(req,res,next){
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
      db.each("SELECT COUNT(*) as RESULT FROM SALE",function(err, row) {
          console.log('max:', row.RESULT);
          max = row.RESULT;
          if(max == 0){
            res.render('showsalelist', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
          }
      });
      db.each("SELECT * FROM SALE",function(err, row) {
        console.log('REUSLT:', row);

        if(max != 0){
            data[count] = row;
            count++;
        }
        if(max == count){
            res.render('showsalelist', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
        }
      });
    });
});
router.post('/',function(req,res,next){
  var username = '';
  var grade = 0;
  var sale;
    console.log(req.user);
    if(req.user){

     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  sale = {date:req.param('date'),name:req.param('name')};

  if(!salemanager.deleteSale(sale)){
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
        db.each("SELECT COUNT(*) as RESULT FROM SALE",function(err, row) {
            console.log('max:', row.RESULT);
            max = row.RESULT;
            if(max == 0){
                res.render('showreservlist', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
            }
        });
        db.each("SELECT * FROM SALE",function(err, row) {
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
