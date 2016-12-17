function Qna(){
  this.name = '';
  this.date = '';
  this.content = '';
}


Qna.prototype.printinfo = function printinfo(){
  console.log("content:",this.content);
  console.log("name:",this.name);
  console.log("date:",this.date);
}
Qna.prototype.setData = function(data) {
  this.content = data.content;
  this.name = data.name;
  this.date = data.date;
};
Qna.prototype.getData = function() {
  var data = {content:this.content,name:this.name,date:this.date};
  return data;
};
module.exports = Qna;
