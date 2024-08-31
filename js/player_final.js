class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/莱拉/laila down.png";
    this.width = 32;
    this.height = 66;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
    this.frameIndex = 0; // 当前帧索引
    this.frameDelay = 0; // 帧间隔计时器
    this.frameInterval = 150; // 每隔多少次update切换一次帧
    this.direction = "down"; // 默认方向
    this.map = 0;
    this.visit = 0;
    this.read = 0;
    this.bug = 0;
    this.check1 = 0;
    this.check2 = 0;
    this.check3 = 0;
    this.isconversation = 0;

    // 预加载所有的帧图像
    this.images = {
      up: [],
      down: [],
      left: [],
      right: [],
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
    if (
      collisionMap[y][x] === 5 ||
      collisionMap[y][x] === 6 ||
      collisionMap[y][x] === 10 ||
      collisionMap[y][x] === 11 ||
      collisionMap[y][x] === 3 ||
      collisionMap[y][x] === 12 ||
      collisionMap[y][x] === 4
    ) {
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
      const dialogues = [
        {
          text: "meng境@...*现实...&难以分辨...",
          image: "../img/conversation/精灵/精灵.png", // 对应的图片路径
        },
        {
          text: "你^^们...*能够...&分bian...*吗？",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "快#看***《。背包",
          image: "../img/conversation/精灵/精灵.png", // 精灵
        },
        {
          text: "要是不小心回@@了现ssd’实",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "重新刷**新界￥面进入...可能又能}回到梦境了",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "记住...一定@要回：到梦境你才能￥%……操控时间...",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "多+……#试几次...你一定（（能够&s进dh#入梦境的",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "按P刷新梦境...",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
      ];
      let currentDialogue = 0;
      let charIndex = 0;
      const typingSpeed = 1; // 每个字符的打印速度（毫秒）

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
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          currentDialogue++;
          charIndex = 0;
        }
      }

      const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isconversation = 1;
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          typeDialogue();
        } else {
          self.isconversation = 0;
          if (self.check3 == 0) { 
            self.check3 = 1;
            self.bug += 1;
          }
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
    }
    if (collisionMap[interactY][interactX] === 6) {
      const dialogues = [
        {
          text: "为什么，我还是找不到进去的方法...",
          image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
        },
        {
          text: "我明明记得就是这扇门了，在进入阿尔法梦境核心之前我还可以走到里面去的...",
          image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
        },
        {
          text: "现在它好像完全被堵死了，难道真的没有别的办法了吗",
          image: "../img/conversation/莱拉/莱拉.png", // 精灵
        },
        {
          text: "去你的菜单看一下吧，不要这么着急",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "你真的了解时光回溯机制了吗...去地图中各个地方找到更多的信息吧，它们极为关键！",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "对了，你也不用担心信息找不全。梦境的随机信息非常多，只要你用心探索一定能够发现对你有用的线索",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
      ];
      let currentDialogue = 0;
      let charIndex = 0;
      const typingSpeed = 1; // 每个字符的打印速度（毫秒）

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
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          currentDialogue++;
          charIndex = 0;
        }
      }

      const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isconversation = 1;
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          typeDialogue();
        } else {
          self.isconversation = 0;
          if (self.check1 == 0) {
            self.check1 = 1;
            self.bug += 1;
          }
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
    }
    if (collisionMap[interactY][interactX] === 3) {
      const dialogues = [
        {
          text: "你#发现.@.法！！...的/密*了吗？",
          image: "../img/conversation/精灵/精灵.png", // 对应的图片路径
        },
        {
          text: "好像..?在%-之中...可以随意**时间...",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "也就c#&fd说，要...是你fh发现当前梦*有地方你×进去，你-以'过..溯时间回到你过去能够进去的时候",
          image: "../img/conversation/精灵/精灵.png", // 精灵
        },
        {
          text: "我想[$说的|.,*够多了...",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
      ];
      let currentDialogue = 0;
      let charIndex = 0;
      const typingSpeed = 1; // 每个字符的打印速度（毫秒）

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
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          currentDialogue++;
          charIndex = 0;
        }
      }

      const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isconversation = 1;
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          typeDialogue();
        } else {
          self.isconversation = 0;
          if (self.check2 == 0) { 
            self.check2 = 1;
            self.bug += 1;
          }
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
    }
    if (collisionMap[interactY][interactX] === 5&&this.read==0) {
      const dialogues = [
        {
          text: "莱拉，我们好像真的没有办法分清这个梦境和现实了...",
          image: "../img/conversation/卡尔/Elliott.png", // 对应的图片路径
        },
        {
          text: "阿尔法梦境就好像是现实的一个镜像",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "这里的任何东西都是现实的映射",
          image: "../img/conversation/卡尔/Elliott.png", // 精灵
        },
        {
          text: "我想唯一的办法就是...去使用我们随身携带的那个判断是否在梦境里的工具",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "没记错的话，它就在我的背包里...",
          image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
        },
        {
          text: "对了莱拉，你记得那扇门吗？在我们进入核心之前，它说我们还没有办法进去",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "那里应该就是我们通往真相最终的出口了",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "多留心，莱拉，我发现这里会随机刷新梦境信息，四处都可能有线索",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "现在我们在最深层了，所以这些梦境信息可能无法解析，部分内容我们无法查看了",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
      ];
      let currentDialogue = 0;
      let charIndex = 0;
      const typingSpeed = 1; // 每个字符的打印速度（毫秒）

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
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          currentDialogue++;
          charIndex = 0;
        }
      }

      const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isconversation = 1;
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          typeDialogue();
        } else {
          self.isconversation = 0;
          self.read = 1;
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
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
    if (collisionMap[interactY][interactX] === 2&&window.map.status==1) {
      this.fadeOutAndRedirect();
      collisionMap[interactY][interactX] = 0;
    }

  }

  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../html/ending.html";
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
