var express = require('express');
var router = express.Router();
var mysql = require('./db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  mysql.query('SELECT * from info', function (results) {
    console.log('The solution is: ', results);
    res.render('index', { title: '首页', pdts:results.data});
 });
});

module.exports = router;
