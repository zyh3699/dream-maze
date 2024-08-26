class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../minigame/maze/img/player/up.png";
    this.width = 32;
    this.height = 66;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(dx, dy, collisionMap) {
    if (!this.isCollision(dx, dy, collisionMap)) {
      window.map.move(dx, dy); // 移动背景图
    }
  }

  isCollision(dx, dy, collisionMap) {
    const playerCenterX = map.image.width / 2;
    const playerCenterY = map.image.height / 2;

    const offsetX = window.map.offsetX;
    const offsetY = window.map.offsetY;

    const newX = Math.floor(playerCenterX + offsetX + dx);
    const newY = Math.floor(playerCenterY + offsetY + dy);

    // 碰撞检测
    if (collisionMap[newY][newX] === 1) {
      return true; // 碰撞检测
    }

    return false;
  }

  updateImage(direction) {
    switch (direction) {
      case "up":
        this.image.src = "../minigame/maze/img/player/up.png";
        break;
      case "down":
        this.image.src = "../minigame/maze/img/player/down.png";
        break;
      case "left":
        this.image.src = "../minigame/maze/img/player/left.png";
        break;
      case "right":
        this.image.src = "../minigame/maze/img/player/right.png";
        break;
      default:
        this.image.src = "../img/charactor/main_character.jpg";
    }
  }

  show(collisionMap) {
    const playerCenterX = map.image.width / 2;
    const playerCenterY = map.image.height / 2;

    const offsetX = window.map.offsetX;
    const offsetY = window.map.offsetY;

    const interactX = Math.floor(playerCenterX + offsetX);
    const interactY = Math.floor(playerCenterY + offsetY);

    // 检测是否有物品
    if (collisionMap[interactY][interactX] === 4) {
      this.showMessage("你现在还不可以进去");
      collisionMap[interactY][interactX] = 0;
    }
  }

  interact(collisionMap) {
    const playerCenterX = map.image.width / 2;
    const playerCenterY = map.image.height / 2;

    const offsetX = window.map.offsetX;
    const offsetY = window.map.offsetY;

    const interactX = Math.floor(playerCenterX + offsetX);
    const interactY = Math.floor(playerCenterY + offsetY);

    // 检测是否有物品
    if (collisionMap[interactY][interactX] === 2) {
      this.fadeOutAndRedirect();
      collisionMap[interactY][interactX] = 0;
    }

    if (collisionMap[interactY][interactX] === 3) {
      this.showMessage("你修复了一处结构！");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 5) {
      const dialogues = ["请去修复梦境吧！"];
      let currentDialogue = 0;
      let charIndex = 0;
      const typingSpeed = 50; // 每个字符的打印速度（毫秒）

      const dialogBox = document.createElement("div");
      dialogBox.style.position = "fixed";
      dialogBox.style.bottom = "10%";
      dialogBox.style.left = "50%";
      dialogBox.style.transform = "translateX(-50%)";
      dialogBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      dialogBox.style.color = "white";
      dialogBox.style.padding = "10px";
      dialogBox.style.borderRadius = "5px";
      dialogBox.style.zIndex = "1000";

      const dialogText = document.createElement("p");
      dialogBox.appendChild(dialogText);
      document.body.appendChild(dialogBox);

      function typeDialogue() {
        if (charIndex < dialogues[currentDialogue].length) {
          dialogText.innerText += dialogues[currentDialogue].charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          currentDialogue++;
          charIndex = 0;
        }
      }

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          dialogText.innerText = "";
          typeDialogue();
        } else {
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      dialogBox.addEventListener("click", showNextDialogue);
      showNextDialogue();

      collisionMap[interactY][interactX] = 0;
    }
  }

  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../html/chapter0.html";
    }, 1000); // 等待1秒以完成淡出效果
  }

  showMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.id = "message";
    messageElement.style.position = "absolute";
    messageElement.style.top = "20px";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translateX(-50%)";
    messageElement.style.background = "rgba(0, 0, 0, 0.7)";
    messageElement.style.color = "white";
    messageElement.style.padding = "10px 20px";
    messageElement.style.borderRadius = "5px";
    messageElement.style.opacity = 1;
    messageElement.style.transition = "opacity 1s ease-out";
    messageElement.innerText = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 1000); // 等待1秒以完成淡出效果
    }, 2000); // 2秒后开始淡出
  }
}

const player = new Player();
window.player = player;
