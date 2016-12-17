var express = require('express');
var passport = require('passport');
var standard = require('./rooms/standard');
var deluxe = require('./rooms/deluxe');
var premium = require('./rooms/premium');
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

  if(req.user.GRADE > 2){
   res.render('addroom',{title:'Express',username:username,grade:grade});
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
  room = {number:req.param('number'),clean:0,reserved:0,reservid:req.param('reservid'),reservname:req.param('reservname'),grade:req.param('grade')};
  var rooms;
  if(room.grade == 1){
      rooms = new standard();
  }
  else if(room.grade == 2){
    rooms = new deluxe();
  }
  else{
    rooms = new premium();
  }
    //rooms.setdata()
  console.log(room);
  if(!hotelSystem.roomManage("add",room)){
    res.render('addroom',{title:'Express',username:username,grade:grade});
  }else{
    res.render('index', { title: 'Express'});
  }
});
module.exports = router;
