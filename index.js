// music
const music=new Audio()
const background=new Audio()
background.src="music/background.wav"
music.src="music/click.mp3"

// window.addEventListener("load",()=>{
//     background.play();
// })

var x=[];
for(var i=0;i<9;i++){
    x[i]=document.getElementById(`${i}`);
    x[i].addEventListener("click",()=>{
        music.play()   
    })
}
// board
var originBoard;
const humanPlayer='O';
const AIplayer="X";
const winCombi=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [1,4,7]   
]
function restart(){
    startGame();
    location.reload()
}

const cells=document.querySelectorAll(".cell");
startGame();

function startGame(){
    document.querySelector(".endgame").style.display="none";
    originBoard=Array.from(Array(9).keys());
    for(var i =0;i<cells.length;i++){
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click",turnClick);
    }
    background.pause();
    
}

function turnClick(square){
    if(typeof originBoard[square.target.id=='number']){
        turn(square.target.id,humanPlayer)
        if(!checkTie()){
           turn(bestSpot(),AIplayer)
          }
    }
    
}
function turn(sqId,player){
    originBoard[sqId]=player;
    document.getElementById(sqId).innerText=player
    let gameWon=checkWin(originBoard,player)
    if(gameWon){
        gameOver(gameWon)
    }
    
}
function checkWin(board,player){
    let plays=board.reduce((a,e,i)=>
        (e===player)?a.concat(i):a,[]);
        
        
    let gameWon=null;
    for (let [index, win] of winCombi.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombi[gameWon.index]) {
        
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "#3CC7FC" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick);
    } 
    background.play()
    delcareWinner(gameWon.player==humanPlayer?"You win":"You lose")
}

function delcareWinner(who){
    document.querySelector(".endgame").style.display="block"
    document.querySelector(".endgame .text").innerText=who;
}

function emptySquare() {
    console.log(originBoard.filter(s => typeof s == 'number'));
	return originBoard.filter(s => typeof s == 'number');
}
 

function bestSpot()
{
    // random 
    return emptySquare()[Math.floor(Math.random() * emptySquare().length)]
}
function checkTie()
{
    if(emptySquare().length==0){
        for(var i =0;i<cells;i++)
        {
            cells[i].style.backgroundColor="green"
            cells[i].removeEventListener("click",turnClick)
        }
        delcareWinner("Tie Game!")
        return true
    }
}