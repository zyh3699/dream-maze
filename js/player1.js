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

  isCollision(dx, dy, collisionMap) {
    const playerCenterX = map.image.width / 2;
    const playerCenterY = map.image.height / 2;

    const offsetX = window.map.offsetX;
    const offsetY = window.map.offsetY;

    const newX = Math.floor(playerCenterX + offsetX + dx);
    const newY = Math.floor(playerCenterY + offsetY + dy);
    if (collisionMap[newY][newX] === 6 || collisionMap[newY][newX] === 7 || collisionMap[newY][newX] === 8 || collisionMap[newY][newX] === 2) 
      this.showMessage("按E键交互 ");
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
updateAdjacentPieces(x, y) {
    // 检查边界条件
    if (x < 0 || y < 0 || x >= collisionMap[0].length || y >= collisionMap.length) {
      return;
    }

    // 如果当前位置是3，则将其更新为100
    if (collisionMap[y][x] === 3||collisionMap[y][x] === 6||collisionMap[y][x] === 2) {
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
    if (collisionMap[interactY][interactX] === 9) {
      this.fadeOutAndRedirect();
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 8) {
    
      const bodyElement = document.body;
      bodyElement.style.transition = "opacity 1s ease-out";
      bodyElement.style.opacity = 0;
      setTimeout(() => {
        window.location.href = "../html/chapter1_clock.html";
      }, 1000); // 等待1秒以完成淡出效果
    
    }
    if(collisionMap[interactY][interactX] === 7){
      this.showMessage("你开启了谜题！谜底是四个数字，代表特定的时间。按k键收起");

        // Create or select the image element
        let image = document.getElementById('mapImage');
        if (!image) {
            image = document.createElement('img');
            image.id = 'mapImage';
            image.src = '../img/bgr/chapter1_puzzle.jpg'; // replace with the actual path to your image
            image.style.position = 'fixed';
            image.style.top = '50%';
            image.style.left = '50%';
            image.style.transform = 'translate(-50%, -50%)';
            image.style.zIndex = '1000';
            image.style.width = '900px'; // Set the width
            image.style.height = '600px'; // Set the height
            image.style.border = '15px solid white'; // Set border size, style, and color
            document.body.appendChild(image);
            let closeButton = document.createElement('button');
            closeButton.innerHTML = 'X';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '170px';
            closeButton.style.right = '480px';
            closeButton.style.backgroundColor = 'red';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.padding = '5px 10px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontSize = '16px';
            closeButton.style.zIndex = '1001'; // Ensure it appears above the image
        
            // Append the button to the image's parent (body)
            document.body.appendChild(closeButton);
        
            // Add event listener to close the image on button click
            closeButton.addEventListener('click', function () {
                image.style.display = 'none';
                closeButton.style.display = 'none';
            });
        } else {
            image.style.display = 'block';
        }

        // Add an event listener to hide the image when K is pressed
        document.addEventListener('keydown', function (e) {
            if (e.key === 'k' || e.key === 'K') {
                image.style.display = 'none';
            }
        });
    }
    if (collisionMap[interactY][interactX] === 2) {
      const dialogues = [
        {
          text: "这个梦境真是奇怪，时间流逝得如此之快……",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "莱拉敲了敲门，不久，门开了",
          image: "../img/conversation/精灵/精灵.png",
        },
        {
          text: "你就是那个前成员，对吗？我们需要你的帮助。",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "你们终于来了。我早就预料到有人会来找我，但没想到会在这里见面。梦境中的时间和现实中的时间不一样，你知道吗？",
          image: "../img/conversation/前成员/Shane_Winter.png",
        },
        {
          text: "我意识到了这一点。我们需要你的帮助，你曾经是那个组织的一员，现在我们需要你告诉我们他们的计划，以及如何阻止他们。",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（叹气）你们不了解他们的力量。这不仅仅是关于控制梦境，而是改变现实本身。他们的目标是通过改变人们的潜意识来操控整个世界。任何一个人只要被植入了特定的想法，现实也会因此改变。",
          image: "../img/conversation/前成员/Shane_Winter.png",
        },
        {
          text: "（皱眉）这正是我们需要阻止的。你既然曾经是他们的一员，一定知道他们的弱点。告诉我们，如何破解他们的计划？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（犹豫了一下）在这个梦境中，他们设置了一个时钟。正常人都以为这只是一个普通的时钟，但实际上，它是他们控制梦境的核心，也是时间差异的原因。",
          image: "../img/conversation/前成员/Shane_Winter.png",
        },
        {
          text: "你需要把这个时钟调到一个特定的时间，只有那一个时间，才能逃离这个梦境，也才能阻止他们的计划。",
          image: "../img/conversation/前成员/Shane_Winter.png",
        },
        {
          text: "他们设置了一个谜题，只有解开了这个谜题，才能知道正确的时间。这个谜题刻在下面的石板上，只有按下按钮才会显现。",
          image: "../img/conversation/前成员/Shane_Winter.png",
        },
        {
          text: "我只知道这么多，之后只能靠你们自己了。祝你们好运。",
          image: "../img/conversation/前成员/Shane_Winter.png",
        },
        {
          text: "谢谢你，我们一定会成功的。",
          image: "../img/conversation/莱拉/莱拉.png",
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
    if (collisionMap[interactY][interactX] === 3) {
      this.showMessage("你捡到了一个物品！");
      collisionMap[interactY][interactX] = 0;
      }
      if (collisionMap[interactY][interactX] === 6) {
        const dialogues = [
          {
            text: "艾德里安！我找到了些关于那个神秘组织的信息，我们需要谈谈。",
            image: "../img/conversation/莱拉/莱拉.png",
          },
          {
            text: "莱拉，你来的正好。我也刚刚发现了一些线索。你找到什么了？",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "（递上文件）这些资料显示，这个组织利用梦境技术来操控人们的意识，改变他们的行为。这比我们想象的要复杂得多。",
            image: "../img/conversation/莱拉/莱拉.png",
          },
          {
            text: "（查看文件，皱眉）这些信息确实很惊人。如果这是真的，那么我们面对的可能不仅仅是一个普通的敌人，而是一个精心策划的全球性阴谋。",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "我们得深入调查，你愿意和我一起合作吗？",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "请你做出你的选择，莱拉。你是决定与艾德里安合作，还是选择独自一人？",
            image: "../img/conversation/精灵/精灵.png",
            options: ["与艾德里安合作->", "独自前行->"], // 添加选项
          }
        ];
      
        const choiceDialogues = {
          cooperate: [
            {
              text: "莱拉决定信任艾德里安。他们需要更多的情报来了解这个组织的真正面目。",
              image: "../img/conversation/精灵/精灵.png",
            },
            {
              text: " （坚定地）好吧，艾德里安，我们再一次联手。我感觉到，这次我们面对的不只是普通的梦境……",
              image: "../img/conversation/莱拉/莱拉.png",
            },
            {
              text: "（微笑）那我们就一起深入这次梦境吧。我知道一个前成员的下落，他曾经是组织的核心，现在躲藏在一个城堡中。他可能会有我们需要的答案。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            }
          ],
          abandon: [
            {
              text: "莱拉决定独自行动，她觉得艾德里安可能隐藏着什么。",
              image: "../img/conversation/精灵/精灵.png",
            },
            {
              text: " （决绝）艾德里安，我想这次我需要单独行动。你知道的太多了，但我不知道该不该完全信任你",
              image: "../img/conversation/莱拉/莱拉.png",
            },
            {
              text: "（叹气）我明白你的顾虑，莱拉。但愿你知道自己在做什么。祝你好运。",
              image: "../img/conversation/艾德里安/艾德里安.png",
            }
          ]
        };
        let playerAlignment = null; // 初始为空，表示玩家未做出选择
        // 添加CSS样式
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
          var index = window.localStorage.userid;
var array = JSON.parse(window.localStorage.userArr);
          if (option === "与艾德里安合作->") {array[index].choose1 = 2;
            dialogues.push(...choiceDialogues.cooperate);
          } else if (option === "独自前行->") {
            dialogues.push(...choiceDialogues.abandon);
            array[index].choose1 = 3;
          }
         window.localStorage.userArr = JSON.stringify(array);
          currentDialogue++;          
          showNextDialogue();
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
