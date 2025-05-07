let game1 = document.getElementById("game1");
let game2 = document.getElementById("game2");
let game3 = document.getElementById("game3");
let load = document.getElementById("loading");

game1.addEventListener("click",tictactoe);

function tictactoe(){
    load.style.visibility="visible";
    load.style.zIndex=1;
    setTimeout(function(){
        window.location.href = "../TicTacToe/TicTacToe.html";
    },0)
}

game2.addEventListener("click",rockpaper);

function rockpaper(){
    load.style.visibility="visible";
    load.style.zIndex=1;
    setTimeout(function(){
        window.location.href = "../RockPaperScissor/RockPaperScissor.html";
    },0)
}

game3.addEventListener("click",matchcards)
function matchcards(){
    load.style.visibility="visible";
    load.style.zIndex=1;
    setTimeout(function(){
        window.location.href = "../Match_cards/cards.html";
    },0)
}

var ico = document.getElementById("icon");
ico.addEventListener("click",() =>{
    window.location.assign("../profile/index.html");
})

