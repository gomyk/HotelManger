var express = require('express');
var router = express.Router();
var check;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var max ;


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
      db.each("SELECT COUNT(*) as RESULT FROM STUFF",function(err, row) {
          console.log('max:', row.RESULT);
          max = row.RESULT;
          if(max ==0){
              res.render('showroomlist', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
          }
      });
      db.each("SELECT * FROM STUFF",function(err, row) {
        console.log('REUSLT:', row);

        if(max!=0){
          data[count] = row;
            count++;
        }
        if(max == count){
          res.render('showstuff', { title: 'Express',count:count,data:JSON.stringify(data),username:username,grade:grade});
        }
      });
    });

});
module.exports = router;
