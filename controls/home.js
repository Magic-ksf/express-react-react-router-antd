var mysql = require('mysql')
var crypto = require('crypto')
var db = require('../conf/db.js')

//创建连接池
var pool = mysql.createPool(db.mysql)

module.exports = {
	getAll:function(req,res,next){
		pool.getConnection((err,conn)=>{
			if(err) throw err;
			console.log(req.session.name)
			var name = req.session.name
			if(name){
				res.json({
					code:200,
					getAll:{
						name:name
					}
				})

			}else{
				res.json({
					code:0,
					msg:'还没登录'
				})
			}
			conn.release();//关闭连接
		})
	},
	loginOut:function(req,res,next){
		pool.getConnection((err,conn)=>{
			if(err) throw err;
			req.session.name = ''
			res.json({
				code:200,
				msg:'退出登录'
			})
			conn.release();//关闭连接
		})
	}

}