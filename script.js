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
  const playBtn = document.querySelector('.play');
  const gameLayout = document.querySelector('.game-layout');
  const welcomeLayout = document.querySelector('.welcome-layout');
  const playerInfo = document.querySelector('.player-info');

  //bindEvents
  parts.forEach(e => {
    e.addEventListener('click', plotMarks)
  })
  playBtn.addEventListener('click', playBtnClick);

  //players
  let playerX = Player('Player1','X');
  let playerO = Player('Player2','O');
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
    console.log(currentPlayer)
    console.log(playerX);
    currentPlayer = (currentPlayer==playerX)? playerO : playerX;
    playerInfo.textContent = `${currentPlayer.name}'s turn`;
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
  function playBtnClick(){
    const player1IP = document.querySelector('#player1-name');
    const player2IP = document.querySelector('#player2-name');
    playerX = Player(player1IP.value, 'X');
    playerO = Player(player2IP.value, 'O');
    currentPlayer = playerX;
    welcomeLayout.style.display = 'none';
    gameLayout.style.display = 'grid';
    playerInfo.textContent = `${playerX.name}'s turn`;
  }
}()