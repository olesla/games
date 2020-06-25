const container = document.querySelector('.container');
const rows = Array.from(container.querySelectorAll('.row'));
const winner = document.querySelector('.winner');
let player = 1;

container.addEventListener('click', event => {
  if (event.target.classList.contains('slot'))
    handleClick(event.target, player);
});

const handleClick = element => {
  // Slot already taken
  if (element.classList.contains('active'))
    return;

  element.classList.add(`player-${player}`, 'active');
  checkForWinner(player);
  player = player === 1 ? 2 : 1;
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

  const verticalResult = checkVertical();
  const horizontalResult = checkHorizontal();

  if (verticalResult || horizontalResult) {
    endGame(player);
  }
};

const endGame = player => {
  winner.innerText = `Player ${player} wins!`;
};
