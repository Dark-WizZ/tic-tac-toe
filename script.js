let Gameboard = function(){
  let Gameboard = [[],[],[]];
  return {Gameboard};
}()

let Player = function(name, mark){
  this.name = name;
  this.mark = mark;
  this.isAI = false;
  return {mark, name, isAI};
}

let DisplayController = function(){

  //dom reference
  const parts = document.querySelectorAll('.part');
  const playBtn = document.querySelector('.play');
  const gameLayout = document.querySelector('.game-layout');
  const playerLayout = document.querySelector('.player-layout');
  const playerInfo = document.querySelector('.player-info');
  const greetLayout = document.querySelector('.greet-layout');
  const welcomeLayout = document.querySelector('.welcome-layout');
  const withFriendBtn = document.querySelector('.with-friend');
  const withAIBtn = document.querySelector('.with-ai');
  const player2 = document.querySelector('.player.two');
  const ai = document.querySelector('.ai');

  //players
  let playerX = Player('Player1','X');
  let playerO = Player('Player2','O');
  let currentPlayer = playerX;
  let turn = 0;

  const gameboard = Gameboard;

  //init
  render();

  //bindEvents
  parts.forEach(e => {
    e.addEventListener('click', plotMarks)
    e.addEventListener('mouseover', partMouseOver);
  })
  playBtn.addEventListener('click', playBtnClick);
  withFriendBtn.addEventListener('click', withFriendBtnClick);
  withAIBtn.addEventListener('click', withAIBtnClick);

  //methods
  function render(){
    turn = 0;
    layoutItems();
  }
  function plotMarks(){
    turn++;
    this.classList.remove('hover');
    let index = this.classList[1].split('-');
    let row = index[0];
    let col = index[1];
    if (gameboard.Gameboard[row][col]!==undefined) return;
    gameboard.Gameboard[row][col] = currentPlayer.mark;
    layoutItems();
    check({row, col});
    if (turn == 9) alert('draw')
    togglePlayer();
  }
  function layoutItems(){
    let i = 0;
    for(let row=0; row<3; row++){
      for(let col=0; col<3; col++){
        parts[i].textContent = gameboard.Gameboard[row][col];
        i++;
      }
    }
  }
  function togglePlayer(){
    currentPlayer = (currentPlayer==playerX)? playerO : playerX;
    playerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (currentPlayer.isAI) playAI();
  }
  function check(pos){
    if (checkRow(pos) || checkCol(pos) || checkDiag()){
      finish()
    }
  }
  function checkRow(pos){
    for(let i=0; i<3; i++){
      let board = gameboard.Gameboard;
      if(board[pos.row][i]!=board[pos.row][incRC(i)]){
        return false;
      }
    }
    return true;
  }
  function checkCol(pos){
    for(let i=0; i<3; i++){
      let board = gameboard.Gameboard;
      if(board[i][pos.col]!=board[incRC(i)][pos.col]){
        return false;
      }
    }
    return true;
  }
  function checkDiag(){
    let board = gameboard.Gameboard;
    if (board[1][1] == undefined) return;
    for(let i=0; i<3; i++){
      if(board[i][i]!=board[incRC(i)][incRC(i)]
      || board[i][i] == undefined){
        if(board[0][2]==undefined || board[2][0]==undefined) return;
        if(board[0][2]!=board[1][1] || board[1][1]!=board[2][0]){
          return false;
        }
      }
    }
    return true;
  }
  function incRC(pos){
    pos++;
    return (pos<3)?pos: 0; 
  }
  function finish(){
    const greeting = document.querySelector('.greeting');
    const retryBtn = document.querySelector('.retry');
    const exitBtn = document.querySelector('.exit')
    retryBtn.addEventListener('click', retryBtnClick);
    exitBtn.addEventListener('click', exitBtnClick);
    gameLayout.style = 'filter: blur(5px);';
    gameLayout.style.display = 'grid';
    greetLayout.style.display = 'grid'
    greeting.textContent = currentPlayer.name + ' won!';
  }
  function playBtnClick(){
    console.log(playerO.isAI)
    gameboard.Gameboard = [[], [], []];
    render();
    gameLayout.style.filter = 'none';
    const player1IP = document.querySelector('#player1-name');
    const player2IP = document.querySelector('#player2-name');
    playerX = (player1IP.value)?Player(player1IP.value, 'X'): playerX;
    if(!playerO.isAI){
      playerO = (player2IP.value)?Player(player2IP.value, 'O'): playerO;
    }
    console.log(playerO)
    currentPlayer = playerX;
    playerLayout.style.display = 'none';
    gameLayout.style.display = 'grid';
    playerInfo.textContent = `${playerX.name}'s turn`;
  }
  function retryBtnClick(){
    gameboard.Gameboard = [[], [], []];
    render();
    greetLayout.style.display = 'none';
    gameLayout.style.filter = 'none';
  }
  function exitBtnClick(){
    greetLayout.style.display = 'none';
    gameLayout.style.display = 'none';
    welcomeLayout.style.display = 'grid';
  }
  function partMouseOver(){
    if (this.textContent!='')return;
    this.classList.add('hover');
    this.textContent = currentPlayer.mark;
    this.addEventListener('mouseout', ()=>{
      this.classList.remove('hover');
      layoutItems();
    })
  }
  function withFriendBtnClick(){
    welcomeLayout.style.display = 'none';
    playerLayout.style.display = 'grid';
    ai.style.display = 'none';
    player2.style.display = 'grid';
  }
  function withAIBtnClick(){
    welcomeLayout.style.display = 'none';
    playerLayout.style.display = 'grid';
    player2.style.display = 'none';
    ai.style.display = 'grid';
    playerO = Player('AI','O');
    playerO.isAI = true;
  }
  function playAI(){
    let index = Math.floor(Math.random()*9);
    if(gameboard.Gameboard[index]!=undefined) playAI();
    gameboard.Gameboard[index] = currentPlayer.mark;
  }
}()