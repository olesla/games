const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
const velocity = 10;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dy = velocity;
let dx = velocity;

canvas.width = 1000;
canvas.height = 1000;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#9905DD';
  ctx.fill();
  ctx.closePath();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  if (y < 0 || y > canvas.height) dy = -dy;
  if (x < 0 || x > canvas.width) dx = -dx;
  y += dy;
  x += dx;
}

setInterval(update, 10);
