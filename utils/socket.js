const newapp = require('express')();
const newserver = require('http').createServer(newapp);
const io = require('socket.io')(newserver);
global.io = io
function createNewSocket() {
    io.on('connection', function (socket) {
        console.warn('connected');
        io.emit('message', {
            from: '1',
            to: '',
            type: 'msg',
            content: '欢迎登录',
            time: new Date()
        })
        socket.on("disconnect", function () {
            console.warn("disconnect");
        });
  
        socket.on("message", function (obj) {
            console.log('message is' + obj);
            // TODO 写入数据库
            io.emit('message', obj)
        });
    });
    //开启端口监听socket
    newserver.listen('8090');
}
module.exports = createNewSocket