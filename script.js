let game;
let victories = 0;
let defeats = 0;
function manageKey(ev) {
  let key = ev.key;
  if (game.authorizedInput.includes(key)) {
    game.manageTurns(key);
  }
}
function newGame(ev) {
  let key = ev.key;
  if (key === "Enter") {
    game = new Game();
    document.querySelector(`#result`).innerHTML = "";
    document.querySelector(`#newGame`).innerHTML = "";
    game.manageTurns("");
    document.addEventListener("keydown", manageKey);
  }
}
if (document.querySelector("#loadGame")) {
  document.querySelector("#loadGame").addEventListener("click", function (ev) {
    this.style = "display:none";
    this.nextElementSibling.style = "display:flex";
    let obj = { key: "Enter" };
    setTimeout(() => {
      newGame(obj);
    }, 250);
  });
}
