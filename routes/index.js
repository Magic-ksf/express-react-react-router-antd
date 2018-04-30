var express = require('express');
var router = express.Router();
//关联主程序

var user = require('../controls/user.js'); //登录接口

var home = require('../controls/home.js'); //登录接口

/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
  res.render('index', { title: '小k博客 (htmlk.cn)'});
});

router.post('/api/login',user.login); //登录

router.post('/api/regist',user.regist); //注册

router.post('/api/getAll',home.getAll); //获取全部信息
router.post('/api/loginOut',home.loginOut); //登出
module.exports = router;
