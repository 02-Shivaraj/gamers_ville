var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;
var Status;
const game = 'rpc';
var choices = ["rock","paper","scissors"];

window.onload = function(){
    for(let i=0; i<3; i++){
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".gif";
        choice.addEventListener("click",selectChoice);
        document.getElementById("choices").append(choice);
    }
}

function selectChoice(){
    you = this.id;
    document.getElementById("your-choice").src = you+".gif";

    opponent = choices[Math.floor(Math.random()*3)];
    document.getElementById("opponent-choice").src = opponent+".gif";

    if(you == opponent){
        yourScore += 1;
        opponentScore += 1;
    }
    else{
        if(you == "rock"){
            if(opponent == "scissors"){
                yourScore += 1;
            }
            else{
                opponent += 1;
            }
        }
        else if(you == "paper"){
            if(opponent == "rock"){
                yourScore += 1;
            }
            else{
                opponentScore += 1;
            }
        }
        else if(you == "scissors"){
            if(opponent == "paper"){
                yourScore += 1;
            }
            else{
                opponentScore += 1;
            }
        }
    }
    document.getElementById("your-score").innerHTML = yourScore;
    document.getElementById("opponent-score").innerHTML = opponentScore;
    if(opponentScore==10 || yourScore==10){
        let a = document.getElementById("choices");
        a.style.visibility = "hidden";

        let replay_quit = document.getElementById("replay-exit");
        let replay = document.getElementById("replay");
        let quit = document.getElementById("quit");


        if(opponentScore == yourScore){
            let score = document.getElementById("game");
            score.style.visibility = "hidden";
            let banner = document.getElementById("winner-banner");
            banner.innerText = "Draw !!"
            banner.style.visibility = "visible";
            replay_quit.style.visibility = "visible";
            Status = 0;
            upd();
            next();
            return;
        }

        let score = document.getElementById("game");
        score.style.visibility = "hidden";

        if(opponentScore==10){
            let banner = document.getElementById("winner-banner");
            banner.innerText = "You lose"
            banner.style.visibility = "visible";
            banner.style.visibility = "visible";
            replay_quit.style.visibility = "visible";
            Status = -1;
            upd();
            next();
            return;
        }
        else{
            let behind = document.getElementById("banner-behind");
            behind.style.visibility = "visible";
            let banner = document.getElementById("winner-banner");
            banner.innerHTML = "You Win!!!";
            banner.style.visibility = "visible";
            banner.style.visibility = "visible";
            replay_quit.style.visibility = "visible";
            Status = 1;
            upd();
            next();
            return;
        }
    }
    function next(){
        let replay = document.getElementById("replay");
        let quit = document.getElementById("exit");

        replay.addEventListener("click",playagain);
        quit.addEventListener("click",back);
    }
    function playagain(){
        window.location.reload();
    }
    function back(){
        window.location.href = "../options/options.html";
    }
}

async function upd() {

    console.log("bp1")

    const response = await fetch('http://localhost:3000/rps', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Status })
    });
      
    const data = await response.json();

    console.log(data.message)
    
}
