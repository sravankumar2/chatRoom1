const socket = io();
const msgText=document.querySelector('#msg')
const btnSEnd=document.querySelector('.btn')
const chatBox=document.querySelector('.chat-content')
const displayMsg=document.querySelector('.message')
let name;
do{
    name=prompt("What is your Name")
}while(!name)

const uName=document.querySelector('#your-name')
uName.textContent=name
msgText.focus()

btnSEnd.addEventListener('click', (e)=>{
    e.preventDefault();
    sendMsg(msgText.value)
    msgText.value=""
    msgText.focus()
})

const sendMsg= message =>{
    let msg={
        user:name,

        message:message.trim(),
    }

    display(msg, "your-message")
    socket.emit("sendMessage", msg)
    socket.emit("sendToAll", msg)
  
}
socket.on("sendToAll", msg=>{
    display(msg, "other-message")
   
})

const display = (msg, type)=>{
    const msgDiv= document.createElement('div')
    let className=type
    msgDiv.classList.add(className, "message-row")
    let times= new Date().toLocaleTimeString()
    let innerText =`
        <div class="message-title">
            <span>${msg.user}</span>
        </div>
        <div class="message-text">${msg.message}
        </div>
        <div class="message-time">${times}
        </div>

    `;
    msgDiv.innerHTML=innerText;
    displayMsg.appendChild(msgDiv)
}