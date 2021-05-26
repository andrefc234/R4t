var ctx = document.getElementById("canvas")
var btn = document.getElementById("btn")
var closebtn = document.getElementById("close")
const socket = io();


socket.on("imagerequest", (info) => {
    console.log(info)
    if(info.image){
        
        let source= 'data:image/jpeg;base64,'+ info.buffer;
        ctx.src= source
    }
})
closebtn.addEventListener('click', e => {
    e.preventDefault()
    ctx.src=""
})
socket.on("connection", data => console.log(data))
btn.addEventListener("click",e => {
    
    socket.emit("request","ye")
})
