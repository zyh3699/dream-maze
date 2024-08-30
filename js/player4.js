class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/莱拉/laila down.png";
    this.width = 32;
    this.height = 66;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
    this.bug = 0;
    this.frameIndex = 0; // 当前帧索引
    this.frameDelay = 0; // 帧间隔计时器
    this.frameInterval = 45; // 每隔多少次update切换一次帧
    this.direction = "down"; // 默认方向
    this.map = 0;
    this.visit =0;
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

  mapp() {
    if (this.map === 1) {
      this.showMessage("按K键收起");

      // Create or select the image element
      let image = document.getElementById("mapImage");
      if (!image) {
        image = document.createElement("img");
        image.id = "mapImage";
        image.src = "../map/secret.jpg"; // replace with the actual path to your image
        image.style.position = "fixed";
        image.style.top = "50%";
        image.style.left = "50%";
        image.style.transform = "translate(-50%, -50%)";
        image.style.zIndex = "1000";
        image.style.width = "500px"; // Set the width
        image.style.height = "300px"; // Set the height
        image.style.border = "15px solid white"; // Set border size, style, and color
        document.body.appendChild(image);
      } else {
        image.style.display = "block";
      }

      // Add an event listener to hide the image when K is pressed
      document.addEventListener("keydown", function (e) {
        if (e.key === "k" || e.key === "K") {
          image.style.display = "none";
        }
      });
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
    if (
      collisionMap[y][x] === 5 ||
      collisionMap[y][x] === 6 ||
      collisionMap[y][x] === 10 ||
      collisionMap[y][x] === 11 ||
      collisionMap[y][x] === 3 ||
      collisionMap[y][x] === 12
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
      this.showMessage("你现在还不可以进去");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 11) {
      this.showMessage("点E可以进行交互");
    }
    if (collisionMap[interactY][interactX] === 10) {
      this.showMessage("点E进行解码");
    }
    if (collisionMap[interactY][interactX] === 2) {
      this.showMessage("点E进入梦境核心");
    }
    if (collisionMap[interactY][interactX] === 3) {
      this.showMessage("点E开始修复结构");
    }
    if (collisionMap[interactY][interactX] === 5) {
      this.showMessage("按E与卡尔对话");
    }
    if (collisionMap[interactY][interactX] === 12) {
      this.showMessage("按E获取关键线索");
    }
  }

  showPasswordPrompt() {
    const passwordContainer = document.createElement("div");
    passwordContainer.id = "passwordContainer";
    passwordContainer.style.position = "fixed";
    passwordContainer.style.top = "50%";
    passwordContainer.style.left = "50%";
    passwordContainer.style.transform = "translate(-50%, -50%)";
    passwordContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    passwordContainer.style.padding = "20px";
    passwordContainer.style.borderRadius = "10px";
    passwordContainer.style.display = "grid";
    passwordContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    passwordContainer.style.gridGap = "10px";
    passwordContainer.style.textAlign = "center";
    passwordContainer.style.color = "white";

    const inputField = document.createElement("input");
    inputField.type = "password";
    inputField.id = "passwordInput";
    inputField.style.gridColumn = "span 3";
    inputField.style.padding = "10px";
    inputField.style.fontSize = "18px";
    inputField.style.textAlign = "center";
    passwordContainer.appendChild(inputField);

    const buttons = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "删除",
      "0",
      "确定",
    ];

    buttons.forEach((buttonText) => {
      const button = document.createElement("button");
      button.innerText = buttonText;
      button.style.padding = "10px";
      button.style.fontSize = "18px";
      button.style.cursor = "pointer";
      button.onclick = () => {
        if (buttonText === "删除") {
          inputField.value = inputField.value.slice(0, -1);
        } else if (buttonText === "确定") {
          if (inputField.value === "1829") {
            alert("密码正确");
            this.map = 1;
            document.body.removeChild(passwordContainer);
            const dialogues = [
              {
                text: "欢迎你，尊贵的1829组织成员",
                image: "../img/conversation/精灵/精灵.png", // 对应的图片路径
              },
              {
                text: "这份文件从来没有其他人看到过...你是艾德里安吗？",
                image: "../img/conversation/精灵/精灵.png", // 另一张图片
              },
              {
                text: "不，我是莱拉",
                image: "../img/conversation/莱拉/莱拉.png", // 精灵
              },
              {
                text: "在你来之前，艾德里安已经来过这里了",
                image: "../img/conversation/精灵/精灵.png", // 精灵
              },
              {
                text: "不过很可惜，他当时没有找到正确的密码...",
                image: "../img/conversation/精灵/精灵.png", // 精灵
              },
              {
                text: "不管怎么说，恭喜你，请你点击M键来查看这份查看机密文件吧",
                image: "../img/conversation/精灵/精灵.png", // 精灵
              },
              {
                text: "这里到底还有多少秘密...",
                image: "../img/conversation/莱拉/莱拉.png", // 精灵
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

            document.addEventListener("click", showNextDialogue);
            showNextDialogue();

            collisionMap[interactY][interactX] = 1000;
          } else {
            alert("密码错误");
          }
        } else {
          inputField.value += buttonText;
        }
      };
      passwordContainer.appendChild(button);
    });

    const exitButton = document.createElement("button");
    exitButton.innerText = "退出";
    exitButton.style.gridColumn = "span 3";
    exitButton.style.padding = "10px";
    exitButton.style.fontSize = "18px";
    exitButton.style.cursor = "pointer";
    exitButton.style.marginTop = "10px";
    exitButton.onclick = () => {
      document.body.removeChild(passwordContainer);
    };
    passwordContainer.appendChild(exitButton);

    document.body.appendChild(passwordContainer);
  }

  startBattle = function () {
    const battleContainer = document.createElement("div");
    battleContainer.id = "battleContainer";
    battleContainer.style.position = "fixed";
    battleContainer.style.top = "50%";
    battleContainer.style.left = "50%";
    battleContainer.style.transform = "translate(-50%, -50%)";
    battleContainer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    battleContainer.style.padding = "20px";
    battleContainer.style.borderRadius = "10px";
    battleContainer.style.textAlign = "center";
    battleContainer.style.color = "white";
    battleContainer.style.width = "400px";
    battleContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

    let enemyHealth = 100;
    let playerHealth = 100;
    let playerMana = 50; // 初始魔法值

    // 敌人部分
    const enemyContainer = document.createElement("div");
    enemyContainer.style.marginBottom = "20px";

    const enemyHealthBarContainer = document.createElement("div");
    enemyHealthBarContainer.style.width = "100%";
    enemyHealthBarContainer.style.backgroundColor = "grey";
    enemyHealthBarContainer.style.borderRadius = "5px";
    enemyHealthBarContainer.style.marginBottom = "10px";

    const enemyHealthBar = document.createElement("div");
    enemyHealthBar.id = "enemyHealthBar";
    enemyHealthBar.style.width = "100%";
    enemyHealthBar.style.height = "20px";
    enemyHealthBar.style.backgroundColor = "red";
    enemyHealthBar.style.borderRadius = "5px";
    enemyHealthBarContainer.appendChild(enemyHealthBar);
    enemyContainer.appendChild(enemyHealthBarContainer);

    const enemyImage = document.createElement("img");
    enemyImage.src = "../img/charactor/精灵/Dwarf.png"; // 替换为实际的敌人图片路径
    enemyImage.style.width = "100px";
    enemyImage.style.height = "100px";
    enemyImage.style.display = "block";
    enemyImage.style.margin = "0 auto";
    enemyContainer.appendChild(enemyImage);

    battleContainer.appendChild(enemyContainer);

    // 玩家部分
    const playerContainer = document.createElement("div");
    playerContainer.style.marginBottom = "20px";

    const playerHealthBarContainer = document.createElement("div");
    playerHealthBarContainer.style.width = "100%";
    playerHealthBarContainer.style.backgroundColor = "grey";
    playerHealthBarContainer.style.borderRadius = "5px";
    playerHealthBarContainer.style.marginBottom = "10px";

    const playerHealthBar = document.createElement("div");
    playerHealthBar.id = "playerHealthBar";
    playerHealthBar.style.width = "100%";
    playerHealthBar.style.height = "20px";
    playerHealthBar.style.backgroundColor = "green";
    playerHealthBar.style.borderRadius = "5px";
    playerHealthBarContainer.appendChild(playerHealthBar);
    playerContainer.appendChild(playerHealthBarContainer);

    const playerManaBarContainer = document.createElement("div");
    playerManaBarContainer.style.width = "100%";
    playerManaBarContainer.style.backgroundColor = "grey";
    playerManaBarContainer.style.borderRadius = "5px";
    playerManaBarContainer.style.marginBottom = "10px";

    const playerManaBar = document.createElement("div");
    playerManaBar.id = "playerManaBar";
    playerManaBar.style.width = "100%";
    playerManaBar.style.height = "20px";
    playerManaBar.style.backgroundColor = "blue";
    playerManaBar.style.borderRadius = "5px";
    playerManaBarContainer.appendChild(playerManaBar);
    playerContainer.appendChild(playerManaBarContainer);

    const playerImage = document.createElement("img");
    playerImage.src = "../img/charactor/莱拉/laila down.png"; // 替换为实际的玩家图片路径
    playerImage.style.width = "100px";
    playerImage.style.height = "100px";
    playerImage.style.display = "block";
    playerImage.style.margin = "0 auto";
    playerContainer.appendChild(playerImage);

    battleContainer.appendChild(playerContainer);

    const logContainer = document.createElement("div");
    logContainer.id = "logContainer";
    logContainer.style.height = "100px";
    logContainer.style.overflowY = "auto";
    logContainer.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    logContainer.style.padding = "10px";
    logContainer.style.borderRadius = "5px";
    logContainer.style.marginBottom = "20px";
    battleContainer.appendChild(logContainer);

    const logMessage = (message) => {
      const logEntry = document.createElement("div");
      logEntry.innerText = message;
      logContainer.appendChild(logEntry);
      logContainer.scrollTop = logContainer.scrollHeight;
    };

    const attackButton = document.createElement("button");
    attackButton.innerText = "攻击";
    attackButton.style.padding = "10px 20px";
    attackButton.style.fontSize = "18px";
    attackButton.style.cursor = "pointer";
    attackButton.style.marginRight = "10px";
    attackButton.style.border = "none";
    attackButton.style.borderRadius = "5px";
    attackButton.style.backgroundColor = "#ff4d4d";
    attackButton.style.color = "white";
    attackButton.onclick = () => {
      const damage = Math.floor(Math.random() * 20) + 1;
      enemyHealth -= damage;
      enemyHealthBar.style.width = `${enemyHealth}%`;
      logMessage(`你对敌人造成了 ${damage} 点伤害！`);
      if (enemyHealth <= 0) {
        alert("你赢了！");
        document.body.removeChild(battleContainer);
        return;
      }
      enemyTurn();
    };
    battleContainer.appendChild(attackButton);

    const defendButton = document.createElement("button");
    defendButton.innerText = "防御";
    defendButton.style.padding = "10px 20px";
    defendButton.style.fontSize = "18px";
    defendButton.style.cursor = "pointer";
    defendButton.style.marginRight = "10px";
    defendButton.style.border = "none";
    defendButton.style.borderRadius = "5px";
    defendButton.style.backgroundColor = "#4d94ff";
    defendButton.style.color = "white";
    defendButton.onclick = () => {
      logMessage("你选择了防御！");
      enemyTurn(true);
    };
    battleContainer.appendChild(defendButton);

    const healButton = document.createElement("button");
    healButton.innerText = "恢复";
    healButton.style.padding = "10px 20px";
    healButton.style.fontSize = "18px";
    healButton.style.cursor = "pointer";
    healButton.style.marginRight = "10px";
    healButton.style.border = "none";
    healButton.style.borderRadius = "5px";
    healButton.style.backgroundColor = "#4dff4d";
    healButton.style.color = "white";
    healButton.onclick = () => {
      const healAmount = Math.floor(Math.random() * 20) + 1;
      playerHealth = Math.min(playerHealth + healAmount, 100);
      playerHealthBar.style.width = `${playerHealth}%`;
      logMessage(`你恢复了 ${healAmount} 点生命值！`);
      enemyTurn();
    };
    battleContainer.appendChild(healButton);

    const magicButton = document.createElement("button");
    magicButton.innerText = "魔法攻击";
    magicButton.style.padding = "10px 20px";
    magicButton.style.fontSize = "18px";
    magicButton.style.cursor = "pointer";
    magicButton.style.border = "none";
    magicButton.style.borderRadius = "5px";
    magicButton.style.backgroundColor = "#ff4dff";
    magicButton.style.color = "white";
    magicButton.onclick = () => {
      const magicCost = 10; // 魔法攻击消耗的魔法值
      if (playerMana >= magicCost) {
        playerMana -= magicCost;
        playerManaBar.style.width = `${playerMana}%`;
        const magicDamage = Math.floor(Math.random() * 30) + 1;
        enemyHealth -= magicDamage;
        enemyHealthBar.style.width = `${enemyHealth}%`;
        logMessage(`你对敌人造成了 ${magicDamage} 点魔法伤害！`);
        if (enemyHealth <= 0) {
          alert("你赢了！");
          document.body.removeChild(battleContainer);
          return;
        }
        enemyTurn();
      } else {
        logMessage("魔法值不足，无法使用魔法攻击！");
      }
    };
    battleContainer.appendChild(magicButton);

    const enemyTurn = (isDefending = false) => {
      setTimeout(() => {
        const enemyAction = Math.floor(Math.random() * 3);
        if (enemyAction === 0) {
          const enemyDamage = Math.floor(Math.random() * 20) + 1;
          const actualDamage = isDefending
            ? Math.floor(enemyDamage / 2)
            : enemyDamage;
          playerHealth -= actualDamage;
          playerHealthBar.style.width = `${playerHealth}%`;
          logMessage(`敌人对你造成了 ${actualDamage} 点伤害！`);
        } else if (enemyAction === 1) {
          const enemyHeal = Math.floor(Math.random() * 20) + 1;
          enemyHealth = Math.min(enemyHealth + enemyHeal, 100);
          enemyHealthBar.style.width = `${enemyHealth}%`;
          logMessage(`敌人恢复了 ${enemyHeal} 点生命值！`);
        } else {
          const enemyMagicDamage = Math.floor(Math.random() * 30) + 1;
          playerHealth -= enemyMagicDamage;
          playerHealthBar.style.width = `${playerHealth}%`;
          logMessage(`敌人对你造成了 ${enemyMagicDamage} 点魔法伤害！`);
        }

        if (playerHealth <= 0) {
          alert("你输了！");
          document.body.removeChild(battleContainer);
          const dialogues = [
            {
              text: "放弃吧，更多梦境守卫已经赶过来了",
              image: "../img/conversation/精灵/精灵.png", // 对应的图片路径
            },
            {
              text: "莱拉，没有别的办法了，我们只能回到上一层梦境暂时躲避他们",
              image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
            },
            {
              text: "上一层梦境相对稳定，梦境守卫不会在那里这么快发现我们的",
              image: "../img/conversation/卡尔/Elliott.png", // 精灵
            },
            {
              text: "梦境守卫确实厉害...我很难辨别他们的攻击方式",
              image: "../img/conversation/莱拉/莱拉.png", // 精灵
            },
            {
              text: "以我现在的能力，很可能也没有办法修复阿尔法梦境的核心，那里可能有更大的挑战",
              image: "../img/conversation/莱拉/莱拉.png", // 精灵
            },
            {
              text: "上层梦境说不定还有我们遗漏的东西...",
              image: "../img/conversation/莱拉/莱拉.png", // 精灵
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

          function showNextDialogue() {
            if (currentDialogue < dialogues.length) {
              dialogText.innerText = "";
              lailaImage.src = dialogues[currentDialogue].image;
              typeDialogue();
            } else {
              document.body.removeChild(dialogBox);
              window.location.href = "../html/chapter3_without_intro.html";
              document.getElementById("gameCanvas").style.display = "block";
              requestAnimationFrame(mainLoop);
            }
          }

          document.addEventListener("click", showNextDialogue);
          showNextDialogue();

          collisionMap[interactY][interactX] = 1000;
        }
      }, 1000);
    };

    document.body.appendChild(battleContainer);
  };

  setupCoopGameUI() {
    const gameContainer = document.createElement("div");
    gameContainer.id = "gameContainer";
    gameContainer.style.position = "fixed";
    gameContainer.style.top = "50%";
    gameContainer.style.left = "50%";
    gameContainer.style.transform = "translate(-50%, -50%)";
    gameContainer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    gameContainer.style.padding = "20px";
    gameContainer.style.borderRadius = "10px";
    gameContainer.style.textAlign = "center";
    gameContainer.style.color = "white";
    gameContainer.style.width = "400px";
    gameContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

    // 创建任务进度部分
    const progressContainer = document.createElement("div");
    progressContainer.style.marginBottom = "20px";

    const progressTitle = document.createElement("h2");
    progressTitle.innerText = "任务进度";
    progressContainer.appendChild(progressTitle);

    const progressBar = document.createElement("div");
    progressBar.style.width = "100%";
    progressBar.style.backgroundColor = "grey";
    progressBar.style.borderRadius = "5px";
    progressBar.style.marginBottom = "10px";

    const progressFill = document.createElement("div");
    progressFill.id = "progressFill";
    progressFill.style.width = "0%";
    progressFill.style.height = "20px";
    progressFill.style.backgroundColor = "green";
    progressFill.style.borderRadius = "5px";
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);

    const progressDisplay = document.createElement("div");
    progressDisplay.id = "progressDisplay";
    progressDisplay.innerText = `进度: 0%`;
    progressContainer.appendChild(progressDisplay);

    gameContainer.appendChild(progressContainer);
    document.body.appendChild(gameContainer);

    let progress = 0;
    let progressInterval;
    let gameStarted = false;
    let gameEnded = false;

    const updateProgress = () => {
      progress = Math.max(progress - 1, 0);
      progressFill.style.width = `${progress}%`;
      progressDisplay.innerText = `进度: ${progress}%`;

      if (progress <= 0) {
        clearInterval(progressInterval);
        alert("任务失败！梦境启动防御机制，请更换位点尝试重新修复");
        endGame();
      }
    };

    const endGame = () => {
      gameEnded = true;
      document.removeEventListener("keydown", keydownHandler);
      setTimeout(() => {
        gameContainer.style.transition = "opacity 1s";
        gameContainer.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(gameContainer);
        }, 1000);
      }, 2000);
    };

    // 提示信息

    const keydownHandler = (event) => {
      if (gameEnded) return;

      if (event.key === " " && !gameStarted) {
        gameStarted = true;
        // 开始减少进度
        setTimeout(() => {
          progressInterval = setInterval(updateProgress, 100);
        }, 2000);
      }

      if (event.key === " ") {
        progress = Math.min(progress + 5, 100);
        progressFill.style.width = `${progress}%`;
        progressDisplay.innerText = `进度: ${progress}%`;

        if (progress >= 100) {
          clearInterval(progressInterval);
          alert("任务成功！");
          endGame();
          if (this.bug < 5) {
            this.bug += 1;
            this.showMessage(`你修复了漏洞（${this.bug}/5）`);
            if (this.bug === 5) {
              setTimeout(() => {
                this.showMessage("你已修复完梦境所有漏洞，请前往阿尔法核心");
              }, 4000); // 延迟2秒显示消息
            }
            this.updateAdjacentPieces(interactX, interactY);
          }
        }
      }
    };

    document.addEventListener("keydown", keydownHandler);
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
      if (this.bug < 5) {
        const dialogues = [
          {
            text: "哦不卡尔，我们好像还无法进入梦境核心",
            image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
          },
          {
            text: "阿尔法梦境的核心是一个非常复杂的结构，我们需要修复所有的漏洞才能进入。",
            image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
          },
          {
            text: "否则这个梦境结构会一直崩塌",
            image: "../img/conversation/精灵/精灵.png", // 精灵
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

        document.addEventListener("click", showNextDialogue);
        showNextDialogue();

        collisionMap[interactY][interactX] = 0;
      } else if (this.bug >= 5 && window.map.index == 2) {
        this.fadeOutAndRedirect();
        collisionMap[interactY][interactX] = 0;
      }
    }

    if (collisionMap[interactY][interactX] === 3) {
      this.setupCoopGameUI();

      this.updateAdjacentPieces(interactX, interactY);
    }
    if (collisionMap[interactY][interactX] === 10) {
      if (this.visit === 0) {
        const dialogues = [
          {
            text: "这是什么地方？",
            image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
          },
          {
            text: "这看起来像一个被遗弃的电子保险箱。",
            image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
          },
          {
            text: "这上面有输入密码的地方，在如此靠近阿尔法梦境核心的地方放置的东西，一定不简单...",
            image: "../img/conversation/莱拉/莱拉.png", // 精灵
          },
          {
            text: "可是我们能从哪里找到密码...",
            image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
          },
          {
            text: "嗯...",
            image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
          },
          {
            text: "你有没有想起来什么...",
            image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
            
          },
          {
            text: "之前艾德里安总是提到过一个组织，组织名称好像是一串数字...",
            image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
            options: ["记得->", "不记得->"], // 添加选项
          },
        ];

        
        const choiceDialogues = {
          cooperate: [
            {
              text: "艾德里安，为什么你会联系我？我们上次的合作……你知道，我依然有很多疑问。",
              image: "../img/conversation/莱拉/莱拉.png",
            },
            {
              text: "我明白你的顾虑，莱拉。但你必须知道，这个组织的影响力远比我们当初想象的要大得多。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            },
            {
              text: "过去我可能隐瞒了些东西，但现在……我不再是他们的一部分。我想帮你，揭开这一切的真相。",
              image: "../img/conversation/艾德里安/艾德里安.png",
              options: ["好->", "不好->"], // 添加选项
            },
          ],
          abandon: [
            {
              text: "嘶...",
              image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
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
          if (currentDialogue < dialogues.length) {
            dialogText.innerText = "";
            lailaImage.src = dialogues[currentDialogue].image;
            optionsContainer.innerHTML = ""; // 清空选项按钮
            
            typeDialogue();
          } else {
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
          if (option === "记得->") {
            dialogues.push(...choiceDialogues.cooperate);
          } else if (option === "不记得->") {
            dialogues.push(...choiceDialogues.abandon);
          }
          if (option === "好->") { 
            dialogues.push(...choiceDialogues.cooperate);
          }
          if (option === "不好->") {
            dialogues.push(...choiceDialogues.abandon);
          }
          currentDialogue++;
          
          showNextDialogue();
        }

        document.addEventListener("click", showNextDialogue);
        showNextDialogue();
      }
      
      collisionMap[interactY][interactX] = 0;
      if (this.visit === 1) {
        this.showPasswordPrompt();
      }
    }
    if (collisionMap[interactY][interactX] === 12) {
      const dialogues = [
        {
          text: "终于找到你了",
          image: "../img/conversation/精灵/精灵.png", // 对应的图片路径
        },
        {
          text: "除了与我战斗，你没有别的选择了",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "我是不会让你轻易通过这里的",
          image: "../img/conversation/精灵/精灵.png", // 精灵
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
          dialogText.innerText = "";
          lailaImage.src = dialogues[currentDialogue].image;
          typeDialogue();
        } else {
          document.body.removeChild(dialogBox);
          self.startBattle();
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      
      this.updateAdjacentPieces(interactX, interactY);
    }
    if (collisionMap[interactY][interactX] === 5) {
      const dialogues = [
        {
          text: "卡尔，我们剩下的时间不多了，整个梦境都在崩塌。",
          image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
        },
        {
          text: "我们必须找到关键的梦境支柱，修复它们，否则一切都完了。",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "在这场终极挑战中，莱拉和卡尔将面临决定世界命运的最后抉择。",
          image: "../img/conversation/精灵/精灵.png", // 精灵
        },
        {
          text: "莱拉，这是我们的最后机会。阿尔法梦境不仅能改变现实，它还能操控时间。如果我们失败了……整个世界都将陷入无尽的黑暗。",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "无论如何，我们必须阻止它。",
          image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
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

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
    }
    if (collisionMap[interactY][interactX] === 11) {
      const dialogues = [
        {
          text: "这个水池我好像在哪里见过...",
          image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
        },
        {
          text: "可能在你之前的梦境的梦境里见过，但是进入新梦境前你的记忆会被抹去。",
          image: "../img/conversation/卡尔/Elliott.png", // 另一张图片
        },
        {
          text: "但是阿尔法梦境与其他梦境不同，它非常不稳定",
          image: "../img/conversation/卡尔/Elliott.png", // 精灵
        },
        {
          text: "也就是说，要是我们无法修复修复这个梦境核心，我们的记忆包括存在都可能会被永久抹去。",
          image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
        },
        {
          text: "千真万确，所以...抓紧时间吧。",
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

      document.addEventListener("click", showNextDialogue);
      showNextDialogue();

      this.updateAdjacentPieces(interactX, interactY);
    }
  }

  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../minigame/memory/index.html";
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