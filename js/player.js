class Player {
  
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/莱拉1/down0.png";
    this.width = 32;
    this.height = 52;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
    this.bug=0;
    this.decrypt=0;
    this.dialoguep=0;
    this.frameIndex = 0; // 当前帧索引
    this.frameDelay = 0; // 帧间隔计时器
    this.frameInterval = 30; // 每隔多少次update切换一次帧
    this.direction = "down"; // 默认方向
    this.isdialogue = 0;
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
    if (collisionMap[newY][newX] === 2 || collisionMap[newY][newX] === 3 || collisionMap[newY][newX] === 6 || collisionMap[newY][newX] === 7)
      this.showMessage("按E键交互 ");
    if (collisionMap[newY][newX] === 20) {
      this.showMessage("前往出生地左边的塔下找到艾德里安");
    }
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
    show(collisionMap) {
      const playerCenterX = map.image.width / 2;
      const playerCenterY = map.image.height / 2;
  
      const offsetX = window.map.offsetX;
      const offsetY = window.map.offsetY;
  
      const interactX = Math.floor(playerCenterX + offsetX);
      const interactY = Math.floor(playerCenterY + offsetY);
  
      // 检测是否有物品
      if (collisionMap[interactY][interactX] === 2 || collisionMap[interactY][interactX] === 3 )
        this.showMessage("按E键查看交互 ");
        
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
            // let closeButton = document.createElement('button');
            // closeButton.innerHTML = 'X';
            // closeButton.style.position = 'absolute';
            // closeButton.style.top = '10px';
            // closeButton.style.right = '240px';
            // closeButton.style.backgroundColor = 'red';
            // closeButton.style.color = 'white';
            // closeButton.style.border = 'none';
            // closeButton.style.padding = '5px 10px';
            // closeButton.style.cursor = 'pointer';
            // closeButton.style.fontSize = '16px';
            // closeButton.style.zIndex = '1001'; // Ensure it appears above the image
        
            // Append the button to the image's parent (body)
            // document.body.appendChild(closeButton);
        
            // Add event listener to close the image on button click
            // closeButton.addEventListener('click', function () {
            //     image.style.display = 'none';
            //     closeButton.style.display = 'none';
            // });
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
    if (collisionMap[y][x] === 3||collisionMap[y][x] === 6||collisionMap[y][x] === 7||collisionMap[y][x] === 20) {
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
        this.bug++;
        this.dialoguep++;
        if (this.puzzle === 4) {
         const dialogues = [
          {
             text:"果然如此，这些碎片是拼图的一部分。但这些碎片实在太晦涩了，看来我们需要找到更多的碎片才能修复这个拼图。",
          image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
          }
         
         ]
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
      
      
      const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isdialogue = 1;
          dialogText.innerText = dialogues[currentDialogue].text;
          lailaImage.src = dialogues[currentDialogue].image;
          currentDialogue++;
        } else {
          self.isdialogue = 0;
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
      }
      document.addEventListener("click", showNextDialogue);
      showNextDialogue();
      this.updateAdjacentPieces(interactX, interactY);
        }
        if (this.puzzle === 8) {
          const dialogues = [
           {
              text:"emmmm,这是企业家吗？这些碎片看起来有点眼熟，但是我还是不太确定。",
           image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
           }
          ]
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
       
       const self = this;
 
       function showNextDialogue() {
         if (currentDialogue < dialogues.length) {
            self.isdialogue = 1;
           dialogText.innerText = dialogues[currentDialogue].text;
           lailaImage.src = dialogues[currentDialogue].image;
           currentDialogue++;
         } else {
            self.isdialogue = 0;
           document.body.removeChild(dialogBox);
           document.getElementById("gameCanvas").style.display = "block";
           requestAnimationFrame(mainLoop);
         }
       }
       document.addEventListener("click", showNextDialogue);
       showNextDialogue();
       this.updateAdjacentPieces(interactX, interactY);
         }
         if (this.puzzle ===12) {
          const dialogues = [
           {
              text:"这肯定！肯定是那个企业家，不过与他讲话的这个人是谁？",
           image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
           }
          ]
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
       
        const self = this;
 
       function showNextDialogue() {
         if (currentDialogue < dialogues.length) {
            self.isdialogue = 1;
           dialogText.innerText = dialogues[currentDialogue].text;
           lailaImage.src = dialogues[currentDialogue].image;
           currentDialogue++;
         } else {
            self.isdialogue = 0;
           document.body.removeChild(dialogBox);
           document.getElementById("gameCanvas").style.display = "block";
           requestAnimationFrame(mainLoop);
         }
       }
       document.addEventListener("click", showNextDialogue);
       showNextDialogue();
       this.updateAdjacentPieces(interactX, interactY);
         }
         setTimeout(() => {
          this.showMessage(`你收集了碎片（${this.puzzle}/16）`);
        }, 2000); // 延迟2秒显示消息
       
        if (this.puzzle === 16) {
          const dialogues = [
            {
                 text:"咦，这个标识。难道……企业家正和那个神秘组织合作？这怎么会……",
                  image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
            },
            {
                  text:"你们是谁？为什么要打扰我的梦境？",
                  image: "../img/conversation/企业家/enterpreneur.png", // 另一张图片
            },
            {
              text:"钢铁城市的街道开始变得不稳定，空气中的机械音越来越尖锐刺耳。",
              image:"../img/conversation/精灵/精灵.png",
            },
            {
              text:"这个梦境已经无法控制了，我们必须尽快离开这里！我找到了漩涡之门的入口！右下角，快来！",
              image:"../img/conversation/艾德里安/艾德里安.png",
            }

          ]
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
          
          
          const self = this;
    
          function showNextDialogue() {
            if (currentDialogue < dialogues.length) {
              self.isdialogue = 1;
              dialogText.innerText = dialogues[currentDialogue].text;
              lailaImage.src = dialogues[currentDialogue].image;
              currentDialogue++;
            } else {
              self.isdialogue = 0;
              document.body.removeChild(dialogBox);
              document.getElementById("gameCanvas").style.display = "block";
              requestAnimationFrame(mainLoop);
            }
          }
    
          document.addEventListener("click", showNextDialogue);
          showNextDialogue();
    
          this.updateAdjacentPieces(interactX, interactY);
          setTimeout(() => {
            this.showMessage("你已集齐了碎片，请通过地图右下角的通道打开去往下一层梦境的大门吧！");
          }, 4000); // 延迟2秒显示消息
        }
        this.updateAdjacentPieces(interactX, interactY);
      }
    }
    // if (collisionMap[interactY][interactX] === 6) {
    //   this.showMessage("你捡到了4块拼图，一共有16块！");
     
    // }
    if (collisionMap[interactY][interactX] === 7) {
      if(this.map===1){
        this.showMessage("你已经得到了藏宝图，快去找拼图吧!记得按M键打开藏宝图。");
        this.updateAdjacentPieces(interactX, interactY);
      }
      else if(this.ai===1){
        this.map=1;
        this.decrypt++;
        const dialogues = [
          {
            text:"莱拉来到一座大厦前。大厦门口的电子屏幕上闪烁着企业家的记忆片段。",
            image: "../img/conversation/精灵/精灵.png", // 另一张图片
          },
          {
               text:"(对讲机传来声音)：看看这个屏幕上的图像，这似乎是一张藏宝图。也许我们可以从这里找到更多的线索。",
               image: "../img/conversation/艾德里安/艾德里安.png", // 对应的图片路径
          },
          {
            text:"恭喜你，找到了机密文件，按M键打开，按K键收起，请你按照机密文件的指示去搜寻碎片吧！",
            image: "../img/conversation/精灵/精灵.png", // 另一张图片
          },
          {
              text:"好的，我来看看。艾德里安，你去搜集其他屏幕上的信息。我们分头行动。",
              image: "../img/conversation/莱拉/莱拉.png", // 另一张图片
          },
          {
            text:"提示：有的建筑物有门，记得从门进去获得拼图！",
            image: "../img/conversation/精灵/精灵.png", // 另一张图片
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
      
      
        
        const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isdialogue = 1;
          dialogText.innerText = dialogues[currentDialogue].text;
          lailaImage.src = dialogues[currentDialogue].image;
          currentDialogue++;
        } else {
          self.isdialogue = 0;
          document.body.removeChild(dialogBox);
          document.getElementById("gameCanvas").style.display = "block";
          requestAnimationFrame(mainLoop);
        }
        }
      document.addEventListener("click", showNextDialogue);
      showNextDialogue();
        this.updateAdjacentPieces(interactX, interactY);
      
    }
      if(this.ai===0)
        {
        
        this.showMessage("你需要先找到艾德里安，才能看到机密文件的指示！");
      }
    }
    if (collisionMap[interactY][interactX] === 6) {
      this.ai=1;
      this.dialoguep++;
      const dialogues = [
        {
          text: "这次的任务，感觉有些不太对劲。文件只提到要获取信息，可为什么感觉像是深陷泥潭？",
          image: "../img/conversation/莱拉/莱拉.png", // 对应的图片路径
        },
        {
        text: "你每次进入梦境都会有这种感觉，莱拉。这就是为什么你是个出色的“编梦者”。你能感知到梦境的脉搏，闻到其中隐藏的秘密。",
        image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
        },
        {
        text: "艾德里安，你总是这么神秘兮兮的。我们这次的目标是什么？文件没有详细说明。",
        image: "../img/conversation/莱拉/莱拉.png", // 精灵        
        },
        {
        text: "目标是一位知名企业家的梦境。据说他的梦境深处隐藏着一份关于全球经济秩序的重要文件。文件的内容非常敏感，可能会引发不可预测的后果。",
        image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
        },
        {
          text: "背景音逐渐变得紧张起来，远处隐约传来机械齿轮转动的声音。",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "听起来像是个大麻烦。我们怎么找到这份文件？",
          image: "../img/conversation/莱拉/莱拉.png", // 精灵        
        },
                  
       {
          text: "我们需要通过电子屏幕获取线索。每块屏幕上都可能播放着梦境主人的记忆片段。仔细观察，它们会指引我们找到文件的位置。",
           image: "../img/conversation/艾德里安/艾德里安.png", // 另一张图片
        },
        {
          text: "你需要找到16块拼图，它们平均分散在四个地方，地图左上角的电子屏幕和右下角的通道入口都有藏宝图",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
        },
        {
          text: "切记，有的拼图在建筑物的门里，你需要进入门才能拿到",
          image: "../img/conversation/精灵/精灵.png", // 另一张图片
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
      
      

      const self = this;

      function showNextDialogue() {
        if (currentDialogue < dialogues.length) {
          self.isdialogue = 1;
          dialogText.innerText = dialogues[currentDialogue].text;
          lailaImage.src = dialogues[currentDialogue].image;
          currentDialogue++;
        } else {
          self.isdialogue = 0;
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
      }, 1000); // 等待0.2秒以完成淡出效果
    }, 500); // 0.2秒后开始淡出
  }
}

const player = new Player();
window.player = player;
function createDialogueBox(dialogues) {
  let currentDialogue = 0;
  let charIndex = 0;
  const typingSpeed = 1; // 每个字符的打印速度（毫秒）

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

  

  function showNextDialogue() {
    if (currentDialogue < dialogues.length) {
      // 更新图片和文本内容
      charImage.src = dialogues[currentDialogue].image;
      dialogText.innerText = dialogues[currentDialogue].text;
      currentDialogue++;
    } else {
      document.body.removeChild(dialogBox);
      document.getElementById("gameCanvas").style.display = "block";
      requestAnimationFrame(mainLoop); // 继续游戏主循环
    }
  }

  document.addEventListener("click", showNextDialogue);
  showNextDialogue();
}
