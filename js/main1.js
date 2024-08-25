let canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let keysPressed = {};

let collisionMap = [];

fetch("../other/collision_map1.json")
  .then((response) => response.json())
  .then((data) => {
    collisionMap = data;
    requestAnimationFrame(mainLoop);
  })
  .catch((error) => console.error("Error loading collision map:", error));

function handleKeyDown(event) {
  keysPressed[event.key] = true;
}

function handleKeyUp(event) {
  delete keysPressed[event.key];
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function update(deltatime) {
  const moveSpeed = 100;
  const moveAmount = (moveSpeed * deltatime) / 1000;

  if (keysPressed["ArrowUp"]) {
    window.player.move(0, -moveAmount, collisionMap);
    player.updateImage("up");
  }
  if (keysPressed["ArrowDown"]) {
    window.player.move(0, moveAmount, collisionMap);
    player.updateImage("down");
  }
  if (keysPressed["ArrowLeft"]) {
    window.player.move(-moveAmount, 0, collisionMap);
    player.updateImage("left");
  }
  if (keysPressed["ArrowRight"]) {
    window.player.move(moveAmount, 0, collisionMap);
    player.updateImage("right");
  }
  if (keysPressed["e"] || keysPressed["E"]) {
    window.player.interact(collisionMap);
  }
}

function draw(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
  if (window.map) {
    window.map.draw(ctx);
  }
  if (window.player) {
    window.player.draw(ctx);
  }
}

let lastRender = 0;

function mainLoop(timestamp) {
  let deltatime = timestamp - lastRender;
  update(deltatime);
  draw(ctx);
  lastRender = timestamp;
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
