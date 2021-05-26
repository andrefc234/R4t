

var add = document.getElementById("stdout")
var form = document.getElementById("send")
var clear = document.getElementById("clear")
const socket = io();


socket.on("stdoutrequest", (info) => {
    stdout(info)
})




form.addEventListener('submit', e =>{
    e.preventDefault();
    let res = e.target.elements.command.value;
    res = res.trim()
    if(res === 'clear'){
        add.innerHTML=""
    }
    else{
        
        socket.emit("terminal", res)
    }
    
    e.target.elements.command.value = '';
    e.target.elements.command.focus();
    
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
    
    add.appendChild(div)

}