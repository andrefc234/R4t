var ctx = document.getElementById("key")
var form = document.getElementById("send")
var killR = document.getElementById("kill")
const socket = io();



socket.on("keyRes", (info) => {
    stdout(info)
})
function stdout(data){
    const div = document.createElement('div')
    
    div.classList.add('text-white')
    div.classList.add('m-5')
    div.classList.add('p-3')
    
    data.forEach(element => {
        var p = document.createElement('p')
        p.classList.add('text-white')
        p.classList.add('mt-3')
        p.classList.add('ml-3')
        p.classList.add('pl-5')
        p.classList.add('h5')
        p.textContent = element
        div.appendChild(p)
    });
    
    ctx.appendChild(div)

}

form.addEventListener('submit', e=> {
    e.preventDefault()
    let res = e.target.elements.command.value;
    res = res.trim()
    socket.emit("ransomReq",res)
    e.target.elements.command.value = '';
    e.target.elements.command.focus();

})


killR.addEventListener('submit', e=> {
    e.preventDefautl()
    let res = e.target.elements.command.value;
    res = res.trim()
    socket.emit("killRansom",res)
    e.target.elements.command.value = '';
    e.target.elements.command.focus();

})