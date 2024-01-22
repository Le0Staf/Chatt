const messageField = document.getElementById("messages");
const inputField = document.getElementById("text");
const loginField = document.getElementById("login-input");
const server = "http://10.155.16.243:3000"

let hours;
let minutes;

latestArrayLength = 0;

function scrollToBottom() {
    document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
}

function getText() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", `${server}/text`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        if (array.length > latestArrayLength){
            for (i = latestArrayLength; i < array.length; i++) {
                messageField.innerHTML += `<h2>${array[i][1]}</h2>`; 
                messageField.innerHTML += `<p>${array[i][0]}</p>`; 
                messageField.innerHTML += `<h3>${array[i][2]}:${array[i][3]}</h3>`;
                messageField.innerHTML += `<div id="line"></div>`;
            }
            latestArrayLength = array.length
        } 
    }
    xmlhttp.send();
}

function enterUsername() {
    document.getElementById("login").style.display = "none";

    document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
}

function sendMessage() {
    if (text.value != "") {
        hours = new Date().getHours();
        minutes = new Date().getMinutes();
    
        if (hours < 10) {
            hours = "0" + hours;
        }
    
        if (minutes < 10) {
            hours = "0" + hours;
        }
    
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${server}/send` , true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            message: inputField.value,
            user: loginField.value,
            hours: hours,
            minutes: minutes
        }));
    
        inputField.value = "";
    
        setTimeout(scrollToBottom, 500);
    }
}

document.getElementById('text').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (text.value != "") {
            hours = new Date().getHours();
            minutes = new Date().getMinutes();
        
            if (hours < 10) {
                hours = "0" + hours;
            }
        
            if (minutes < 10) {
                hours = "0" + hours;
            }
        
            let xhr = new XMLHttpRequest();
            xhr.open("POST", `${server}/send` , true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                message: inputField.value,
                user: loginField.value,
                hours: hours,
                minutes: minutes
            }));
        
            inputField.value = "";
        
            setTimeout(scrollToBottom, 500);
        }
    }
  });

const interval = setInterval(function() {
    getText();
}, 1000);



