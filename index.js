const express=require('express');
const { socket } = require('node:dgram');
const {createServer}=require('node:http');
const{join}=require('node:path');
const{Server}=require('socket.io');
const app=express();
const server=createServer(app);
const io=new Server(server);

app.get('/',(req,res) =>{
    res.sendFile(join(__dirname,'index.html'));
});

io.emit('hello','world');

io.on('connection',(socket)=>{
    socket.broadcast.emit('hi');

});

io.on('connection',(socket)=>{
    socket.on('chat message',(msg) =>{
        io.emit('chat message',msg)
    })
});



server.listen(3900,()=>{
    console.log('server running at http:local//host:3900');
})
