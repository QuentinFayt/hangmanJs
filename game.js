class Game {
  #word;
  #numberOfTurns = 10;
  #actualTurn = 0;
  #separators = ["-", " ", "'"];
  #specialChar = {
    a: ["á", "à", "â", "ä"],
    e: ["é", "è", "ê", "ë"],
    i: ["í", "ì", "î", "ï"],
    o: ["ó", "ò", "ô", "ö"],
    u: ["ú", "ù", "û", "ü"],
    y: ["ý", "ÿ"],
    c: ["ç"],
  };
  #hiddenWord;
  #wrongLetters = [""];
  constructor() {
    this.#loadGame();
  }

  #loadGame() {
    this.#word = new Dictionnary().getOneWord().split("");
    this.#hiddenWord = this.#hideWord(this.#word);
  }
  manageTurns(input) {
    input ? input[0].toLowerCase() : "";
    if (!this.#wrongLetters.includes(input)) {
      let letterGuessed = this.#checkLetter(input);
      if (letterGuessed["normal"].length || letterGuessed["special"].length) {
        this.#revealLetters(letterGuessed, input);
      } else {
        this.#wrongLetters.push(input);
        this.#actualTurn++;
      }
    }
    console.clear();
    this.#manageDrawing(this.#actualTurn);
    this.#displayText("word");
    this.#displayText("letters");
    if (!this.#hiddenWord.includes("_")) {
      this.#displayGameResult("win");
      document.querySelector("#playerInput").setAttribute("disabled", true);
      document.querySelector("#newGame").style = "display:block";
    }
    if (this.#actualTurn === this.#numberOfTurns) {
      this.#displayGameResult("lost");
      document.querySelector("#playerInput").setAttribute("disabled", true);
      document.querySelector("#newGame").style = "display:block";
    }
  }
  #hideWord(letters) {
    let word = [];
    letters.forEach((letter) => {
      let elem = this.#separators.includes(letter)
        ? this.#separators[this.#separators.indexOf(letter)]
        : "_";
      word.push(elem);
    });
    return word;
  }
  #checkLetter(input) {
    let letterGuessed = { normal: [], special: [] };
    this.#word.forEach((letter, index) => {
      if (letter === input) {
        letterGuessed["normal"].push(index);
      }
      if (this.#specialChar[input]) {
        this.#specialChar[input].forEach((char) => {
          if (letter === char) {
            letterGuessed["special"].push({ [index]: char });
          }
        });
      }
    });
    return letterGuessed;
  }
  #revealLetters(chars, input) {
    if (chars["normal"].length) {
      chars["normal"].forEach((letterIndex) => {
        this.#hiddenWord[letterIndex] = input.toUpperCase();
      });
    }
    if (chars["special"].length) {
      chars["special"].forEach((specialChar) => {
        this.#hiddenWord[Object.keys(specialChar)] =
          Object.values(specialChar)[0].toUpperCase();
      });
    }
  }
  #display(talkDrawWord, message = null) {
    let toDo;
    switch (talkDrawWord) {
      case "win":
        toDo = `Félicitation! Le mot était bien ${this.#word.join("")}`;
        break;
      case "lost":
        toDo = `Désolé vous avez perdu! Le mot était ${this.#word.join("")}`;
        break;
    }
    console.log(toDo);
  }
  /*   #draw(state) {
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
  } */
  #manageDrawing(state) {
    document.querySelector("#hangman").src =
      "file:///D:/exercices/hangmanJs/images/pendu" + state + ".png";
  }
  #displayText(element) {
    document.querySelector(`#${element}`).innerHTML =
      element === "word"
        ? this.#hiddenWord.join(" ")
        : this.#wrongLetters.join(" ").toUpperCase();
  }
  #displayGameResult(result) {
    document.querySelector(`#result`).innerHTML =
      result === "win"
        ? `Félicitation! Le mot était bien ${this.#word.join("")}`
        : `Désolé vous avez perdu! Le mot était ${this.#word.join("")}`;
  }
}
