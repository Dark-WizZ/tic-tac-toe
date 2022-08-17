let Gameboard = function(){
  let Gameboard = [[],[],[]];
  return {Gameboard};
}()

let Player = function(name, mark){
  this.name = name;
  this.mark = mark;
  return {mark, name};
}

let DisplayController = function(){

  //dom reference
  const parts = document.querySelectorAll('.part');

  //bindEvents
  parts.forEach(e => {
    e.addEventListener('click', plotMarks)
  })

  //players
  const playerX = Player('Akram','X');
  const playerO = Player('Lux','O');
  let currentPlayer = playerX;
  let turn = 0;

  const gameBoard = Gameboard;

  //init
  render();

  //methods
  function render(){
    layoutItems();
  }
  function plotMarks(){
    turn++;
    let index = this.classList[1].split('-');
    let row = index[0];
    let col = index[1];
    if (gameBoard.Gameboard[row][col]!==undefined) return;
    gameBoard.Gameboard[row][col] = currentPlayer.mark;
    layoutItems();
    check({row, col});
    if (turn == 9) alert('draw')
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
    checkDiag();
  }
  function checkRow(pos){
    for(let i=0; i<3; i++){
      let board = gameBoard.Gameboard;
      if(board[pos.row][i]!=board[pos.row][incRC(i)]){
        return;
      }
    }
    lose();
  }
  function checkCol(pos){
    for(let i=0; i<3; i++){
      let board = gameBoard.Gameboard;
      if(board[i][pos.col]!=board[incRC(i)][pos.col]){
        return;
      }
    }
    lose();
  }
  function checkDiag(){
    let board = gameBoard.Gameboard;
    if (board[1][1] == undefined) return;
    for(let i=0; i<3; i++){
      if(board[i][i]!=board[incRC(i)][incRC(i)]
      || board[i][i] == undefined){
        if(board[0][2]==undefined || board[2][0]==undefined) return;
        if(board[0][2]!=board[1][1] || board[1][1]!=board[2][0]){
          return;
        }
      }
    }
    lose();
  }
  function incRC(pos){
    pos++;
    return (pos<3)?pos: 0; 
  }
  function lose(){
    alert(currentPlayer.name + ' won!')
  }
}()