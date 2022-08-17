let Gameboard = function(){
  let Gameboard = [];
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
    let index = this.classList[1];
    if (gameBoard.Gameboard[index]!==undefined) return;
    gameBoard.Gameboard[index] = currentPlayer.mark;
    layoutItems();
    togglePlayer();
  }
  function layoutItems(){ 
    for(let i=0; i<parts.length; i++){
      parts[i].textContent = gameBoard.Gameboard[i];
    }
  }
  function togglePlayer(){
    currentPlayer = (currentPlayer==playerX)? playerO : playerX;
  }
}()