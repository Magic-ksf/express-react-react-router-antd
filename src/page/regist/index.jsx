'use strict';
import React,{Component} from 'react';
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox,message} from 'antd'
import { withRouter } from 'react-router'


import './index.less'

const FormItem = Form.Item;
const createForm = Form.create;

class Regist extends React.Component{ //注册
	constructor(props){
		super(props)
	}

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	console.log(values)
	        axios({
			  method: 'post',
			  url: '/api/regist',
			  data:values,
			}).then((res)=>{
				console.log(res)
				var res = res.data;
				if(res.suc&&res.code=="200"){
					message.success('注册成功');
					setTimeout(()=>{
						this.props.history.push("/login");
					},3000)
				}else{
					message.error(res.msg)
				}
			})
	      }
	    });
	}

	render(){

		const { getFieldDecorator } = this.props.form

		return(
			<div className="regist">
				<div className="main">
					<div className="formMain">
						<Form onSubmit={this.handleSubmit} className="login-form" style={{width:'80%',margin:'20px auto'}}>
					        <FormItem>
					          {getFieldDecorator('userName', {
					            rules: [{ required: true, message: 'Please input your username!' }],
					          })(
					            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					          )}
					        </FormItem>
					        <FormItem>
					          {getFieldDecorator('password', {
					            rules: [{ required: true, message: 'Please input your Password!' }],
					          })(
					            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					          )}
					        </FormItem>
					        <FormItem>
					          <Button type="primary" htmlType="submit" className="login-form-button login">
					            register now
					          </Button>
					        </FormItem>
					      </Form>
					</div>
				</div>
			</div>
		)
	}
}

export default Form.create()(Regist)