let canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let keysPressed = {};

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
  x: 300,
  y: 300,
  width: 50,
  height: 50,
  draw: function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  interact: function() {
    alert("你捡到了一个物品！");
  }
};

function update(deltatime) {
  const moveSpeed = 200;
  const moveAmount = (moveSpeed * deltatime) / 1000;

  if (keysPressed["ArrowUp"]) {
    if (window.player.y - moveAmount >= 0) {
      window.map.move(0, -moveAmount);
      window.player.y -= moveAmount;
    }
  }
  if (keysPressed["ArrowDown"]) {
    if (window.player.y + window.player.height + moveAmount <= window.map.image.height) {
      window.map.move(0, moveAmount);
      window.player.y += moveAmount;
    }
  }
  if (keysPressed["ArrowLeft"]) {
    if (window.player.x - moveAmount >= 0) {
      window.map.move(-moveAmount, 0);
      window.player.x -= moveAmount;
    }
  }
  if (keysPressed["ArrowRight"]) {
    if (window.player.x + window.player.width + moveAmount <= window.map.image.width) {
      window.map.move(moveAmount, 0);
      window.player.x += moveAmount;
    }
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