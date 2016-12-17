var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var insertDB = db.prepare("INSERT INTO RESERVATION VALUES (?,?,?,?,?)");
var deleteDB = db.prepare("DELETE FROM RESERVATION WHERE ROOMNUMBER = ? AND DATE = ?");
var salemanagers = require('./salemanager');
var salemanager = new salemanagers;
var check;
var found;
var max;
function ReservationSystem(){
  this.walked = false;
}

ReservationSystem.prototype.showReservation = function showReservation(){

  this.walked = true;
}

ReservationSystem.prototype.reserveRoom = function reserveRoom(reserv){
  console.log('방 예약하기');
    console.log(reserv);
    check = true;
    found = false;
    var number;
    var count;
    var money;
  db.serialize(function () {
    db.each("SELECT * FROM ROOMS WHERE RESERVNAME = ?",reserv.number,function(err, row) {
      console.log('row:',row);
      number = row.ROOMNUMBER;
      money = row.RESERVID;
    });

    db.each("SELECT COUNT(*) as RESULT FROM RESERVATION WHERE ROOMNUMBER = ? AND DATE = ?",number,reserv.date,function(err, row) {
      console.log('row:',row.RESULT);
      check = true;
      if(row.RESULT != 0){
        check = false;
      }
      if(check){
        insertDB.run(reserv.id,reserv.extra,reserv.name,number,reserv.date);//ID 가 extra
        var sale = {name:'room pay',count:money,plus:'plus',date:reserv.date};
        salemanager.addSale(sale);
      //  updateDB.run();

        console.log('DB:',"성공");
      }
      else{
        console.log('DB:',"실패");
      }
    });
  });
  //  db.run("CREATE TABLE if not exists RESERVATION (CODE TEXT NOT NULL,ID TEXT,NAME TEXT,ROOMNUMBER TEXT,DATE TEXT)");
}
ReservationSystem.prototype.deleteReservation = function deleteReservation(reserv){
  check = true;
    console.log(reserv);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM RESERVATION WHERE ROOMNUMBER = ? AND DATE = ?",reserv.number,reserv.date,function(err, row) {
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
            deleteDB.run(reserv.number,reserv.date);
        //  deleteDB.run(emp.name);
          console.log('DBdelete:',"성공");
        }
      });
    });
}

module.exports = ReservationSystem;
