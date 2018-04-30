var mysql = require('mysql')
var crypto = require('crypto')
var db = require('../conf/db.js')

//创建连接池
var pool = mysql.createPool(db.mysql)

var jsonWrite = function(res,ret){
	if(typeof ret == 'undefined'){
		res.json({
			code:'1',
			msg:'操作失败'
		})
	}else{
		res.json(ret)
	}
}

var mdPassword = function(password){
	var md5 = crypto.createHash('md5');
	var password = password+'tangkang';
	return md5.update(password).digest('hex');
}


module.exports = {
	login:function(req,res,next){ //
		pool.getConnection((err,conn)=>{
			console.log(req.body)
			if(err) throw err;
			var userName = req.body.userName;
			var password = mdPassword(req.body.password);
			let sql = "select * from user where userName='"+userName+"' AND password='"+password+"'  ";
			conn.query(sql,'user',(err,rows)=>{
				if(err) throw err;
				console.log(rows);
				var result={};
				if(rows.length == 1){ //登录失败
					result={
						code:200,
						suc:true,
						msg:'登录成功',
						userInfo:{
							name:rows[0].userName
						}
					}
					jsonWrite(res,result);
				}else{
					result = {
						suc:false,
						msg:'登录失败'
					}
					jsonWrite(res,result);
				}
			})
			const session = req.session;
			session.name = userName;
			conn.release();//关闭连接
		})
	},
	regist:function(req,res,next){
		pool.getConnection((err,conn)=>{
			if(err) throw err;
			console.log(req.body);
			var userName = req.body.userName;
			var password = req.body.password;
			//let {userName,password} = req.body;
			let sql = "INSERT INTO user(id,userName,password) VALUES (0,?,?)";
			//let sqlquery = "select * from user WHERE userName="
			conn.query("select * from user WHERE userName= ?",[userName],function(err,result){
				if(err) throw err;
				if(result.length>0){
					result={
						code:'200',
						msg:'用户已经存在!',
						suc:false
					}
					jsonWrite(res,result)
				}else{
					//console.log(password)
					var  md5 = crypto.createHash('md5');//使用md5加密
					password = password+'tangkang';//加盐
					let upwd = md5.update(password).digest('hex');
					conn.query(sql,[userName,upwd],function(err,result){
						if(err) throw err;
						if(result){
							console.log(result)
							result={
								code:'200',
								msg:'注册成功',
								suc:true
							}
						}

						jsonWrite(res,result)
					})
				}
				
			})
			conn.release();

		})
	}
}
