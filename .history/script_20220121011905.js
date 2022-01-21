class Game {
  constructor() {
    this.numberOfTurns = 10;
    this.word;
    this.separators = ["-", " ", "'"];
    this.specialChar = {
      a: ["á", "à", "â", "ä"],
      e: ["é", "è", "ê", "ë"],
      i: ["í", "ì", "î", "ï"],
      o: ["ó", "ò", "ô", "ö"],
      u: ["ú", "ù", "û", "ü"],
      y: ["ý", "ÿ"],
      c: ["ç"],
    };
    this.hiddenWord;
    this.wrongLetters = [""];
    this.loadGame();
  }

  loadGame() {
    this.word = /* new Dictionnary().getOneWord() */ "réputé".split("");
    this.hiddenWord = this.hideWord(this.word);
    if (this.manageTurns()) {
      this.display("win");
    } else {
      /* 
      console.clear(); */
      this.display("draw", this.numberOfTurns);
      this.display("word");
      this.display("lost");
    }
  }
  manageTurns() {
    let count = 0;
    while (count < this.numberOfTurns) {
      /* 
      console.clear(); */
      this.display("draw", count);
      this.display("word");
      this.display(
        "talk",
        `Lettre(s) que vous avez déjà tenté: ${this.wrongLetters.join(" ")}`
      );
      let input = prompt("Devine une lettre");
      input = input ? input[0].toLowerCase() : "";
      if (!this.wrongLetters.includes(input)) {
        let specialLetterGuessed = this.checkLetter(input);
        let normalLetterGuessed = specialLetterGuessed.normal;
        delete specialLetterGuessed.normal;
        if (
          normalLetterGuessed.length ||
          Object.keys(specialLetterGuessed).length
        ) {
          this.revealLetters(specialLetterGuessed, normalLetterGuessed, input);

          if (!this.hiddenWord.includes("_")) {
            return true;
          }
        } else {
          this.wrongLetters.push(input);
          count++;
        }
      }
    }
  }
  hideWord(letters) {
    let word = [];
    letters.forEach((letter) => {
      let elem = this.separators.includes(letter)
        ? this.separators[this.separators.indexOf(letter)]
        : "_";
      word.push(elem);
    });
    return word;
  }
  checkLetter(input) {
    let letterGuessed = { normal: [] };
    this.word.forEach((letter, index) => {
      if (letter === input) {
        letterGuessed["normal"].push(index);
      }
      if (this.specialChar[input]) {
        this.specialChar[input].forEach((char) => {
          if (letter === char) {
            console.log(Array.isArray(letterGuessed.char));
            if (!Array.isArray(letterGuessed.char)) {
              letterGuessed[char] = [];
            }
            letterGuessed[char].push(index);
          }
        });
      }
    });
    return letterGuessed;
  }
  revealLetters(specialChar, normalChar, input) {
    if (normalChar.length) {
      normalChar.forEach((letterIndex) => {
        this.hiddenWord[letterIndex] = input.toUpperCase();
      });
    }
    if (Object.keys(specialChar).length) {
      for (let [letter, index] of Object.entries(specialChar)) {
        this.hiddenWord[index] = letter.toUpperCase();
      }
    }
  }
  display(talkDrawWord, message = null) {
    let toDo;
    switch (talkDrawWord) {
      case "talk":
        toDo = message;
        break;
      case "draw":
        toDo = this.draw(message);
        break;
      case "word":
        toDo = this.hiddenWord.join(" ");
        break;
      case "win":
        toDo = `Félicitation! Le mot était bien ${this.word.join("")}`;
        break;
      case "lost":
        toDo = `Désolé vous avez perdu! Le mot était ${this.word.join("")}`;
        break;
    }
    console.log(toDo);
  }
  draw(state) {
    let drawing;
    switch (state) {
      case 0:
        drawing = ``;
        break;
      case 1:
        drawing = `
      =========`;
        break;
      case 2:
        drawing = `
        |
        |
        |
        |
        |
      =========`;
        break;
      case 3:
        drawing = `
        +----+
        |
        |
        |
        |
        |
      =========`;
        break;
      case 4:
        drawing = `
        +----+
        |/   |
        |
        |
        |
        |
      =========`;
        break;
      case 5:
        drawing = `
        +----+
        |/   |
        |    O
        |
        |
        |
      =========`;
        break;
      case 6:
        drawing = `
        +----+
        |/   |
        |    O
        |    |
        |
        |
      =========`;
        break;
      case 7:
        drawing = `
        +----+
        |/   |
        |    O
        |    |
        |   /
        |
      =========`;
        break;
      case 8:
        drawing = `
        +----+
        |/   |
        |    O
        |    |
        |   / \\
        |
      =========`;
        break;
      case 9:
        drawing = `
        +----+
        |/   |
        |    O
        |   /|
        |   / \\
        |
      =========`;
        break;
      case 10:
        drawing = `
        +----+
        |/   |
        |    O
        |   /|\\
        |   / \\
        |
      =========`;
        break;
    }
    return drawing;
  }
}
document.querySelector("#game").addEventListener("click", () => {
  new Game();
});
