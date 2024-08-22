let canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let keysPressed = {};

let collisionMap = [];

fetch("../other/collision_map.json")
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

// 定义物品
let item = {
  x: 30,
  y: 30,
  width: 50,
  height: 50,
  draw: function (ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  interact: function () {
    alert("你捡到了一个物品！");
  },
};

function update(deltatime) {
  const moveSpeed = 500;
  const moveAmount = (moveSpeed * deltatime) / 1000;

  if (keysPressed["ArrowUp"]) {
    window.player.move(0, -moveAmount, collisionMap);
  }
  if (keysPressed["ArrowDown"]) {
    window.player.move(0, moveAmount, collisionMap);
  }
  if (keysPressed["ArrowLeft"]) {
    window.player.move(-moveAmount, 0, collisionMap);
  }
  if (keysPressed["ArrowRight"]) {
    window.player.move(moveAmount, 0, collisionMap);
  }

  // 检测玩家是否接触到物品
  if (
    window.player.x < item.x + item.width &&
    window.player.x + window.player.width > item.x &&
    window.player.y < item.y + item.height &&
    window.player.y + window.player.height > item.y
  ) {
    item.interact();
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
  item.draw(ctx); // 绘制物品
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
