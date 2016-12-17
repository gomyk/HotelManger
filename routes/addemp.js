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
   res.render('addemployee',{title:'Express',username:username,grade:grade});
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
  emp = {name:req.param('name'),email:req.param('email'),id:req.param('id'),password:req.param('password'),autho:req.param('autho'),salary:req.param('salary')};
  console.log(emp);
  if(!hotelSystem.employeeManage("add",emp)){
    res.render('addemployee',{title:'Express',username:username,grade:grade});
  }else{
    res.render('index', { title: 'Express'});
  }
});
module.exports = router;
