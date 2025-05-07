var errors = 0;
var cardList = ["alpha","bat","black_goat","cat","grizzly","kingfisher","ouroboros","raven","undead_cat","wolf_cub"];

var c1 = [];
var c2 = [];
var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var card1;
var card2;

let abort = document.getElementById("abort");
let replay_quit = document.getElementById("replay-exit");
abort.addEventListener("click",quitgame);

window.onload = function(){
    shuffleCards();
    // regulations();
    startGame();
}

function quitgame(){
    back();
}
function regulations(){
    warn.style.visibility = "visible";
    setTimeout(shuffleCards,3000);
}

function shuffleCards(){
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    for(let i=0; i<cardSet.length; i++){
        let j = Math.floor(Math.random()*cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
    c1 = cardSet;
    console.log(c1);
}

function startGame(){
    for(let r=0; r<rows; r++){
        let row = [];
        let c2Row = [];
        for(let c=0; c<columns; c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);
            c2Row.push(null);

            let card = document.createElement("img");
            card.id = r.toString()+"-"+c.toString();
            card.src = cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
        c2.push(c2Row);
    }
    console.log(board);
    setTimeout(hideCards,3500);
}

function hideCards(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns;c++){
            let card = document.getElementById(r.toString()+"-"+c.toString());
            card.src = "deathcard.png";
        }
    }
}

function selectCard(){
    if(this.src.includes("deathcard")){
        if(!card1){
            card1 = this;
            let coords = card1.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1.src = board[r][c]+".png";
        }
        else if(!card2 && this!=card1){
            card2 = this;
            let coords = card2.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2.src = board[r][c]+".png";
            setTimeout(update,1500);
        }
    }
}

function update(){
    if(card1.src != card2.src){
        errors += 1;
        card1.src = "deathcard.png";
        card2.src = "deathcard.png";
        document.getElementById("errors").innerHTML = errors;
    }
    else{
        errors += 1;
        let coords1 = card1.id.split("-");
        let r1 = parseInt(coords1[0]);
        let c1 = parseInt(coords1[1]);

        let coords2 = card2.id.split("-");
        let r2 = parseInt(coords2[0]);
        let c2_col = parseInt(coords2[1]);

        c2[r1][c1] = board[r1][c1];  
        c2[r2][c2_col] = board[r2][c2_col];
        document.getElementById("errors").innerHTML = errors;
    }
    card1 = null;
    card2 = null;
    win();
}

function win(){
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns; c++){
            let a = document.getElementById(r.toString()+"-"+c.toString());
            if(board[r][c] != c2[r][c]){
                // let b = document.getElementById("winner-banner");
                // b.innerHTML="YOU LOSE";
                // b.style.visibility = "visible";            
                return;
            }
        }
    }
    upd();
    let b = document.getElementById("winner-banner");
    b.innerHTML = "YOU WIN!!";
    b.style.visibility = "visible";
    replay_quit.style.visibility="visible";
    next();
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

async function upd() {

    console.log("bp2")

    const response = await fetch('http://localhost:3000/ins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ errors })
    });
      
    const data = await response.json();

    console.log(data.message)
    
}
