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
      this.fadeOutAndRedirect();
      collisionMap[interactY][interactX] = 0;
    }

    if (collisionMap[interactY][interactX] === 3) {
      this.showMessage("你捡到了一个物品！");
      collisionMap[interactY][interactX] = 0;
      }
      if (collisionMap[interactY][interactX] === 6) {
        const dialogues = [
          {
            text: "莱拉，是我。我知道你已经发现了那个组织的秘密。我们不能再等了，他们已经在行动。你需要我的帮助。",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "为什么你要帮我？",
            image: "../img/conversation/莱拉/莱拉.png",
          },
          {
            text: "因为我曾经也是他们的一员，但我不愿再被他们操控。这次，我站在你这边。",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "请你做出你的选择，莱拉。你是决定与艾德里安合作，还是放弃？",
            image: "../img/conversation/精灵/精灵.png",
          }
        ];
      
        const choiceDialogues = {
          cooperate: [
            {
              text: "你做出了正确的选择，莱拉。我们会一起对抗他们。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            },
          ],
          abandon: [
            {
              text: "你选择了放弃。这可能是更安全的决定，但我们都知道，代价会是什么。",
              image: "../img/conversation/精灵/精灵.png",
            },
          ]
        };
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
      //   let currentDialogue = 0;
      //   let charIndex = 0;
      //   const typingSpeed = 50;
      
      //   const style = document.createElement("style");
      //   style.textContent = `
      //     #dialogue {
      //       position: fixed;
      //       bottom: 10%;
      //       left: 20%;
      //       background: rgba(0, 0, 0, 0.8);
      //       padding: 20px;
      //       border-radius: 10px;
      //       z-index: 1000;
      //     }
      
      //     #dialogueText {
      //       display: block;
      //       margin-top: 10px;
      //     }
      
      //     .button-container {
      //       position: fixed;
      //       top: 50%;
      //       left: 50%;
      //       transform: translate(-50%, -50%);
      //       display: flex;
      //       justify-content: center;
      //       z-index: 1001;
      //     }
      
      //     .button-container button {
      //       margin: 0 10px;
      //       padding: 10px 20px;
      //       font-size: 16px;
      //     }
      //   `;
      //   document.head.appendChild(style);
      
      //   const dialogBox = document.createElement("div");
      //   dialogBox.id = "dialogue";
      
      //   const lailaImage = document.createElement("img");
      //   lailaImage.style.width = "100px";
      //   lailaImage.style.height = "auto";
      //   dialogBox.appendChild(lailaImage);
      
      //   const dialogText = document.createElement("span");
      //   dialogText.id = "dialogueText";
      //   dialogBox.appendChild(dialogText);
      //   document.body.appendChild(dialogBox);
      
      //   dialogText.style.fontFamily = "Arial, sans-serif";
      //   dialogText.style.fontSize = "20px";
      //   dialogText.style.color = "#FFFFFF";
      //   dialogText.style.textShadow = "2px 2px 4px #000000";
      //   dialogText.style.lineHeight = "1.5";
      
      //   const buttonContainer = document.createElement("div");
      //   buttonContainer.className = "button-container";
      //   buttonContainer.innerHTML = `
      //     <button id="cooperateButton">与艾德里安合作</button>
      //     <button id="abandonButton">放弃</button>
      //   `;
      //   document.body.appendChild(buttonContainer);
      
      //   function typeDialogue() {
      //     if (charIndex < dialogues[currentDialogue].text.length) {
      //       dialogText.innerText += dialogues[currentDialogue].text.charAt(charIndex);
      //       charIndex++;
      //       setTimeout(typeDialogue, typingSpeed);
      //     } else {
      //       currentDialogue++;
      //       charIndex = 0;
      //       if (currentDialogue === dialogues.length) {
      //         showChoices();
      //       }
      //     }
      //   }
      
      //   function showNextDialogue() {
      //     if (currentDialogue < dialogues.length) {
      //       dialogText.innerText = "";
      //       lailaImage.src = dialogues[currentDialogue].image;
      //       typeDialogue();
      //     } else {
      //       document.body.removeChild(dialogBox);
      //       document.body.removeChild(buttonContainer);
      //       document.getElementById("gameCanvas").style.display = "block";
      //       requestAnimationFrame(mainLoop);
      //     }
      //   }
      
      //   function showChoices() {
      //     document.getElementById("cooperateButton").onclick = () => showChoiceDialogue("cooperate");
      //     document.getElementById("abandonButton").onclick = () => showChoiceDialogue("abandon");
      //   }
      
      //   function showChoiceDialogue(choice) {
      //     buttonContainer.style.display = "none"; // 隐藏按钮
      //     currentDialogue = 0;
      //     const selectedDialogues = choiceDialogues[choice];
      //     dialogues.length = 0; // 清空原对话
      //     selectedDialogues.forEach(dialogue => dialogues.push(dialogue)); // 加载新对话
      //     showNextDialogue();
      //   }
      
      //   dialogBox.addEventListener("click", showNextDialogue);
      //   showNextDialogue();
      
      //   this.updateAdjacentPieces(interactX, interactY);
      // }
      
      
      
      
  }
  fadeOutAndRedirect() {
    const bodyElement = document.body;
    bodyElement.style.transition = "opacity 1s ease-out";
    bodyElement.style.opacity = 0;
    setTimeout(() => {
      window.location.href = "../minigame/maze/intro.html";
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
