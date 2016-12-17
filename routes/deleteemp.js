var express = require('express');
var passport = require('passport');
var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var emp;
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
  if(req.user.ID == "gomyk"){
   res.render('deleteemployee',{title:'Express',username:username,grade:grade});
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
  emp = {id:req.param('id'),password:req.param('password')};
  console.log(emp);
  if(!hotelSystem.employeeManage("delete",emp)){
    res.render('deleteemployee',{title:'Express',username:username,grade:grade});
  }else{
    res.render('index', { title: 'Express'});
  }
});
module.exports = router;
