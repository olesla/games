class Game {
  /**
   * Constructor
   * @param {Array}  words 
   * @param {Object} container
   */
  constructor(words, container) {
    this.words         = words;
    this.container     = container;
    this.currentWord   = 0;
    this.currentLetter = 0;

    this.elements = {
      paragraph: document.createElement('p'),
      canvas   : document.createElement('canvas'),
    };

    for (const element of Object.values(this.elements))
      this.container.appendChild(element);

    window.addEventListener('keydown', event => {
      if (this.words[this.currentWord][this.currentLetter] === event.key)
        console.log('correct');
      else
        console.log('wrong');

      this.currentLetter++;

      if (this.currentLetter === this.words[this.currentWord].length) {
        this.currentWord++;
        this.currentLetter = 0;
        this.nextWord();
      }
    });

    this.nextWord();
  }
  
  nextWord() {
    if (this.currentWord >= this.words.length) {
      this.elements.paragraph.innerText = 'You win!';
      window.removeEventListener('keydown');
    }
    else {
      this.elements.paragraph.innerText = this.words[this.currentWord];
    }
  }
}

const elem = document.querySelector('.container');
const game = new Game(['ole', 'christian', 'slaattene'], elem);