class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/莱拉/laila down.png";
    this.width = 32;
    this.height = 66;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
    this.puzzle = 0;
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
    if (collisionMap[newY][newX] === 1 ) {
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

  // 定义一个递归函数来更新相邻的格子
  updateAdjacentPieces(x, y) {
    // 检查边界条件
    if (x < 0 || y < 0 || x >= collisionMap[0].length || y >= collisionMap.length) {
      return;
    }

    // 如果当前位置是3，则将其更新为100
    if (collisionMap[y][x] === 3||collisionMap[y][x] === 6) {
      collisionMap[y][x] = 100;

      // 递归更新相邻的格子
      this.updateAdjacentPieces(x + 1, y);
      this.updateAdjacentPieces(x - 1, y);
      this.updateAdjacentPieces(x, y + 1);
      this.updateAdjacentPieces(x, y - 1);
    }
    else { return; }
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
      if (this.puzzle === 16) {
        this.fadeOutAndRedirect();
      }
      else {
        this.showMessage("你还没有找到全部碎片，请继续寻找吧！");
      }
    }
 
    if (collisionMap[interactY][interactX] === 3) {
      if (this.puzzle < 16) {
        this.puzzle += 4;
        this.showMessage(`你收集了碎片（${this.puzzle}/16）`);
        if (this.puzzle === 16) {
          setTimeout(() => {
            this.showMessage("你已集齐了碎片，请去修复它们吧！");
          }, 4000); // 延迟2秒显示消息
        }
        this.updateAdjacentPieces(interactX, interactY);
      }
    }
    // if (collisionMap[interactY][interactX] === 6) {
    //   this.showMessage("你捡到了4块拼图，一共有16块！");
     
    // }
    if (collisionMap[interactY][interactX] === 6) {
      const dialogues = [
        {
          text: "这地方让我有种不祥的预感，艾德里安。你确定文件就在这里？",
          image: "../img/charactor/莱拉/laila down.png", // 对应的图片路径
        },
        {
          text: "根据我们的线索，梦境的深处藏着答案。我们必须保持警惕，这位企业家的潜意识比我们想象的要复杂得多。",
          image: "../img/charactor/艾德里安/Wizard down.png", // 另一张图片
        },
        {
          text: "莱拉和艾德里安在城市的迷宫中穿行，高楼大厦上闪烁的电子屏幕播放着梦境主人的记忆片段，像一张巨大的拼图等待解开。",
          image: "../img/charactor/精灵/Dwarf.png", // 精灵        
        },
        {
          text: "这些画面……是他过去的片段？每一个都透露出他的某种心情和意图。",
          image: "../img/charactor/莱拉/laila down.png", // 另一张图片
        },
        {
          text: "是的。我们必须把这些碎片拼接起来，才能找到他想隐藏的秘密。",
          image: "../img/charactor/艾德里安/Wizard down.png", // 另一张图片
        }
        
      ];
      let currentDialogue = 0;
      let charIndex = 0;
      const typingSpeed = 50; // 每个字符的打印速度（毫秒）

      // 添加CSS样式
      const style = document.createElement("style");
      document.head.appendChild(style);

      // 创建对话框元素
      const dialogBox = document.createElement("div");
      dialogBox.id = "dialogue";

      // 插入莱拉的图片
      const lailaImage = document.createElement("img");
      lailaImage.style.width = "100px"; // 将宽度设置为200像素
      lailaImage.style.height = "auto"; // 自动调整高度以保持图片比例
      dialogBox.appendChild(lailaImage);

      // 创建对话文本元素
      const dialogText = document.createElement("span");
      dialogText.id = "dialogueText";
      dialogBox.appendChild(dialogText);
      document.body.appendChild(dialogBox);
      dialogText.style.fontFamily = "Arial, sans-serif"; // 字体
      dialogText.style.fontSize = "20px"; // 字体大小
      dialogText.style.color = "#FFFFFF"; // 字体颜色
      dialogText.style.textShadow = "2px 2px 4px #000000"; // 文本阴影
      dialogText.style.lineHeight = "1.5"; // 行高
      function typeDialogue() {
        
        if (charIndex < dialogues[currentDialogue].text.length) {
          dialogText.innerText += dialogues[currentDialogue].text.charAt(charIndex);
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
          lailaImage.src = dialogues[currentDialogue].image;
          typeDialogue();
        } else {
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      dialogBox.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
    }
  }

  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../minigame/puzzle/try.html";
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
