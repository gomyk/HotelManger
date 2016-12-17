var express = require('express');
var passport = require('passport');

var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var room;
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
  if(req.user.GRADE == 2){
   res.render('deleteroom',{title:'Express',username:username,grade:grade});
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
  room = {number:req.param('number')};
  console.log(room);
  if(!hotelSystem.roomManage("delete",room)){
    res.render('deleteroom',{title:'Express',username:username,grade:grade});
  }else{
    res.render('index', { title: 'Express'});
  }
});
module.exports = router;
