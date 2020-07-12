'use strict';
import words from './words.js';
import Game  from './game.js';

const button = document.querySelector('button');
const start  = () => {
  new Game(words);
};

button.addEventListener('click', start);
