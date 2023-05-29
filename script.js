var board;
var score = 0;
var rows = 4;
var columns = 4;
window.onload = ()=>{
    Set();
}
const boardElement = document.getElementsByClassName("board")[0];
const overlayDiv = document.getElementsByClassName("overlay")[0];
function Set(){
    board =[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
   
    for(let r = 0;r<rows;r++){
        for(let c = 0;c<columns;c++){
            let tile = document.createElement("div");
           
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            update(tile,num);
            boardElement.append(tile);


        }
    }
    setTwo();
    setTwo();
    score = 0;
}
function hasEmptyTile(){
    for(let r = 0; r<rows;r++){
        for(let c = 0;c<columns;c++){
            if(board[r][c] == 0){
                return true;

            }

        }
        
    }
    return false;
}
function setTwo(){
    if(!hasEmptyTile()){
        
        return;
    }
    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random()*columns);
        if (board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;

        }
    }

}

function resetGame(){
    overlayDiv.style.display = 'none';
    if(isGameOver()){

        // Send scores to back end

        // fetch("url", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         gameScore: score,
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // });
        overlayDiv.style.display = "none";
        Set();
    }
}

function isGameOver() {
    if(hasEmptyTile()) return false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4 - 1; j++) {
        if (board[i][j] === board[i][j + 1]) return false
      }
    }

    for (let i = 0; i < 4 - 1; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === board[i + 1][j]) return false
      }
    }
    return true
}

function update(tile,num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num!=2048){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x2048");
            overlayDiv.style.display = "flex";
            overlayDiv.innerText = "Congratulations, You Won";
        }
    }
}

document.addEventListener("keyup",(e)=>{
    if(isGameOver()){
        overlayDiv.style.display = "flex";
        overlayDiv.innerText = "Game Over";
        return;
    }
    if(e.code =="ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code =="ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();  
        setTwo();  
    }
    document.getElementById("score").innerText = score;
})
function filterzero(row){
    return (row.filter(num=>num!=0));
}


function slide(row){
    row = filterzero(row);
    for(let i = 0;i<row.length-1;i++){
        if(row[i] == row[i+1]){
            row[i]*=2;
            row[i+1] = 0;
            score+=row[i];
        }
    }
    row = filterzero(row);
    while(row.length<columns){
        row.push(0);
    }
    return row;
}
function slideLeft(){
    for(let r = 0;r<rows;r++){
        
            let row = board[r];
            row = slide(row);
            board[r] = row;
            for(let c = 0;c<columns;c++){
                let tile = document.getElementById(r.toString()+"-"+c.toString());
                let num = board[r][c];
                update(tile,num);
            }
         
    }
}
function slideRight(){
    for(let r = 0;r<rows;r++){
        
            let row = board[r];
            row.reverse();
            row = slide(row);
            row.reverse();
            board[r] = row;
            for(let c = 0;c<columns;c++){
                let tile = document.getElementById(r.toString()+"-"+c.toString());
                let num = board[r][c];
                update(tile,num);
            }
        
    }
}
function slideUp(){
    for(let c = 0;c<columns;c++){
        let row =[board[0][c], board[1][c], board[2][c],board[3][c]];
        row = slide(row);
       
        for(let r = 0;r<rows;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            update(tile,num);
        }
        
    }
}
function slideDown(){
    for(let c = 0;c<columns;c++){
        let row =[board[0][c], board[1][c], board[2][c],board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
       
        for(let r = 0;r<rows;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            update(tile,num);
        }
        
    }
}