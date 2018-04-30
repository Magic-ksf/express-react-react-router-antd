import React,{Component} from 'react';
import axios from 'axios'
import {message,Button} from 'antd';
class Home extends React.Component{

	constructor(props){
		super(props)
		this.state={
			name:''
		}
	}

	componentWillMount(){
		axios({
			method: 'post',
			url: '/api/getAll'
		}).then(res=>{
			var res = res.data;
			if(res.code == 200){
				this.setState({
					name:res.getAll.name
				})
			}else{
				this.props.history.push("/login");
			}
		})
	}

	loginOut=()=>{
		axios({
			method: 'post',
			url: '/api/loginOut'
		}).then(res=>{
			if(res.data.code == 200){
				message.success('退出成功');
				setTimeout(()=>{
					this.props.history.push("/login");
				},3000)

			}
		})

	}


	render(){
		return(
			<div>
				<h1>欢迎{this.state.name}</h1>
				<div onClick = {this.loginOut}>退出登录</div>
			</div>
		)
	}
}


export default Home