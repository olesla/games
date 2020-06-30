const words  = ['ole', 'christian', 'slaattene'];
const canvas = document.querySelector('canvas');
const button = document.querySelector('button');
const ctx    = canvas.getContext('2d');

let word   = 0;
let letter = 1;

const nextWord = function () {
  word++;
  letter = 1;
  printWord(words[word]);
};

const printWord = function (word) {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillText(word, 50, 50);
};

const startGame = function () {
  printWord(words[0]);
  button.style.display = 'none';

  window.addEventListener('keydown', handleKeyPress);
};

const handleKeyPress = function (event) {
  // if (event.key === words[word][letter])
  if (letter >= words[word].length)
    return nextWord();

  letter++;
};

button.addEventListener('click', startGame);