/**
 * TODOS
 * - Make a metronome in the canvas
 * - Make drums appear in the canvas
 * - Add some sort of sequencing
 */


const canvas  = document.querySelector('canvas');
canvas.width  = 328;
canvas.height = 202;
const ctx     = canvas.getContext('2d');

const image  = new Image();
image.src    = './images/drumset.png';
image.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0);
});

let count   = 0;

const notes = {
  hh: new Array(8).fill().map(() => ({active: true})),
  sn: new Array(8).fill().map(() => ({active: false})),
  bd: new Array(8).fill().map(() => ({active: false})),
};

const sounds = {
  hh: document.querySelector('[data-sound="hh"]'),
  sn: document.querySelector('[data-sound="sn"]'),
  bd: document.querySelector('[data-sound="bd"]'),
};

//notes.bd[0].active = true;
//notes.sn[2].active = true;
//notes.bd[4].active = true;
//notes.sn[6].active = true;

audioContext = new AudioContext();

const playSound = () => {
  const oscilliator = audioContext.createOscillator();
  oscilliator.connect(audioContext.destination);
  oscilliator.frequency.value = 300;
  oscilliator.start();
  setTimeout(() => {
    oscilliator.stop();
  }, 100);
};

const loop  = setInterval(() => {
  if (count === 8)
    count = 0;

  for (const note in notes)
    if (notes[note][count].active)
      playSound();

  count++;
}, 500);
