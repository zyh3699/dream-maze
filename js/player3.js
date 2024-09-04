class Player {
  constructor() {
    this.isconversation=0;
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
    this.dialogAde=0;
    this.dialogKarl=0;
    this.dialogFish=0;
    this.dialogGhost=0;
    this.sound=0;
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

  showPasswordModal() {
    // 创建一个容器来放置输入框和按钮
    this.isconversation=1;
    self.isconversation = 1;
    player.isconversation = 1;
    Player.isconversation = 1;
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.textAlign = 'center';

    // 创建输入框
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = '请输入密码';
    passwordInput.style.marginBottom = '10px';
    passwordInput.style.padding = '8px';
    passwordInput.style.display = 'block';
    passwordInput.style.width = '100%';

    // 创建错误提示
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.display = 'none';  // 默认隐藏

    // 创建提交按钮
    const submitButton = document.createElement('button');
    submitButton.textContent = '提交';
    submitButton.style.marginRight = '10px';

    // 创建取消按钮
    const cancelButton = document.createElement('button');
    cancelButton.textContent = '取消';

    // 提交按钮点击事件
    submitButton.onclick = () => {
      this.isconversation=0;
      self.isconversation = 0;
      player.isconversation = 0;
      Player.isconversation = 0;  
        if (passwordInput.value === 'right') {
          document.getElementById('ade').style.textDecoration = 'line-through';
          document.getElementById('star').style.display = 'block';
          const dialogues = [
            {
              text: "艾德里安，你曾也是个有志气的巫师。这个组织曾也是个...",
              image: "../img/conversation/莱拉/莱拉.png",
            },  
            {
              text: "（冷静）你说错了。我是组织的核心成员之一。我多年前就和他们签订了协议，利用他们的资源进行梦境技术的研究。我的目标？很简单，通过掌控梦境和潜意识，创造一个更理想的世界。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            },  
            {
              text: "（插嘴）但你早就和组织的目标分道扬镳了，不是吗？你想利用我们达到自己的野心。",
              image: "../img/conversation/莱拉/莱拉.png",
            }, 
            {
              text: "（狡黠地笑）你们说的没错。阿尔法梦境的技术是一把双刃剑，它可以控制他人，也可以将我困住。所以，我需要你们来帮我达成我的目标。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            }, 
            {
              text: "（坚定地）我们不会让你得逞的，艾德里安。我们会阻止你，阻止组织的所有阴谋！",
              image: "../img/conversation/莱拉/莱拉.png",
            }, 
            {
              text: "（耸肩，冷笑）好吧，那就看看你们有多少本事吧。欢迎来到我的游戏——心灵对弈。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            }, 
            {
              text: "为了阻止这场灾难，莱拉和卡尔决定联手，破坏阿尔法梦境的核心。这个核心位于一个极其危险且复杂的梦境结构中，充满了各种心理陷阱和防御机制。玩家将参与一场激烈的心理战——“心灵对弈”。",
              image: "../img/conversation/精灵/精灵.png",
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
            self.isconversation = 1;
            this.isconversation=1;
            self.isconversation = 1;
            player.isconversation = 1;
            Player.isconversation = 1;        
            if (currentDialogue < dialogues.length) {
              dialogText.innerText = "";
              lailaImage.src = dialogues[currentDialogue].image;
              typeDialogue();
            } else {
              // 
              this.isconversation=0;
              self.isconversation = 0;
              player.isconversation = 0;
              Player.isconversation = 0;          
              const bodyElement = document.body;
              bodyElement.style.transition = "opacity 1s ease-out";
              bodyElement.style.opacity = 0;
              setTimeout(() => {
                window.location.href = "../minigame/wuziqi/index4.html";
              }, 1000); // 等待1秒以完成淡出效果    
// 
              self.isconversation = 0;
              document.body.removeChild(dialogBox);
              document.getElementById("gameCanvas").style.display = "block";
              requestAnimationFrame(mainLoop);
            }
          }
        
          document.addEventListener("click", showNextDialogue);
          showNextDialogue();


        } else {
          this.isconversation=0;
          self.isconversation = 0;
          player.isconversation = 0;
          Player.isconversation = 0;      
            errorMessage.textContent = '暗号错误，艾德里安奇怪的看了你一眼。';
            errorMessage.style.display = 'block';  // 显示错误提示
        }
    };

    // 取消按钮点击事件
    cancelButton.onclick = () => {
      self.isconversation = 0;
      player.isconversation = 0;
      Player.isconversation = 0;  
        container.remove(); // 移除输入框和按钮
    };

    // 将元素添加到容器中
    container.appendChild(passwordInput);
    container.appendChild(submitButton);
    container.appendChild(cancelButton);
    container.appendChild(errorMessage);

    // 将容器添加到页面中
    document.body.appendChild(container);
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
    if (collisionMap[interactY][interactX] === 7) {
      this.showMessage("这就是legend fish？传说之鱼，行于地，栖于冥。Sigh ... 好危险 ... 它会说话？按E试试 ");
      
    }
    if (collisionMap[interactY][interactX] === 6) {
      this.showMessage("致幻蘑菇：当然可以食用了！现实里，一生你只有一次机会吃掉它，但是在这里，谁知道呢？");
      
    }
    if (collisionMap[interactY][interactX] === 9) {
      this.showMessage("小恐龙吗？从来没有见过，看起来好可爱呀...（^pet^pet^）啊！怎么会喷火？？？");
      
    }
    if (collisionMap[interactY][interactX] === 10) {
      this.showMessage("宝藏箱：Pirate of Caribbean. 身为被诅咒之人，你似乎无法触碰到它。但是还是恭喜你找到宝藏。");
      document.getElementById('mapp').style.textDecoration = 'line-through';
    }
    if (collisionMap[interactY][interactX] === 8) {
      this.showMessage("Ghost: ～你要跟我对话吗～o.o.o.");
      
    }    
    if (collisionMap[interactY][interactX] === 14) {
      this.showMessage("这边好像过不去哎");
      
    }    
    if (collisionMap[interactY][interactX] === 13) {
      this.showMessage("那边有条...鱼？在陆地上的鱼？快去看看...");
      
    }    
    if (collisionMap[interactY][interactX] === 18) {
      this.showMessage("你听到了一阵熟悉的声音，按E查看");
      
    }    
    if (collisionMap[interactY][interactX] === 11) {
      this.showMessage("空气中传来一声冷笑，像是艾德里安的声音");
      
    }
    if (collisionMap[interactY][interactX] === 19) {
      this.showMessage("你一脚踏空，但是低头却发现自己踩在地上，周围肯定有蹊跷");
      
    }

  }

  interact(collisionMap) {
    const playerCenterX = map.image.width / 2;
    const playerCenterY = map.image.height / 2;

    const offsetX = window.map.offsetX;
    const offsetY = window.map.offsetY;

    const interactX = Math.floor(playerCenterX + offsetX);
    const interactY = Math.floor(playerCenterY + offsetY);

    if (collisionMap[interactY][interactX] === 2 && this.dialogAde===0 && this.dialogKarl===0) {
      document.getElementById('carl').style.display = 'block';
      const dialogues = [
        {
          text: "莱拉?",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
        {
          text: "(冷笑)你不是应该在找卡尔吗？",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
        {
          text: "你在这里干什么？",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
        {
          text: "（虚伪）我等着你们",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 2 && this.dialogAde===0 && this.dialogKarl===1) {
      this.dialogAde=1;
      const dialogues = [
        {
          text: "（冷冷地）莱拉，卡尔，你们可真是让我刮目相看。居然能找到这里来。不过，你们真的以为能轻易阻止这一切吗？",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
        {
          text: "（警惕地）艾德里安……你怎么会在这里？",
          image: "../img/conversation/莱拉/莱拉4.png",
        },  
        {
          text: "哦，莱拉，我当然会在这里。这里的一切都是我的设计。我就是这个梦境的主人。",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
        {
          text: "你到底是谁？你真正的目的是什么？",
          image: "../img/conversation/莱拉/莱拉.png",
          options: ["说出组织暗号->", "无话可说->"], // 添加选项
        }, 
      ];
      const choiceDialogues = {
        cooperate: [
          {
            text: "艾德里安，你知道这串数字意味着什么吗？",
            image: "../img/conversation/莱拉/莱拉.png",
          },
            ],
        abandon: [
          {
            text: "你不该这样做......",
            image: "../img/conversation/莱拉/莱拉3.png", // 另一张图片
          },
          {
            text: "我们不会让你得逞的，艾德里安。我们会阻止你，阻止组织的所有阴谋！",
            image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
          },
          {
            text: "无知的人类",
            image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
          },
        ],
      };

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
      // 创建对s话文本元素
      const dialogText = document.createElement("span");
      dialogText.id = "dialogueText";
      dialogBox.appendChild(dialogText);
      document.body.appendChild(dialogBox);
      dialogText.style.fontFamily = "Arial, sans-serif"; // 字体
      dialogText.style.fontSize = "20px"; // 字体大小
      dialogText.style.color = "#FFFFFF"; // 字体颜色
      dialogText.style.textShadow = "2px 2px 4px #000000"; // 文本阴影
      dialogText.style.lineHeight = "1.5"; // 行高
      // 创建选项按钮容器
      const optionsContainer = document.createElement("div");
      optionsContainer.id = "options";
      dialogBox.appendChild(optionsContainer);
      function typeDialogue() {
        if (charIndex < dialogues[currentDialogue].text.length) {
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          if (dialogues[currentDialogue].options) {
            showOptions(dialogues[currentDialogue].options);
            charIndex = -1;
          } else {
            currentDialogue++;
            charIndex = 0;
          }
        }
      }
      const self = this;
      function showNextDialogue() {
        self.isconversation = 1;
        player.isconversation=1;
        Player.isconversation=1;  
        if (currentDialogue < dialogues.length) {
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          optionsContainer.innerHTML = ""; // 清空选项按钮
          typeDialogue();
        } else {
          self.isconversation = 0;
          player.isconversation=0;
          Player.isconversation=0;    
          document.body.removeChild(dialogBox);
          // self.showPasswordModal();
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }
      function showOptions(options) {
        options.forEach((option) => {
          const button = document.createElement("div"); // 使用 div 而不是 button
          button.className = "option-text";
          button.innerText = option;
          button.style.cursor = "pointer"; // 鼠标悬停时显示为指针
          button.style.margin = "10px 0"; // 上下间距
          button.style.color = "#FFFFFF"; // 字体颜色设置为白色
          button.style.fontSize = "24px"; // 字体大小
          button.style.fontFamily = "Arial, sans-serif"; // 字体设置为 Arial
          button.style.textShadow = "1px 1px 2px #000000"; // 添加文本阴影
          button.style.transition = "background-color 0.3s, color 0.3s"; // 添加过渡效果

          // 添加鼠标悬停效果
          button.onmouseover = () => {
            button.style.backgroundColor = "#444444"; // 鼠标悬停时的背景色
            button.style.color = "#FFD700"; // 鼠标悬停时的字体颜色
          };
          button.onmouseout = () => {
            button.style.backgroundColor = ""; // 恢复原背景色
            button.style.color = "#FFFFFF"; // 恢复原字体颜色
          };

          button.onclick = () => handleOption(option);
          optionsContainer.appendChild(button);
        });
      }

      function handleOption(option) {
        if (option === "说出组织暗号->") {
          dialogues.push(...choiceDialogues.cooperate);
          // player.move(-200,0,collisionMap);
          document.addEventListener("click", self.showPasswordModal());
        } else if (option === "无话可说->") {
          dialogues.push(...choiceDialogues.abandon);
        }
        currentDialogue++;          
        showNextDialogue();
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();
          collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 2 && this.dialogAde===1) {
      const dialogues = [
        {
          text: "（冷笑）莱拉，你又来干什么",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },  
        {
          text: "艾德里安……我知道你的目的...",
          image: "../img/conversation/莱拉/莱拉.png",
          options: ["说出组织暗号->", "无话可说->"], // 添加选项
        },  
      ];
      const choiceDialogues = {
        cooperate: [
          {
            text: "艾德里安，你知道这串数字意味着什么吗？",
            image: "../img/conversation/莱拉/莱拉.png",
          },
            ],
        abandon: [
          {
            text: "你不该这样做......",
            image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
          },
          {
            text: "我们不会让你得逞的，艾德里安。我们会阻止你，阻止组织的所有阴谋！",
            image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
          },
          {
            text: "无知的人类",
            image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
          },
        ],
      };

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
      // 创建对s话文本元素
      const dialogText = document.createElement("span");
      dialogText.id = "dialogueText";
      dialogBox.appendChild(dialogText);
      document.body.appendChild(dialogBox);
      dialogText.style.fontFamily = "Arial, sans-serif"; // 字体
      dialogText.style.fontSize = "20px"; // 字体大小
      dialogText.style.color = "#FFFFFF"; // 字体颜色
      dialogText.style.textShadow = "2px 2px 4px #000000"; // 文本阴影
      dialogText.style.lineHeight = "1.5"; // 行高
      // 创建选项按钮容器
      const optionsContainer = document.createElement("div");
      optionsContainer.id = "options";
      dialogBox.appendChild(optionsContainer);
      function typeDialogue() {
        if (charIndex < dialogues[currentDialogue].text.length) {
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          if (dialogues[currentDialogue].options) {
            showOptions(dialogues[currentDialogue].options);
            charIndex = -1;
          } else {
            currentDialogue++;
            charIndex = 0;
          }
        }
      }
      const self = this;
      function showNextDialogue() {
        self.isconversation = 1;
        player.isconversation=1;
        Player.isconversation=1;  
        if (currentDialogue < dialogues.length) {
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          optionsContainer.innerHTML = ""; // 清空选项按钮
          typeDialogue();
        } else {
          self.isconversation = 0;
          player.isconversation=0;
          Player.isconversation=0;    
          document.body.removeChild(dialogBox);
          // self.showPasswordModal();
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }
      function showOptions(options) {
        options.forEach((option) => {
          const button = document.createElement("div"); // 使用 div 而不是 button
          button.className = "option-text";
          button.innerText = option;
          button.style.cursor = "pointer"; // 鼠标悬停时显示为指针
          button.style.margin = "10px 0"; // 上下间距
          button.style.color = "#FFFFFF"; // 字体颜色设置为白色
          button.style.fontSize = "24px"; // 字体大小
          button.style.fontFamily = "Arial, sans-serif"; // 字体设置为 Arial
          button.style.textShadow = "1px 1px 2px #000000"; // 添加文本阴影
          button.style.transition = "background-color 0.3s, color 0.3s"; // 添加过渡效果

          // 添加鼠标悬停效果
          button.onmouseover = () => {
            button.style.backgroundColor = "#444444"; // 鼠标悬停时的背景色
            button.style.color = "#FFD700"; // 鼠标悬停时的字体颜色
          };
          button.onmouseout = () => {
            button.style.backgroundColor = ""; // 恢复原背景色
            button.style.color = "#FFFFFF"; // 恢复原字体颜色
          };

          button.onclick = () => handleOption(option);
          optionsContainer.appendChild(button);
        });
      }

      function handleOption(option) {
        if (option === "说出组织暗号->") {
          dialogues.push(...choiceDialogues.cooperate);
          // player.move(-200,0,collisionMap);
          document.addEventListener("click", self.showPasswordModal());
        } else if (option === "无话可说->") {
          dialogues.push(...choiceDialogues.abandon);
        }
        if (option === "好->") { 
          dialogues.push(...choiceDialogues.cooperate);
        }
        currentDialogue++;          
        showNextDialogue();
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();
          collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 3) {
      this.showMessage("你捡到了一个物品！");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 16 && this.dialogFish===0) {
      document.getElementById('fazhen').style.display = 'block';
      document.getElementById('fish').style.textDecoration = 'line-through';

      this.dialogFish=1;
      const dialogues = [
        {
          text: "你就是莱拉？",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "向我许个愿望吧，尽快，孩子。你的愿望会引领你到达光明之岸。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "（心存诸多疑虑，但你不得不快速许了一个愿望）我想拯救alpha梦境。",
          image: "../img/conversation/莱拉/莱拉3.png",
        },  
        {
          text: "现在，从我右边那个柱子正右侧开始，往下走到底（注意不要拐弯，不是说地图的底部，走到树能卡住你的地方就可以），再向右走一小步，你就会走到虚空法阵里。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "在虚空法阵，你可以传送到一个神秘的岛屿上。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "神秘组织？不过沧海一粟。长老说过，任何背叛alpha...咳咳，话多了。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "嗯...",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
        {
          text: "按照传说之鱼的说法，去虚空法阵，按E实现传送。",
          image: "../img/conversation/精灵/精灵.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 16 && this.dialogFish===1) {
      const dialogues = [
        {
          text: "莱拉，你忘记了吗。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "从我右边那个柱子正右侧开始，往下走到底（注意不要拐弯，不是说地图的底部，走到树能卡住你的地方就可以），再向右走一小步，你就会走到虚空法阵里。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "在虚空法阵，你可以传送到一个神秘的岛屿上。",
          image: "../img/conversation/其他人物/fish.png",
        },  
        {
          text: "嗯...",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 15 && this.sound===0) {
      document.getElementById('carl').style.display = 'block';
      this.sound=1;
      const dialogues = [
        {
          text: "（喃喃自语）卡尔……你到底在哪儿？这里的一切看起来太真实了，但我知道它们都是假的。",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
        {
          text: "（低声）莱拉，别走太远……这里的每一步都可能是陷阱。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "卡尔？？？卡尔一定在附近！",
          image: "../img/conversation/莱拉/莱拉3.png",
        },  
        {
          text: "探索这个地图，找到卡尔吧！",
          image: "../img/conversation/精灵/精灵.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 15 && this.sound===1) {
      const dialogues = [
        {
          text: "啊，这个地方是我们当时说话的残影...",
          image: "../img/conversation/莱拉/莱拉3.png",
        },  
        {
          text: "不可思议的梦境",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 12 && this.dialogFish===1) {
      document.getElementById('ghost').style.display = 'block';
      document.getElementById('fazhen').style.textDecoration = 'line-through';
      const dialogues = [
        {
          text: "你找到我了。莱拉。",
          image: "../img/conversation/其他人物/fazhen.png",
        },  
        {
          text: "我是虚空法阵。",
          image: "../img/conversation/其他人物/fazhen.png",
        },  
        {
          text: "？",
          image: "../img/conversation/莱拉/莱拉4.png",
        },  
        {
          text: "来吧，去跟我们的长老对话吧",
          image: "../img/conversation/其他人物/fazhen.png",
        },  
      ];

      createDialogueBox(dialogues);
        document.addEventListener("click", chuansong);

      function chuansong() {
        player.move(-200, 0, collisionMap);
        document.removeEventListener("click", chuansong);
      }
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 12 && this.dialogFish===0) {
      const dialogues = [
        {
          text: "你好像漏了什么线索......",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 17 && this.dialogGhost===0) {
      const dialogues = [
        {
          text: "“她曾想知道真相，但是，却还是选择了将其遗忘。”",
          image: "../img/conversation/其他人物/ghost.png", // 另一张图片
        },
        {
          text: "你好，你愿意陪我吗？",
          image: "../img/conversation/其他人物/ghostangry.png", // 另一张图片
          options: ["当然，我会陪你的->", "不，我现在没有空->"], // 添加选项
        },
      ]; 
      const choiceDialogues = {
        cooperate: [
          {
            text: "好样的，莱拉。",
            image: "../img/conversation/其他人物/ghost.png",
          },
          {
            text: "你跟她不一样。你永远记得你的使命。",
            image: "../img/conversation/其他人物/ghostangry.png",
          },
          {
            text: "我只帮助那些值得帮助的人。来吧。让我帮助你。",
            image: "../img/conversation/其他人物/ghost.png",
          },
          {
            text: "组织的暗号：right",
            image: "../img/conversation/其他人物/ghost.png",
          },  
          {
            text: "说出这个，无论是谁，都会相信你是组织的人。",
            image: "../img/conversation/其他人物/ghostangry.png",
          },
          {
            text: "你这么聪明，肯定知道这样可以得到艾德里安的信任，从而套出艾德里安的真实身份吧！",
            image: "../img/conversation/其他人物/ghost.png",
          },
          {
            text: "一直向前，不要回头！",
            image: "../img/conversation/其他人物/ghostangry.png",
          },
          {
            text: "“她曾想知道真相，但是，却还是选择了将其遗忘。”",
            image: "../img/conversation/其他人物/ghost.png",
          },  
          {
            text: "祝你好运。",
            image: "../img/conversation/其他人物/ghost.png",
          },  
          {
            text: "去找艾德里安。",
            image: "../img/conversation/精灵/精灵.png",
          },  
            ],
        abandon: [
          {
            text: "（仰天长啸）哈哈哈哈哈哈哈",
            image: "../img/conversation/其他人物/ghost.png", // 另一张图片
          },
          {
            text: "原来，你和她是一样的。",
            image: "../img/conversation/其他人物/ghostangry.png", // 另一张图片
          },
          {
            text: "难道不应该快去救alpha梦境吗？这里不欢迎你。我只帮助那些值得帮助的人。",
            image: "../img/conversation/其他人物/ghostangry.png", // 另一张图片
          },
        ],
      };

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
      // 创建对s话文本元素
      const dialogText = document.createElement("span");
      dialogText.id = "dialogueText";
      dialogBox.appendChild(dialogText);
      document.body.appendChild(dialogBox);
      dialogText.style.fontFamily = "Arial, sans-serif"; // 字体
      dialogText.style.fontSize = "20px"; // 字体大小
      dialogText.style.color = "#FFFFFF"; // 字体颜色
      dialogText.style.textShadow = "2px 2px 4px #000000"; // 文本阴影
      dialogText.style.lineHeight = "1.5"; // 行高
      // 创建选项按钮容器
      const optionsContainer = document.createElement("div");
      optionsContainer.id = "options";
      dialogBox.appendChild(optionsContainer);
      function typeDialogue() {
        if (charIndex < dialogues[currentDialogue].text.length) {
          dialogText.innerText +=
            dialogues[currentDialogue].text.charAt(charIndex);
          charIndex++;
          setTimeout(typeDialogue, typingSpeed);
        } else {
          if (dialogues[currentDialogue].options) {
            showOptions(dialogues[currentDialogue].options);
            charIndex = -1;
          } else {
            currentDialogue++;
            charIndex = 0;
          }
        }
      }
      const self = this;
      function showNextDialogue() {
        self.isconversation = 1;
        player.isconversation=1;
        Player.isconversation=1;  
        if (currentDialogue < dialogues.length) {
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          optionsContainer.innerHTML = ""; // 清空选项按钮
          typeDialogue();
        } else {
          self.isconversation = 0;
          player.isconversation=0;
          Player.isconversation=0;
          document.body.removeChild(dialogBox);
          self.showPasswordPrompt();
          self.visit = 1;
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }
      function showOptions(options) {
        options.forEach((option) => {
          const button = document.createElement("div"); // 使用 div 而不是 button
          button.className = "option-text";
          button.innerText = option;
          button.style.cursor = "pointer"; // 鼠标悬停时显示为指针
          button.style.margin = "10px 0"; // 上下间距
          button.style.color = "#FFFFFF"; // 字体颜色设置为白色
          button.style.fontSize = "24px"; // 字体大小
          button.style.fontFamily = "Arial, sans-serif"; // 字体设置为 Arial
          button.style.textShadow = "1px 1px 2px #000000"; // 添加文本阴影
          button.style.transition = "background-color 0.3s, color 0.3s"; // 添加过渡效果

          // 添加鼠标悬停效果
          button.onmouseover = () => {
            button.style.backgroundColor = "#444444"; // 鼠标悬停时的背景色
            button.style.color = "#FFD700"; // 鼠标悬停时的字体颜色
          };
          button.onmouseout = () => {
            button.style.backgroundColor = ""; // 恢复原背景色
            button.style.color = "#FFFFFF"; // 恢复原字体颜色
          };

          button.onclick = () => handleOption(option);
          optionsContainer.appendChild(button);
        });
      }

      function handleOption(option) {
        if (option === "不，我现在没有空->") {
          showAchievement();
        }
        if (option === "不，我现在没有空->") {
          // 成就
            var index = window.localStorage.userid;
            var array = JSON.parse(window.localStorage.userArr);
            array[index].achi12 = 5; //achi2代表第二个成就，自行设定判定条件
            window.localStorage.userArr = JSON.stringify(array);
          //  alert("获得成就！");

        }
        if (option === "不，我现在没有空->") {
          dialogues.push(...choiceDialogues.cooperate);
          // player.move(-200,0,collisionMap);
          document.addEventListener("click", chuansong);
          document.getElementById('ade').style.display = 'block';
          document.getElementById('ghost').style.textDecoration = 'line-through';    
          function chuansong() {
            player.move(-350, 0, collisionMap);
            self.dialogGhost=1;
            document.removeEventListener("click", chuansong);
          }    
        } else if (option === "当然，我会陪你的->") {
          dialogues.push(...choiceDialogues.abandon);
        }
        if (option === "好->") { 
          dialogues.push(...choiceDialogues.cooperate);
        }
        currentDialogue++;          
        showNextDialogue();
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();
          collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 17 && this.dialogGhost===1) {
      const dialogues = [
        {
          text: "莱拉你又来啦。",
          image: "../img/conversation/其他人物/ghost.png",
        },  
        {
          text: "...",
          image: "../img/conversation/其他人物/ghostangry.png",
        },  
        {
          text: "走吧走吧，我相信你，记住，暗号：right",
          image: "../img/conversation/其他人物/ghost.png",
        },  
        {
          text: "好...",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
      ];

      createDialogueBox(dialogues);
        document.addEventListener("click", chuansong);

      function chuansong() {
        player.move(-350, 0, collisionMap);
        document.removeEventListener("click", chuansong);
      }
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 5 && this.dialogKarl===0) {
      document.getElementById('fish').style.display = 'block';
      document.getElementById('carl').style.textDecoration = 'line-through';
      this.dialogKarl=1;
      const dialogues = [
        {
          text: "（激动地）卡尔！我终于找到你了！你没事吧？",
          image: "../img/conversation/莱拉/莱拉3.png",
        },  
        {
          text: "（微笑）我很好，莱拉。其实，我故意让自己被困在这里，为的是收集更多关于组织的情报，并找到阻止他们的办法。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "（疑惑）组织？你是说艾德里安所在的那个组织？",
          image: "../img/conversation/莱拉/莱拉2.png",
        },  
        {
          text: "（点头）是的，莱拉。这个组织已经不再是简单的阴谋集团。他们掌握了一种能够控制全球梦境的技术——“阿尔法梦境”。",
          image: "../img/conversation/卡尔/卡尔3.png",
        }, 
        {
          text: "阿尔法梦境是一种终极的梦境技术，它能够潜入任何人的潜意识，改变他们的记忆和行为，从而影响整个世界的未来。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "（震惊）如果他们成功启动了阿尔法梦境，那岂不是整个世界都要陷入他们的掌控之中？",
          image: "../img/conversation/莱拉/莱拉4.png",
        },  
        {
          text: "（严肃）没错。这也是我为什么必须留下来的原因。我需要更多的信息来破坏他们的计划。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "我该怎么办？",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
        {
          text: "我们必须知道那个组织的暗号。",
          image: "../img/conversation/卡尔/卡尔3.png",
        },  
        {
          text: "这张地图上有很多组织的前成员。他们的形态和性格各异。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "尊重他们。他们会告诉你我们想要的东西。",
          image: "../img/conversation/卡尔/卡尔3.png",
        },  
        {
          text: "一旦知道了密码，去揭穿艾德里安的密谋！",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
      this.aidedialog=true;
    }
    if (collisionMap[interactY][interactX] === 5 && this.dialogKarl===1) {
      const dialogues = [
        {
          text: "卡尔...",
          image: "../img/conversation/莱拉/莱拉3.png",
        },  
        {
          text: "莱拉，不必担心我了，我现在在这里很好。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "快去探寻一下这个地图上的异常地方。",
          image: "../img/conversation/卡尔/卡尔3.png",
        },  
        {
          text: "那只传说之鱼，很关键。",
          image: "../img/conversation/卡尔/卡尔.png",
        }, 
        {
          text: "这个地方，到处都是迷幻，小心别被弄乱了心智。",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "好，我会小心的",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
        {
          text: "去找传说之鱼吧",
          image: "../img/conversation/卡尔/卡尔2.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
      this.aidedialog=true;
    }
  }

  
  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../minigame/wuziqi/index4.html";
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
      }, 500); // 等待1秒以完成淡出效果
    }, 100); // 2秒后开始淡出
  }
}

const player = new Player();
window.player = player;

// function createDialogueBox(dialogues) {
//   let currentDialogue = 0;
//   let charIndex = 0;
//   const typingSpeed = 1; // 每个字符的打印速度（毫秒）

//   // 添加CSS样式
//   const style = document.createElement("style");
//   document.head.appendChild(style);

//   // 创建对话框元素
//   const dialogBox = document.createElement("div");
//   dialogBox.id = "dialogue";

//   // 插入莱拉的图片
//   const lailaImage = document.createElement("img");
//   lailaImage.style.width = "100px"; // 将宽度设置为200像素
//   lailaImage.style.height = "auto"; // 自动调整高度以保持图片比例
//   dialogBox.appendChild(lailaImage);

//   // 创建对话文本元素
//   const dialogText = document.createElement("span");
//   dialogText.id = "dialogueText";
//   dialogBox.appendChild(dialogText);
//   document.body.appendChild(dialogBox);
//   dialogText.style.fontFamily = "Arial, sans-serif"; // 字体
//   dialogText.style.fontSize = "20px"; // 字体大小
//   dialogText.style.color = "#FFFFFF"; // 字体颜色
//   dialogText.style.textShadow = "2px 2px 4px #000000"; // 文本阴影
//   dialogText.style.lineHeight = "1.5"; // 行高
//   function typeDialogue() {
//     if (charIndex < dialogues[currentDialogue].text.length) {
//       dialogText.innerText +=
//         dialogues[currentDialogue].text.charAt(charIndex);
//       charIndex++;
//       setTimeout(typeDialogue, typingSpeed);
//     } else {
//       currentDialogue++;
//       charIndex = 0;
//     }
//   }

//   const self = this;

//   function showNextDialogue() {
//     self.isconversation = 1;
//     player.isconversation=1;
//     Player.isconversation=1;
//     if (currentDialogue < dialogues.length) {
//       dialogText.innerText = "";
//       lailaImage.src = dialogues[currentDialogue].image;
//       typeDialogue();
//     } else {
//       self.isconversation = 0;
//       player.isconversation=0;
//       Player.isconversation=0;
//       document.body.removeChild(dialogBox);
//       document.getElementById("gameCanvas").style.display = "block";
//       requestAnimationFrame(mainLoop);
//     }
//   }

//   document.addEventListener("click", showNextDialogue);
//   showNextDialogue();

// }

function createDialogueBox(dialogues) {
  let currentDialogue = 0;

  // 添加CSS样式
  const style = document.createElement("style");
  document.head.appendChild(style);

  // 创建对话框元素
  const dialogBox = document.createElement("div");
  dialogBox.id = "dialogue";

  // 插入莱拉的图片
  const lailaImage = document.createElement("img");
  lailaImage.style.width = "100px"; // 将宽度设置为100像素
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

  const self = this;

  function showNextDialogue() {
    self.isconversation = 1;
    player.isconversation = 1;
    Player.isconversation = 1;
    if (currentDialogue < dialogues.length) {
      dialogText.innerText = dialogues[currentDialogue].text;
      lailaImage.src = dialogues[currentDialogue].image;
      currentDialogue++;
    } else {
      self.isconversation = 0;
      player.isconversation = 0;
      Player.isconversation = 0;
      document.body.removeChild(dialogBox);
      document.getElementById("gameCanvas").style.display = "block";
      requestAnimationFrame(mainLoop);
    }
  }

  document.addEventListener("click", showNextDialogue);
  showNextDialogue();
}


// 任务栏
const select=document.querySelector(".select")
const options_list=document.querySelector(".options-list")
const options=document.querySelectorAll(".option")
//切换语言菜单得显示和隐藏
select.addEventListener("click",()=>{
  options_list.classList.toggle("active");
  select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up")
})
//切换语言
options.forEach((option)=>{
option.addEventListener("click",()=>{
  options.forEach((option)=>{option.classList.remove("selected")});
  select.querySelector("span").innerHTML=option.innerHTML;
  option.classList.add("selected");
  options_list.classList.toggle("active")
  select.querySelector(".fa-angle-up").classList.toggle("fa-angle-up")
})
})

// 成就
function showAchievement() {
  const achievementBox = document.getElementById('achievement');
  achievementBox.classList.remove('hidden');

  // Make the box gradually appear
  setTimeout(() => {
      achievementBox.style.opacity = 1;
  }, 100);

  // Automatically hide the box after 2 seconds
  setTimeout(() => {
      achievementBox.style.opacity = 0;

      // Hide the box completely after the fade-out transition
      setTimeout(() => {
          achievementBox.classList.add('hidden');
      }, 1000);
  }, 3500);
}
