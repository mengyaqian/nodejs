var mysql      = require('mysql');
var db = {};
db.query= function sqlback(sqllan,fn) {//查询的sql,回调函数
  //配置mysql
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'car',
    port:3306
  });

  //判断数据库是否连接成功
  connection.connect(function(err){
     if(err){
       console.log(err);
       return;
     }
  });
  var sql = sqllan;
  if(!sql) return;

  //向数据库发送sql语句
  //回调函数中有三个参数，第一参数是错误对象，如果操作失败，则会停止并打印错误信息，第二参数是具体的返回的结果，正常情况下是一个数组，里面包含很多json,第三个参数也是一个数组，里面包含着最每个数据的解释，比如当前数据属于哪个库，那张表等等
  connection.query(sql,function(err,rows,fields) {
      var res = {};
      if(err){
         console.log(err);
         res.err = err;
      }
      res.data = rows;
      res.stateCode = 200;
      res.msg = '操作成功！';
      fn(res);
  });

  //当数据库操作结束以后关闭连接
  connection.end(function(err){
     if(err){
       return;
     }else{
       console.log('链接关闭');
     }
  })
}

 
module.exports = db;

