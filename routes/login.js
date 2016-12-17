var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  var username = '';
  var grade = 0;
    console.log(req.user);
    if(req.user){

     username = req.user.NAME;
     grade = req.user.GRADE;
    }
    console.log(req.user);
    res.render('login', { title: 'Express',username:username,grade:grade});
    //console.log("ㅇㅇㅇㅇㅇㅇㅇ");
  //  hotelSystem.serviceManage();
});

module.exports = router;
