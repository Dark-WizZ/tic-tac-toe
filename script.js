let Gameboard = function(){
  let Gameboard = [[],[],[]];
  return {Gameboard};
}()

let Player = function(mark){
  this.mark = mark;
  return {mark};
}

let DisplayController = function(){

  //dom reference
  const parts = document.querySelectorAll('.part');

  //bindEvents
  parts.forEach(e => {
    e.addEventListener('click', plotMarks)
  })

  //players
  const playerX = Player('X');
  const playerO = Player('O');
  let currentPlayer = playerX;

  const gameBoard = Gameboard;

  //init
  render();

  //methods
  function render(){
    layoutItems();
  }
  function plotMarks(){
    let index = this.classList[1].split('-');
    let row = index[0];
    let col = index[1];
    if (gameBoard.Gameboard[row][col]!==undefined) return;
    gameBoard.Gameboard[row][col] = currentPlayer.mark;
    layoutItems();
    check({row, col});
    togglePlayer();
  }
  function layoutItems(){
    let i = 0;
    for(let row=0; row<3; row++){
      for(let col=0; col<3; col++){
        parts[i].textContent = gameBoard.Gameboard[row][col];
        i++;
      }
    }
  }
  function togglePlayer(){
    currentPlayer = (currentPlayer==playerX)? playerO : playerX;
  }
  function check(pos){
    checkRow(pos);
    checkCol(pos);
  }
  function checkRow(pos){
    for(let i=0; i<3; i++){
      let col = i%2;
      let board = gameBoard.Gameboard;
      if(board[pos.row][col]!=board[pos.row][++col]){
        return;
      }
    }
    console.log('lose');
  }
  function checkCol(pos){
    for(let i=0; i<3; i++){
      let row = i%2;
      let board = gameBoard.Gameboard;
      if(board[row][pos.col]!=board[++row][pos.col]){
        return;
      }
    }
    console.log('lose');
  }
}()