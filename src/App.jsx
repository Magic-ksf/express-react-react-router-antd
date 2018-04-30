import React,{ Component } from 'react';

import {
	BrowserRouter,
	Route,
	Link,
	Switch,
	Redirect
}  from 'react-router-dom'

import './common/common.css'
import Login from 'page/login/index.jsx'
import Regist from 'page/regist/index.jsx'

import Home from 'page/home/index.jsx'
import ErrorPage from 'page/errorPage/index.jsx'

import 'antd/dist/antd.less'


class App extends React.Component {
	Constructor(props){
		Super(props)
	}
	render(){
		return (	
			<BrowserRouter>
				<Switch>
					<Route path="/login" component = {Login}></Route>
					<Route path="/regist" component = {Regist}></Route>
					<Route exact path="/" component = {Home}></Route>
					<Route component={ErrorPage}></Route>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App