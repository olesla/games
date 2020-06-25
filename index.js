const container = document.querySelector('.container');
const game      = container.querySelector('.game');
const rows      = Array.from(container.querySelectorAll('.row'));
const slots     = Array.from(container.querySelectorAll('.slot'));
const winner    = container.querySelector('.winner');
const currentP  = container.querySelector('.current-player');
let player      = 1;
let gameOver    = false;

container.addEventListener('click', event => {
  if (event.target.classList.contains('slot'))
    return playerMove(event.target);

  if (event.target.classList.contains('reset-button'))
    return resetGame();
});

const playerMove = element => {
  // Slot already taken
  if (element.classList.contains('active') || gameOver)
    return;

  element.classList.add(`player-${player}`, 'active');
  checkForWinner(player);
  player = player === 1 ? 2 : 1;
  currentP.innerText = `Player: ${player}`;
};

const checkVertical = () => {
  let counter = 0;

  for (const row of rows) {
    for (const slot of row.children) {
      if (slot.classList.contains(`player-${player}`)) {
        counter++;
        if (counter === 4)
          return true;
      } else {
        counter = 0;
      }
    }
  }

  return false;
};

const checkHorizontal = () => {
  let counter = 0;

  for (let i = 0; i < 7; i++) {
    for (const row of rows) {
      if (row.children[i] && row.children[i].classList.contains(`player-${player}`)) {
        counter++;
        if (counter === 4)
          return true;
      } else {
        counter = 0;
      }
    }
  }

  return false;
};

const checkForWinner = player => {
  let result = 0;

  const verticalResult   = checkVertical();
  const horizontalResult = checkHorizontal();

  if (verticalResult || horizontalResult) {
    endGame(player);
  }
};

const endGame = player => {
  winner.innerText = `Player ${player} wins!`;
  gameOver = true;
};

const resetGame = () => {
  for (const slot of slots)
    slot.classList.remove('active', 'player-1', 'player-2')

  gameOver = false;
  winner.innerText = '';
  currentP.innerText = 'Player: 1';
};
