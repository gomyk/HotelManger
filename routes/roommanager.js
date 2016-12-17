//var reservationSys = require('./reservationsystem')
//var reservationSystem = new reservationSys();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var login = true;
var check ;
var insertDB = db.prepare("INSERT INTO ROOMS VALUES (?,?,?,?,?,?)");
var updateDB = db.prepare("UPDATE ROOMS SET CLEAN = ?,RESERVED = ?,RESERVID = ?,RESERVNAME = ?,GRADE = ? WHERE ROOMNUMBER = ?");
var deleteDB = db.prepare("DELETE FROM ROOMS WHERE ROOMNUMBER = ?");
function RoomManager(){
  this.who = '방매니저';
}

RoomManager.prototype.addRoom = function addRoom(room){
    check = true;
      console.log(room);
      db.serialize(function () {
        db.each("SELECT COUNT(*) as RESULT FROM ROOMS WHERE ROOMNUMBER = ?",room.number,function(err, row) {
          console.log('row:',row.RESULT);
          if(row.RESULT != 0){
          check = false;
          }
          if(check){
            insertDB.run(room.number,room.clean,room.reserved,room.reservid,room.reservname,room.grade);
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

RoomManager.prototype.deleteRoom = function deleteRoom(room){
  check = true;
    console.log(room);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM ROOMS WHERE ROOMNUMBER = ?",room.number,function(err, row) {
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
            deleteDB.run(room.number);
        //  deleteDB.run(emp.name);
          console.log('DBdelete:',"성공");
        }
      });
    });
}
RoomManager.prototype.updateRoom = function updateRoom(room){
  check = true;
    console.log(room);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM ROOMS WHERE ROOMNUMBER = ?",room.number,function(err, row) {
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
          updateDB.run(room.clean,room.reserved,room.reservid,room.reservname,room.grade,room.number);
        //  deleteDB.run(emp.name);
          console.log('DBupdate:',"성공");
        }
      });
    });
}
module.exports = RoomManager;
