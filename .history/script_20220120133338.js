class Game {
  constructor() {
    this.numberOfTurns = 10;
    this.word;
    this.separators = ["-", " ", "'"];
    this.hiddenWord;
    this.wrongLetters = [""];
    this.loadGame();
  }

  loadGame() {
    this.word = new Dictionnary().getOneWord().split("");
    this.hiddenWord = this.hideWord(this.word);
    if (this.manageTurns()) {
      this.display("win");
    } else {
      console.clear();
      this.display("draw", this.numberOfTurns);
      this.display("word");
      this.display("lost");
    }
  }
  manageTurns() {
    let count = 0;
    while (count < this.numberOfTurns) {
      console.clear();
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
        if (letterGuessed.length) {
          letterGuessed.forEach((letterIndex) => {
            this.hiddenWord[letterIndex] = input.toUpperCase();
          });
          if (!this.hiddenWord.includes("_")) {
            return true;
          }
        } else {
          this.wrongLetters.push(input);
          count++;
        }
      } else {
        this.display("talk", "Vous avez déjà tenter cette lettre!");
      }
    }
  }
  hideWord(letters) {
    let word = [];
    letters.forEach((letter) => {
      console.log(letter);
    });
    return word;
  }
  checkLetter(input) {
    let letterGuessed = [];
    this.word.forEach((letter, index) => {
      if (letter === input) {
        letterGuessed.push(index);
      }
    });
    return letterGuessed;
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
