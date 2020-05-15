const io = require('socket.io-client');

var socket =  io.connect('http://localhost:9092');

socket.on('connect', function(){
    console.log('connected');
})

socket.on('Patient Real-time Information', function(data) {
    console.log(data.deviceID, JSON.stringify(data));
});
/*function getMsg(){
    socket.on('Patient Real-time Information', function(data) {
        console.log(data.deviceID , JSON.stringify(data));
    });
}

getMsg();*/


socket.on('disconnect', function() {
    console.log(' the user is disconnected');
});

/*function epochExample1() {
    var d = new Date(); 
    promt('Cut/Paste into the converter to Test',(d.getTime()-d.getMilliseconds())/1000);
 };*/
//export default getMsg;