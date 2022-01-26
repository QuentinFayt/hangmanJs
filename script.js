let game;
let victories = 0;
let defeats = 0;
let input;
if (document.querySelector("#loadGame")) {
  document.querySelector("#loadGame").addEventListener("click", function (ev) {
    this.style = "display:none";
    this.nextElementSibling.style = "display:flex";
    setTimeout(() => {
      game = new Game();
      document.querySelector("#playerInput").focus();
      game.manageTurns("");
    }, 250);
  });
}
if (document.querySelector("#newGame")) {
  document.querySelector("#newGame").addEventListener("click", function (ev) {
    this.style = "display:none";
    game = new Game();
    document.querySelector(`#result`).innerHTML = "";
    document.querySelector("#playerInput").disabled = false;
    document.querySelector("#playerInput").focus();
    game.manageTurns("");
  });
}
document.addEventListener("keydown", (ev) => {
  let key = ev.key;
  console.log(key);
  if (key === "Enter") {
    let input = document.querySelector("#playerInput").value;
    game.manageTurns(input);
    document.querySelector("#playerInput").value = "";
  }
});
