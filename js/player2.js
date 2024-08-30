class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/莱拉1/down0.png";
    this.width = 32;
    this.height = 52;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
    this.frameIndex = 0; // 当前帧索引
    this.frameDelay = 0; // 帧间隔计时器
    this.frameInterval = 15; // 每隔多少次update切换一次帧
    this.direction = "down"; // 默认方向
    // 预加载所有的帧图像
    this.images = {
      up: [],
      down: [],
      left: [],
      right: []
    };
    for (let i = 0; i < 4; i++) {
      this.images.up[i] = new Image();
      this.images.up[i].src = `../img/charactor/莱拉1/up${i}.png`;
      this.images.down[i] = new Image();
      this.images.down[i].src = `../img/charactor/莱拉1/down${i}.png`;
      this.images.left[i] = new Image();
      this.images.left[i].src = `../img/charactor/莱拉1/left${i}.png`;
      this.images.right[i] = new Image();
      this.images.right[i].src = `../img/charactor/莱拉1/right${i}.png`;
    }
    this.image = this.images.down[0]; // 初始图像
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(dx, dy, collisionMap) {
    if (!this.isCollision(dx, dy, collisionMap)) {
      window.map.move(dx, dy); // 移动背景图
    }
  }

  updateAdjacentPieces(x, y) {
    // 检查边界条件
    if (
      x < 0 ||
      y < 0 ||
      x >= collisionMap[0].length ||
      y >= collisionMap.length
    ) {
      return;
    }

    // 如果当前位置是3，则将其更新为100
    if (collisionMap[y][x] === 3 || collisionMap[y][x] === 6) {
      collisionMap[y][x] = 100;

      // 递归更新相邻的格子
      this.updateAdjacentPieces(x + 1, y);
      this.updateAdjacentPieces(x - 1, y);
      this.updateAdjacentPieces(x, y + 1);
      this.updateAdjacentPieces(x, y - 1);
    } else {
      return;
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
    if (this.direction !== direction) {
      this.direction = direction;
      this.frameIndex = 0;
      this.frameDelay = 0;
    }
  
    // 每次调用 updateImage 函数时增加帧间隔计时器
    this.frameDelay++;
  
    // 如果帧间隔计时器达到指定的帧间隔，就更新帧索引
    if (this.frameDelay >= this.frameInterval) {
      this.frameDelay = 0;
      this.frameIndex = (this.frameIndex + 1) % 4; // 循环切换四帧
    }
  
    this.image = this.images[direction][this.frameIndex];
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
        {
          text: "he",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "（???!!!）",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "对，莱拉...欢迎来到alpha幻境...sigh...我曾经也跟你一样，正如你的心自由的听从你的意识，我也...",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "（闭口不语）",
          image: "../img/conversation/精灵/精灵.png",
        },
        {
          text: "（试探性）先生？",
          image: "../img/conversation/精灵/精灵.png",
        },
        {
          text: "去找布谷钟吧...莱拉，把握住...咳，沦为囚徒...难道囚禁是我的宿命吗...",
          image: "../img/conversation/精灵/精灵.png",
        } ,       
        {
          text: "（着急）把握住什么？先生？先生？",
          image: "../img/conversation/精灵/精灵.png",
        },
        {
          text: "（幽灵缓缓闭上眼，若有若无的身躯似乎比之前散发出更多的寒意。看样子不会再跟你多说些什么了。）",
          image: "../img/conversation/精灵/精灵.png",
        }
      ];      
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 6) {
      const dialogues = [
        "最终，莱拉和艾德里安成功突破梦境层层防御，获取了关于神秘组织的更多信息。",
        "他们发现，这个组织并不仅仅在追求财富或权力，而是在试图掌控人类的集体潜意识，以改变世界的未来。",
        "与此同时，一切似乎都奇怪了起来 ...... "
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
  }

  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../minigame/2choice-jump-zhaobutong/index.html";
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

function createDialogueBox(dialogues) {
  let currentDialogue = 0;
  let charIndex = 0;
  const typingSpeed = 50; // 每个字符的打印速度（毫秒）

  // 添加CSS样式
  if (!document.getElementById("dialogue-style")) {
    const style = document.createElement("style");
    style.id = "dialogue-style";
    style.innerHTML = `
      #dialogue {
          background: rgba(0, 0, 0, 0.7);
          padding: 20px;
          border-radius: 10px;
          width: 80%;
          height: 100px;
          text-align: center;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
      }
      #dialogue img {
          position: absolute;
          top: -100px;
          left: 10px;
          width: 100px;
          height: 100px;
      }`;
    document.head.appendChild(style);
  }

  // 创建对话框元素
  const dialogBox = document.createElement("div");
  dialogBox.id = "dialogue";

  // 创建图片元素
  const charImage = document.createElement("img");
  charImage.alt = "Character Image";
  dialogBox.appendChild(charImage);

  // 创建对话文本元素
  const dialogText = document.createElement("span");
  dialogText.id = "dialogueText";
  dialogBox.appendChild(dialogText);
  document.body.appendChild(dialogBox);

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
      // 更新图片和文本内容
      charImage.src = dialogues[currentDialogue].image;
      dialogText.innerText = "";
      typeDialogue();
    } else {
      document.body.removeChild(dialogBox);
      document.getElementById("gameCanvas").style.display = "block";
      requestAnimationFrame(mainLoop); // 继续游戏主循环
    }
  }

  dialogBox.addEventListener("click", showNextDialogue);
  showNextDialogue();
}
