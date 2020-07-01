const list = ['ole', 'christian', 'slaattene'];
const ele  = document.querySelector('.game');

class Game {
  constructor (ele, words) {
    this.ele   = ele;
    this.words = words;
    this.index = 0;
    this.word  = new Word(this.words[this.index]);
    this.initContainer();

    window.addEventListener(
      'keydown',
      this.handleKey.bind(this)
    );
  }

  initContainer () {
    this.ele.innerHTML = '';
    this.ele.appendChild(this.word.ele);
  }

  handleKey (event) {
    const string = this.word.string;
    const letter = this.word.letter;
    const result = event.key === string[letter];

    this.word.update(letter, result);

    if (this.word.letter >= this.word.string.length) {
      this.index++;
      this.word = new Word(this.words[this.index]);
      this.initContainer();
    }
  }
}

class Word {
  constructor (string) {
    this.string = string;
    this.letter = 0;
    this.result = new Array(string.length);
    this.ele    = document.createElement('div');

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
      .add(result ? 'correct' : 'wrong');

    this.result[index] = result;
    this.letter++;
  }
}

const game = new Game(ele, list);
