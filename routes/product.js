var express = require('express');
var router = express.Router();
var mysql = require('./db.js')
/* 路由*/
router.get('/', function(req, res, next) {
  res.render('product', {});
});
/*汽车列表 */
router.post('/carList',function(req, res, next){
  mysql.query('SELECT * from info', function (results) {
      res.json(results);
  })
})

/*添加*/
router.post('/addCar', function(req, res, next) {
    var car=req.body;  //从请求正文中获得json对象
	console.log('--------------'+car);
	var times = getDefaultTime();
	var pdata = '"'+car.name+'","'+car.price+'","'+times+'","'+car.remark+'","'+car.num+'"';
	var sql = 'INSERT INTO info(name,price,updateTime,remark,num) VALUES ('+pdata+')';
	if(car.id){
		sql = 'update info set name= "'+car.name+'", price='+car.price+',updateTime="'+times+'",remark="'+car.remark+'",num='+car.num+' where id ='+car.id ;   
	}
	mysql.query(sql, function (results) {
		results.data = null;
		res.json(results);
	})
});
/*查询一条数据*/
router.post('/searchCar', function(req, res, next) {
	var _id = req.body.id;
	mysql.query('SELECT * from info where id = '+_id, function (results) {
		  res.json(results);
	})
})
/*删除一条数据*/
router.post('/deleteCar', function(req, res, next) {
	var _id = req.body.id;
	mysql.query('delete from info where id = '+_id, function (results) {
		results.data = null;
		results.msg = '删除成功';
		res.json(results);
	})
})

 //获取默认时间
    function getDefaultTime(time){
        var t = time ? new Date(time) : new Date();
        var Mon = t.getMonth()+1;
        var Day = t.getDate();
        var Hours = t.getHours();
        var Minutes =t.getMinutes();
        var Seconds = t.getSeconds();
        if(t.getMonth()+1<10){
        	Mon = '0'+Mon;
        }
        if(t.getDate()<10){
        	Day = '0'+Day;
        }
        if(t.getHours()<10){
            Hours = '0'+Hours;
        }
        if(t.getMinutes()<10){
            Minutes = '0'+Minutes;
        }
        if(t.getSeconds()<10){
            Seconds = '0'+Seconds;
        }
        return t.getFullYear()+'-'+ Mon+ '-' + Day+ ' '+ Hours+':'+Minutes+':'+ Seconds;
    }

module.exports = router;