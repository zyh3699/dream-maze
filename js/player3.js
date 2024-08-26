class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/莱拉/laila down.png";
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
        this.image.src = "../img/charactor/莱拉/laila up.png";
        break;
      case "down":
        this.image.src = "../img/charactor/莱拉/laila down.png";
        break;
      case "left":
        this.image.src = "../img/charactor/莱拉/laila left.png";
        break;
      case "right":
        this.image.src = "../img/charactor/莱拉/laila right.png";
        break;
      default:
        this.image.src = "../img/charactor/莱拉/laila down.png";
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
      this.showMessage("这里怎么有个骷髅");
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
            this.showMessage("你捡到了一个物品！");
            collisionMap[interactY][interactX] = 0;
        }
        if (collisionMap[interactY][interactX] === 5) {
          const dialogues = [
            "经过层层梦境的探查，莱拉终于在一个极其隐秘的梦境层中找到了卡尔。",
            "他被困在一个由组织设计的特殊梦境中，这个梦境层与之前的所有梦境都截然不同：",
            "它看似平静祥和，但隐藏着极为危险的心灵陷阱。",
          ];
          let currentDialogue = 0;
          let charIndex = 0;
          const typingSpeed = 50; // 每个字符的打印速度（毫秒）

          // 添加CSS样式
          const style = document.createElement("style");
          style.innerHTML = `
        #dialogue {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            width: 80%; /* 设置为80%宽度 */
            height: 100px; /* 固定高度 */
            text-align: center;
            position: fixed; /* 固定位置 */
            bottom: 20px; /* 固定在底部 */
            left: 50%; /* 水平居中 */
            transform: translateX(-50%); /* 水平居中 */
            margin: 0; /* 移除水平居中 */
            color: white; /* 字体颜色 */
            font-size: 24px; /* 字体大小 */
            display: flex;
            justify-content: center;
            align-items: center; /* 垂直居中 */
            box-sizing: border-box;
        }
    #dialogue img {
      position: absolute; /* 绝对定位 */
      top: -100px; /* 距离顶部10px */
      left: 10px; /* 距离左侧10px */
      width: 100px; /* 图片宽度 */
      height: 100px; /* 图片高度 */
    }
    `;
          document.head.appendChild(style);

          // 创建对话框元素
          const dialogBox = document.createElement("div");
          dialogBox.id = "dialogue";

          // 插入莱拉的图片
          const lailaImage = document.createElement("img");
          lailaImage.src = "../img/charactor/莱拉/laila down.png";
          lailaImage.alt = "Image Description";
          dialogBox.appendChild(lailaImage);

          // 创建对话文本元素
          const dialogText = document.createElement("span");
          dialogText.id = "dialogueText";
          dialogBox.appendChild(dialogText);
          document.body.appendChild(dialogBox);

          function typeDialogue() {
            if (charIndex < dialogues[currentDialogue].length) {
              dialogText.innerText +=
                dialogues[currentDialogue].charAt(charIndex);
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
      window.location.href = "../minigame/minigame4-wuziqi/index4.html";
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
