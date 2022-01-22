/* if (document.querySelector("#loadGame")) {
  document.querySelector("#loadGame").addEventListener("click", function (ev) {
    this.style = "display:none";
    this.nextElementSibling.style = "display:block";
    setTimeout(() => {
      new Game();
    }, 250);
  });
}
if (document.querySelector("#newGame")) {
  document.querySelector("#newGame").addEventListener("click", function (ev) {
    this.style = "display:none";
    new Game();
  });
}
 */
let input;
document.addEventListener("keydown", (ev) => {
  let key = ev.key;
  if (key === "Enter") {
    input = document.querySelector("#playerInput").value;
    document.querySelector("#playerInput").value = "";
  }
});
