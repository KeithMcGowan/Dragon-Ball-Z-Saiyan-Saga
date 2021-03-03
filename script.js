const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

let currentGame;

document.getElementById("start").onclick = function () {

  currentGame = new Game();
  
  document.addEventListener("keydown", currentGame.activeDirections.keyListener);
  
  document.addEventListener("keyup", currentGame.activeDirections.keyListener);
  
  currentGame.gameLoop();

};

document.onkeydown = function (event) {
    const arrows = ["ArrowUp", "ArrowLeft", "ArrowRight", " ", "b"];
    console.log(event.key);
  
    if (arrows.includes(event.key)) {
      event.preventDefault();
    }
  
    if (event.key === "ArrowUp") {
      currentGame.activeDirections.up = true;
    } else if (event.key === "ArrowLeft") {
      currentGame.activeDirections.left = true;
    } else if (event.key === "ArrowRight") {
      currentGame.activeDirections.right = true;
    } else if (event.key === " ") {
      currentGame.activeDirections.attack = true;
    } else if (event.key === "b") {
      currentGame.activeDirections.special = true;
    }
    currentGame.goku.move();
};
  
document.onkeyup = function (event) {
    if (event.key === "ArrowUp") {
      currentGame.activeDirections.up = false;
    } else if (event.key === "ArrowLeft") {
      currentGame.activeDirections.left = false;
    } else if (event.key === "ArrowRight") {
      currentGame.activeDirections.right = false;
    } else if (event.key === " ") {
      currentGame.activeDirections.attack = false;
    } else if (event.key === "b") {
      currentGame.activeDirections.special = false;
    }
};

currentGame.gameLoop();