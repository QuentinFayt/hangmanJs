class Game {
  constructor() {
    this.numberOfTurns = 10;
    this.word;
    this.separators = ["-", " ", "'"];
    this.specialChar = {
      a: { 1: "á", 2: "à", 3: "â", 4: "ä" },
      e: { 1: "é", 2: "è", 3: "ê", 4: "ë" },
      i: { 1: "í", 2: "ì", 3: "î", 4: "ï" },
      o: { 1: "ó", 2: "ò", 3: "ô", 4: "ö" },
      u: { 1: "ú", 2: "ù", 3: "û", 4: "ü" },
      y: { 1: "ý", 2: "ÿ" },
      c: { 1: "ç" },
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
        let letterGuessed = this.checkLetter(input);
        if (letterGuessed["normal"].length || letterGuessed["special"].length) {
          this.revealLetters(letterIndex, input);
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
    let letterGuessed = { normal: [], special: [] };
    this.word.forEach((letter, index) => {
      if (letter === input) {
        letterGuessed["normal"].push(index);
      }
      if (this.specialChar[input]) {
        for (let [key, char] of Object.entries(this.specialChar[input])) {
          if (letter === char) {
            letterGuessed[special].push({ index: char });
          }
        }
      }
    });
    return letterGuessed;
  }
  revealLetters(chars, input) {
    if (chars["normal"].length) {
      normalChar.forEach((letterIndex) => {
        this.hiddenWord[letterIndex] = input.toUpperCase();
      });
    }
    if (chars["special"].length) {
      chars["special"].forEach((specialChar) => {
        for (let [letter, index] of Object.entries(chars["special"])) {
          this.hiddenWord[index] = letter.toUpperCase();
        }
      });
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
