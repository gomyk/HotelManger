var express = require('express');
var passport = require('passport');
var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var emp;
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
  if(req.user.ID == "gomyk"){
   res.render('updateemployee',{title:'Express',username:username,grade:grade});
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
  emp = {name:req.param('name'),email:req.param('email'),id:req.param('id'),password:req.param('password'),autho:req.param('autho'),salary:req.param('salary')};
  console.log(emp);
  if(!hotelSystem.employeeManage("update",emp)){
    res.render('updateemployee',{title:'Express',username:username,grade:grade});
  }else{
      res.render('index', { title: 'Express',login:chec,username:username,grade:grade});
  }
});
module.exports = router;
