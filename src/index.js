import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

/*import sockjs from 'socket.io-client'
class home extends React.Component{
    componentDidMount(){
        this.testconnect();
    }
   testconnect=()=>{
   let socket = sockjs("ws://localhost:3900", {
         transports: ['websocket']
        })

// /不间断尝试重连接
    socket.on('reconnect_attempt',()=> { 
      console.log("reconnect")
      socket.transports = ['websocket','polling', 'flashsocket']; 
    });

// 重连接时出错
    socket.on('reconnect_error',(attemptNumber)=> { 
      console.log(attemptNumber)
    });

//连接成功走这个方法
    socket.on('connect',()=>{
      console.log(socket.connected)
    })

//报错时走这个方法
    socket.on('connect_error', (error) => {
      console.log(error)
    });

//连接存活验证 
    socket.on('ping', (error) => {
      console.log('ping_include')
    });
*/
//import * as d3 from "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js";


/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
let date = new Date();
let deviceID = `device:${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}:${date.getHours()}:00:00`;
let BreathRate = d3.randomNormal(15, 2)();
let HeartRate = d3.randomNormal(55, 5)();
let falldetected = Math.round(Math.random()-0.3);
let timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
let msg = {
    "BreathRate": BreathRate,
    "deviceID": deviceID,
    "Falldetected": falldetected,
    "HeartRate": HeartRate,
    "timestamp": timestamp,
};
    
io.emit('Patient Real-time Information', msg);*/

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
