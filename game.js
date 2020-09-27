const canvas = document.querySelector('canvas');
const ctx    = canvas.getContext('2d');

// Background image
let bgReady = false;
const bgImage = new Image();

bgImage.src = 'images/background.png';
bgImage.onload = () => { bgReady = true };

// Player image
let playerReady = false;
const playerImage = new Image();

playerImage.src = 'images/hero.png';
playerImage.onload = () => { playerReady = true };

// Monster image
let monsterReady = false;
const monsterImage = new Image();

monsterImage.src = 'images/monster.png';
monsterImage.onload = () => { monsterReady = true };

// Game objects
const player = {
  speed: 5, // Pixels per second
  x    : 0,
  y    : 0,
};

const monster = {
  x: 0,
  y: 0,
};

let monsterCaught = 0;
let keysDown = {};

addEventListener('keydown', event => {
  keysDown[event.keyCode] = true;
}, false);

addEventListener('keyup', event => {
  delete keysDown[event.keyCode];
}, false);

const reset = () => {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  monster.x = 32 + (Math.random() * canvas.width - 64);
  monster.y = 32 + (Math.random() * canvas.height - 64);
};

const update = (modifier) => {
  if (38 in keysDown) // up
    player.y -= player.speed + modifier;
  if (40 in keysDown) // down
    player.y += player.speed + modifier;
  if (37 in keysDown) // left
    player.x -= player.speed + modifier;
  if (39 in keysDown) // right
    player.x += player.speed + modifier;

  if (
       player.x  <= (monster.x + 32)
    && player.y  <= (monster.y + 32)
    && monster.x <= (player.x + 32)
    && monster.y <= (player.y + 32)
  ) {
    monsterCaught++;
    reset();
  }
};

const render = () => {
  if (bgReady)
    ctx.drawImage(bgImage, 0, 0);
  if (playerReady)
    ctx.drawImage(playerImage, player.x, player.y);
  if (monsterReady)
    ctx.drawImage(monsterImage, monster.x, monster.y);

  ctx.fillStyle    = 'rgb(255,255,255)';
  ctx.font         = '24px Helvetica';
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Monsters caught: ' + monsterCaught, 32, 32);
}

let then = Date.now();
const main = () => {
  const now   = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
};

reset();
main();
