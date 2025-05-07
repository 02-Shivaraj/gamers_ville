var bgs = [
    "bg1.gif",
    "bg2.gif",
    "bg3.gif",
    "bg4.gif",
    "bg5.gif",
    "bg7.gif",
    "bg8.gif",
    "bg9.gif",
    "bg10.gif",
    "bg11.gif",
    "bg12.gif",
    "bg13.gif"
];

const bd = document.querySelector("body");

function bgIter(){
    let i = Math.floor(Math.random() * 11);
    bd.style.backgroundImage = "url(../inventory/"+bgs[i]+")";
}

bgIter();

async function signup(event) {

    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, password })
    });
      
    const data = await response.json();

    console.log(data.message)

    if(data.message == 1)
        window.location.replace("../../options/options.html");
    else
        alert("user not found");

    
}