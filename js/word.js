'use strict';

class Word {
  constructor (string) {
    this.string = string;
    this.letter = 0;
    this.result = new Array(string.length);
    this.ele    = document.createElement('div');
    this.ele
      .classList
      .add('word-container', 'center')

    for (let x of this.string) {
      const span = document.createElement('span');
      span.innerText = x;
      this.ele.appendChild(span);
    }
  }

  update (index, result) {
    this.ele
      .children[index]
      .classList
      .add(result ? 'text-green' : 'text-red');

    this.result[index] = result;
    this.letter++;
  }
}

export default  Word;
