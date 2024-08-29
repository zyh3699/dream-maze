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
  
    this.puzzle = 0;
    this.ai=0;
    this.map=0;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  MusicPlayer() {//对话框音效
        var music = document.getElementById("music");
        music.play();
        music.loop = false;
        music.preload = true;
        music.volume = 1;
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
  
  
  mapp() {
    if (this.map === 0) {
        this.showMessage("你还没有找到机密文件，请继续寻找吧！");
    } 
    if (this.map === 1) {
        this.showMessage("按K键收起");

        // Create or select the image element
        let image = document.getElementById('mapImage');
        if (!image) {
            image = document.createElement('img');
            image.id = 'mapImage';
            image.src = '../img/bgr/chapter0_map.png'; // replace with the actual path to your image
            image.style.position = 'fixed';
            image.style.top = '50%';
            image.style.left = '50%';
            image.style.transform = 'translate(-50%, -50%)';
            image.style.zIndex = '1000';
            image.style.width = '1350px'; // Set the width
            image.style.height = '900px'; // Set the height
            image.style.border = '15px solid white'; // Set border size, style, and color
            document.body.appendChild(image);
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
          this.MusicPlayer();
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
    if(collisionMap[interactY][interactX] === 7){
      if(this.ai===1){
        this.map=1;
      this.showMessage("恭喜你，找到了机密文件，按M键打开，按K键收起，请你按照机密文件的指示去搜寻碎片吧！");
      this.updateAdjacentPieces(interactX, interactY);}
      if(this.ai===0)
        {
        
        this.showMessage("你需要先找到艾德里安，才能看到机密文件的指示！");
        this.updateAdjacentPieces(interactX, interactY);
      }
    }
    if (collisionMap[interactY][interactX] === 6) {
      this.ai=1;
      const dialogues = [
        {
          text: "这地方让我有种不祥的预感，艾德里安。你确定文件就在这里？",
          image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
},
{
 text: "根据我们的线索，梦境的深处藏着答案。我们必须保持警惕，这位企业家的潜意识比我们想象的要复杂得多。",
 image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
},
 {
 text: "莱拉和艾德里安在城市的迷宫中穿行，高楼大厦上闪烁的电子屏幕播放着梦境主人的记忆片段，像一张巨大的拼图等待解开。",
 image: "../img/conversation/精灵/精灵.png", // 精灵        
 },
 {
 text: "这些画面……是他过去的片段？每一个都透露出他的某种心情和意图。",
 image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
 },
 {
 text: "是的。我们必须去寻找那块电子屏幕，找到机密文件，把这些碎片拼接起来，才能找到他想隐藏的秘密。",
 image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
        }
        
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
