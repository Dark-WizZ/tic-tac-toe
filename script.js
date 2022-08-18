let Gameboard = function(){
  let Gameboard = new Array(3);
  function resetArr(){
    for(let i=0; i<3; i++){
      Gameboard[i] = new Array(3);
    }
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        Gameboard[i][j]='';
      }
    }
  }
  resetArr();
  let turn = 1;
  return {Gameboard, turn, resetArr};
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

  //vars
  let playerX = Player('Player1','X');
  let playerO = Player('Player2','O');
  let currentPlayer = playerX;

  const gameboard = Gameboard;
  let board = gameboard.Gameboard;

  let scores = {
    X: -1,
    O: 1,
    tie: 0
  }

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
    gameboard.turn=1;
    layoutItems();
  }
  function plotMarks(){
    this.classList.remove('hover');
    let index = this.classList[1].split('-');
    let row = Number(index[0]);
    let col = Number(index[1]);
    if (board[row][col]!='') return;
    board[row][col] = currentPlayer.mark;
    layoutItems();
    result({row, col});
  }
  function result(pos){
    let res = check(pos);
    if(res){
      finish(true)
    }else if(res==null){
      finish(false)
    }else{
      togglePlayer();
    }
  }
  function layoutItems(){
    let i = 0;
    for(let row=0; row<3; row++){
      for(let col=0; col<3; col++){
        parts[i].textContent = board[row][col];
        i++;
      }
    }
  }
  function togglePlayer(){
    currentPlayer = (currentPlayer==playerX)? playerO : playerX;
    playerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (currentPlayer.isAI) playAI();
  }
  function check(){
    if (checkRow() || checkCol() || checkDiag()){
      return true;
    }
    let c=0;
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(board[i][j]==''){
          c++;
        }
      }
    }
    if(c==0) return null;
    return false;
  }
  function checkRow(){
    for(let i=0; i<3; i++){
      let c=0;
      for(let j=0; j<3; j++){
        if(board[i][j]==board[i][incRC(j)] && 
        board[i][j]!=''){
          c++;
          if (c==3) return true;
        }
      }
    }
    return false;
  }
  function checkCol(){
    for(let i=0; i<3; i++){
      let c=0;
      for(let j=0; j<3; j++){
        if(board[j][i]==board[incRC(j)][i] && 
        board[j][i]!=''){
          c++;
          if (c==3) return true;
        }
      }
    }
    return false;
  }
  function checkDiag(){
    if (board[1][1] == '') return;
    for(let i=0; i<3; i++){
      if(board[i][i]!=board[incRC(i)][incRC(i)]
      || board[i][i] == ''){
        if(board[0][2]=='' || board[2][0]=='') return;
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
  function finish(state){
    const greeting = document.querySelector('.greeting');
    const retryBtn = document.querySelector('.retry');
    const exitBtn = document.querySelector('.exit')
    retryBtn.addEventListener('click', retryBtnClick);
    exitBtn.addEventListener('click', exitBtnClick);
    gameLayout.style = 'filter: blur(5px);';
    gameLayout.style.display = 'grid';
    greetLayout.style.display = 'grid'
    greeting.textContent = (state)?currentPlayer.name + ' won!' : 'draw';
  }

  function playBtnClick(){
    gameboard.resetArr();
    render();
    gameLayout.style.filter = 'none';
    const player1IP = document.querySelector('#player1-name');
    const player2IP = document.querySelector('#player2-name');
    playerX = (player1IP.value)?Player(player1IP.value, 'X'): playerX;
    if(!playerO.isAI){
      playerO = (player2IP.value)?Player(player2IP.value, 'O'): playerO;
    }
    currentPlayer = playerX;
    playerLayout.style.display = 'none';
    gameLayout.style.display = 'grid';
    playerInfo.textContent = `${playerX.name}'s turn`;
    if (currentPlayer.isAI) playAI();
  }
  function retryBtnClick(){
    gameboard.resetArr();
    render();
    greetLayout.style.display = 'none';
    gameLayout.style.filter = 'none';
    if (currentPlayer.isAI) playAI();
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
  // function playAI(){
  //   let row; let col;
  //   while(true){
  //     row = Math.floor(Math.random()*3);
  //     col = Math.floor(Math.random()*3);
  //     if(board[row][col]==''){
  //       break;
  //     }
  //   }
  //   board[row][col] = currentPlayer.mark;
  //   layoutItems();
  //   result({row, col});
  // }
  function playAI(){
    let bestScore = -Infinity;
    let row, col;
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(board[i][j]==''){
          board[i][j] = currentPlayer.mark;
          let score = minMax(board);
          board[i][j] = '';
          if(score>bestScore){
            bestScore = score;
            row=i; col=j;
          }
        }
      }
    }
    board[row][col] = currentPlayer.mark;
    layoutItems();
    result({row, col});
  }
  function minMax(board, depth, isMaximixing){
    return 1;

  }
}()