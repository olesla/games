'use strict';
import Word  from './word.js';

class Game {
  constructor (words) {
    this.elems = {
      root : document.querySelector('.game'),
      time : document.querySelector('.time'),
      score: document.querySelector('.score'),
    };
    this.words = words;
    this.index = 0;
    this.time  = 0;
    this.score = 0;
    this.word  = new Word(this.words[this.index]);
    this.timer = this.startTimer();
    this.initContainer();

    window.onkeydown = this.handleKey.bind(this);
  }

  initContainer () {
    this.elems.root.innerHTML = '';
    this.elems.root.appendChild(this.word.ele);
  }

  startTimer () {
    return setInterval(() => {
      this.time++;
      this.elems.time.innerText = this.time;
    }, 1000);
  }

  updateScore () {
    this.score++;
    this.elems.score.innerText = this.score;
  }

  handleKey (event) {
    const string = this.word.string;
    const letter = this.word.letter;
    const result = event.key === string[letter];

    this.word.update(letter, result);
    if (result)
      this.updateScore();

    if (this.word.letter >= this.word.string.length) {
      this.index++;

      if (this.index === this.words.length)
        return this.gameOver();

      this.word = new Word(this.words[this.index]);
      this.initContainer();
    }
  }

  gameOver () {
    clearInterval(this.timer);
    window.onkeydown = undefined;
    this
      .elems
      .root
      .innerHTML = `<div class='word-container center'>Game over!</div>`;
  }
}

export default Game;
