var express = require('express');
var passport = require('passport');
var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var room;
router.get('/',function(req,res,next){
  console.log("ddddd");
  var chec = false;
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
      chec = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
  if(req.user.GRADE == 2){
   res.render('updateroom',{title:'Express',username:username,grade:grade});
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
    room = {number:req.param('number'),clean:req.param('clean'),reserved:req.param('reserved'),reservid:req.param('reservid'),reservname:req.param('reservname'),grade:req.param('grade')};
  console.log(room);
  if(!hotelSystem.roomManage("update",room)){
    res.render('updateroom',{title:'Express',username:username,grade:grade});
  }else{
      res.render('index', { title: 'Express',login:chec,username:username,grade:grade});
  }
});
module.exports = router;
