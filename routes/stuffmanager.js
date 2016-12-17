//var reservationSys = require('./reservationsystem')
//var reservationSystem = new reservationSys();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var login = true;
var check ;
var insertDB = db.prepare("INSERT INTO STUFF VALUES (?,?,?,?,?)");
var updateDB = db.prepare("UPDATE STUFF SET NAME = ?,COMPANY = ?,COUNT = ?,PRICE = ? WHERE CODE = ?");
var deleteDB = db.prepare("DELETE FROM STUFF WHERE CODE = ?");
function StuffManager(){
  this.who = '물건 매니져';
}

StuffManager.prototype.addStuff = function addStuff(stuff){
    check = true;
      console.log(stuff);
      db.serialize(function () {
        db.each("SELECT COUNT(*) as RESULT FROM STUFF WHERE CODE = ?",stuff.code,function(err, row) {
          console.log('row:',row.RESULT);
          if(row.RESULT != 0){
          check = false;
          }
          if(check){
            insertDB.run(stuff.code,stuff.name,stuff.company,stuff.count,stuff.price);
              console.log('DB:',"성공");
          //  updateDB.run();
            return true;
          }
          else{
            console.log('DB:',"실패");
            return false;
          }
        });
      });
}

StuffManager.prototype.deleteStuff = function deleteStuff(stuff){
  check = true;
    console.log(stuff);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM STUFF WHERE CODE = ?",stuff.code,function(err, row) {
        console.log('row:',row.RESULT);
        if(row.RESULT != 0){
        check = false;
        }
        if(check){
        //  insertDB.run(emp.id,emp.password,emp.name,emp.email,emp.autho,emp.salary);
            console.log('DBdelete:',"실패");

        }
        else{
          //updateDB.run(emp.set,emp.data,emp.id);
            deleteDB.run(stuff.code);
        //  deleteDB.run(emp.name);
          console.log('DBdelete:',"성공");
        }
      });
    });
}
StuffManager.prototype.updateStuff = function updateStuff(stuff){
  check = true;
    console.log(stuff);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM STUFF WHERE CODE = ?",stuff.code,function(err, row) {
        console.log('row:',row.RESULT);
        if(row.RESULT != 0){
        check = false;
        }
        if(check){
        //  insertDB.run(emp.id,emp.password,emp.name,emp.email,emp.autho,emp.salary);
            console.log('DBupdate:',"실패");

        }
        else{
          //updateDB.run(emp.set,emp.data,emp.id);
          updateDB.run(stuff.name,stuff.company,stuff.count,stuff.price,stuff.code);
        //  deleteDB.run(emp.name);
          console.log('DBupdate:',"성공");
        }
      });
    });
}
module.exports = StuffManager;
