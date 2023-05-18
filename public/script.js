const socket = io();
var username="";

//scrollbar at bottom 
var container = document.querySelector(".message-container")
container.scrollTop = container.scrollHeight;

container.addEventListener("scroll", function() {
  if (container.scrollTop < container.scrollHeight - container.offsetHeight) {
    container.scrollTop = container.scrollHeight;
  }
});

document.getElementById("btn").addEventListener("click",()=>{
    event.preventDefault();
    username = document.getElementById("username").value;
    if(username.trim()!=""){
        document.querySelector(".form-container").style.display="none";
        document.querySelector(".chat-container").style.display="flex";
        document.getElementById("user-header").innerText=`Chatroom of  ${username}`;
    }
})

document.getElementById("send-btn").addEventListener("click",()=>{
    event.preventDefault();
    const data = {
      username: username, 
      message: document.getElementById("send-message-input").value,
    };
    socket.emit("message",data);
    addMessage(data, true);
});

socket.on("message", (data) => {
    if (data.username !== username) {
      addMessage(data, false);
    }
  });

function addMessage(data,check){
    var msgDiv = document.createElement("div");
    
    if(check){
        msgDiv.innerText=`${data.message}`;
        msgDiv.setAttribute("class","message sent");
    }
    else{
        msgDiv.innerText=`${data.username}  :  ${data.message}`;
        msgDiv.setAttribute("class","message receive");    
    }
    document.querySelector(".message-container").appendChild(msgDiv);
    document.getElementById("send-message-input").value="";
}



