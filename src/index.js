//console.log(2)
 import React from 'react'
 import ReactDOM from 'react-dom'

 import App from './App.jsx'

function run(){
	ReactDOM.render((<App />),document.getElementById('#app'))
}

run()

 

 // 只在开发模式下配置模块热替换
if (process.env.NODE_ENV !== 'production') {
  module.hot.accept('./app', run);
}