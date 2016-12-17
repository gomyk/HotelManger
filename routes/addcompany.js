var express = require('express');
var passport = require('passport');
var router = express.Router();
var check = false;
var username = '';
var grade = 0;
var company;
router.get('/',function(req,res,next){
  console.log("ddddd");

  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
      check = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);

  if(grade >1 ){
   res.render('addcompany',{title:'Express',username:username,grade:grade});
  }
  else{
    res.render('index', { title: 'Express',login:check,username:username,grade:grade});
  }
});

router.post('/',function(req,res,next){
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){
      check = true;
     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
  company = {name:req.param('name'),tel:req.param('tel'),fee:req.param('fee')};
  console.log(company);
  if(!hotelSystem.companyManage("add",company)){
    res.render('addcompany',{title:'Express',username:username,grade:grade});
  }else{
      res.render('index', { title: 'Express',login:check,username:username,grade:grade});
  }
});
module.exports = router;
