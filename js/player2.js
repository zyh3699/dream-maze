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
    this.dialogDoorghost=0;
    this.dialogCuckoo=0;
    this.dialogMirror=0;
    this.dialogPhone=0;
    this.dialogFrog=0;
    this.dialogFazhen=0;
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
    if (collisionMap[interactY][interactX] === 20) {
      this.showMessage("这个小幽灵好像睡着了...这个地方？这些刷怪笼是用来干什么的？这个法阵又通往何处？");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 21) {
      this.showMessage("这里有个会发光的镜子");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 22) {
      this.showMessage("这只猫...是在对我笑吗？");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 23) {
      this.showMessage("正常人会在这里放个玩偶吗...");
      collisionMap[interactY][interactX] = 0;
    }

    if (collisionMap[interactY][interactX] === 14) {
      this.showMessage("为什么总感觉有好多双眼睛在看着我...");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 15) {
      this.showMessage("这个玩偶我在卡尔的办公室见到过！卡尔一定来过这里！");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 16) {
      this.showMessage("散落在地上的书？看起来没什么用");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 17) {
      this.showMessage("这只是个普通的镜子，这个房间好多镜子啊");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 18) {
      this.showMessage("伪装成小提琴乐谱的附魔书？想要骗过谁，又能骗过谁呢？不对，这...");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 19) {
      this.showMessage("结满蜘蛛网的房间吗？但是为什么隐隐的有音乐声？");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 11) {
      this.showMessage("悦耳的风铃声，好奇怪，如此奇异的地方竟会有那么清脆的让人愉快的声音。一定是魔法。");
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 12) {
      this.showMessage("一阵浓郁的药草香，但是你感觉真的很好闻，清新中带着一股纯真");
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
    if (collisionMap[interactY][interactX] === 5 && this.dialogDoorghost===0 && this.dialogCuckoo===0) {
      this.dialogDoorghost=1;
      const dialogues = [
        {
          text: "我知道你会来的。莱拉，我能感受到你。",
          image: "../img/conversation/其他人物/ghost.png",
        },
        {
          text: "你，你是？？？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "如你所见，现在是个幽灵(你察觉到指向不明的愤怒)",
          image: "../img/conversation/其他人物/ghostangry.png",
        },
        {
          text: "...欢迎来到alpha幻境...曾经，正如你的心自由的听从你的意识，我也...",
          image: "../img/conversation/其他人物/ghost.png",
        },
        {
          text: "...直到那个组织...（闭口不语）",
          image: "../img/conversation/其他人物/ghostangry.png",
        },
        {
          text: "（试探性）先生？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "去找布谷钟吧...莱拉，把握住...咳咳咳...千万别，沦为囚徒...囚禁，我的宿命...",
          image: "../img/conversation/其他人物/ghost.png",
        } ,       
        {
          text: "（着急）把握住什么？先生？先生？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（幽灵缓缓闭上眼，若有若无的身躯似乎比之前散发出更多的寒意。看样子不会再跟你多说些什么了。）",
          image: "../img/conversation/其他人物/ghost.png",
        },
        {
          text: "请去找房间里的布谷钟，按E跟他对话。",
          image: "../img/conversation/精灵/Dwarf.png",
        }
      ];      
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 5 && this.dialogDoorghost===1 && this.dialogCuckoo===0) {
      const dialogues = [
        {
          text: "（幽灵皱了皱眉。始终闭着眼。看样子不会再跟你多说些什么了。）",
          image: "../img/conversation/其他人物/ghost.png",
        },
        {
          text: "请去找房间里的布谷钟，按E跟他对话。",
          image: "../img/conversation/精灵/Dwarf.png",
        }
      ];      
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 7 && this.dialogDoorghost===1 && this.dialogCuckoo===0) {
      this.dialogCuckoo=1;
      const dialogues = [
        {
          text: "Cuckoo！我有时间调回的能力。现在请看...",
          image: "../img/conversation/其他人物/cuckoo.png",
        },
        {
          text: "（未及思索，你的眼前便浮现出一幕一幕回忆。）",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: " （神情凝重）艾德里安，我们得到的信息越来越奇怪。这个组织想掌控的不只是财富和权力，他们的目标似乎是更深层的东西……控制人类的集体潜意识，改变未来？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（若有所思）是啊，听起来像是科幻小说，但我们都知道这比小说更可怕。集体潜意识？他们究竟打算怎么做？",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "（艾德里安很自然的走近前面的机关门，往一个特定的角度轻轻的转动了门环，门就开了）",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "（惊讶地）艾德里安，你不觉得……你对这些梦境的了解太多了吗？有时候，我感觉你甚至比我还清楚接下来会发生什么。",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（略显迟疑）嗯……可能是因为我有些经验吧。毕竟，我一直在研究这些东西……",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "（艾德里安的行为变得有些不自然，他的目光闪烁，似乎在隐藏着什么。）",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "Cuckoo@@@！T T。我能告诉你的就这些了，自从那一年的那个夜晚，我的法术几乎全被组织封印了。",
          image: "../img/conversation/其他人物/cuckoo.png",
        },
        {
          text: "去找小魔吧。",
          image: "../img/conversation/其他人物/cuckoo.png",
        },
        {
          text: "小魔是一面附魔镜子，看起来和普通镜子没什么两样。请在房间内找到小魔，跟他对话，获取更多的信息。",
          image: "../img/conversation/精灵/精灵.png",
        },
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 7 && this.dialogDoorghost===1 && this.dialogCuckoo===1 && this.dialogMirror===0) {
      const dialogues = [
        {
          text: "去找小魔吧。告诉他我们都很想他。",
          image: "../img/conversation/其他人物/cuckoo.png",
        },
        {
          text: "小魔是一面附魔镜子，看起来和普通镜子没什么两样。（房间内有不只一面镜子！）请在房间内找到小魔，跟他对话，获取更多的信息。",
          image: "../img/conversation/精灵/精灵.png",
        },
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 6 && this.dialogCuckoo===1 && this.dialogMirror===0) {
      this.dialogMirror=1;
      const dialogues = [
        {
          text: "（透过镜子，你看到了什么？）",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "当你凝视深渊的时候，深渊也在凝视着你。",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（一幕场景在镜子里浮现...）",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "...神秘实验...对......嘘！别直说...",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "...对...YOU-KNOW-WHAT......那真实的目的又是...",
          image: "../img/conversation/艾德里安/艾德里安.png",
        },
        {
          text: "看样子，艾德里安曾经通过这个镜子，与远处的某个人联系......",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "艾德里安到底在隐藏什么？这些“秘密实验”又是什么？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "莱拉！莱拉！",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
        {
          text: "（画面渐渐消失...你听到小魔在跟你说话，猛然回神）嗯嗯？",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "有人告诉我，你能够帮我们逃离这个梦境！请救救我们！",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "我只知道这些！你刚刚找过布谷了，还有谁...对，去找神秘电话吧！",
          image: "../img/conversation/莱拉/莱拉.png",
        },            
        {
          text: "请找到房间内的神秘电话机。",
          image: "../img/conversation/精灵/精灵.png",
        },
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 6 && this.dialogCuckoo===1 && this.dialogMirror===1 && this.dialogPhone===0) {
      const dialogues = [
        {
          text: "当你凝视深渊的时候，深渊也在凝视着你。",
          image: "../img/conversation/其他人物/ghost.png",
        },
        {
          text: "有人告诉我，你能够帮我们逃离这个梦境！请救救我们！",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "我只知道这些了。去找神秘电话机吧。",
          image: "../img/conversation/莱拉/莱拉.png",
        },            
        {
          text: "请找到房间内的神秘电话机。",
          image: "../img/conversation/精灵/精灵.png",
        },
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 8 && this.dialogMirror===1 && this.dialogPhone===0) {
      this.dialogPhone=1;
      const dialogues = [
        {
          text: "（惊恐）别过来！！！",
          image: "../img/conversation/其他人物/phone.png",
        },
        {
          text: "（后退一步）电话先生？附魔镜...不对，小魔让我来找你。",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "莱拉。你是莱拉。卡尔先生告诉我你一定会来的。他为你留下了一通留言。接吧，孩子。",
          image: "../img/conversation/其他人物/phone.png",
        },
        {
          text: "卡尔？！（嘟嘟嘟嘟...你上前接起了听筒）",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（传来卡尔虚弱的声音）莱拉...我的时间不多了...如你所见，这个房间封印着许多曾经伟大的巫师。咳咳...",
          image: "../img/conversation/卡尔/卡尔.png",
        },
        {
          text: "艾德里安跟你一起吗，小心他。",
          image: "../img/conversation/卡尔/卡尔.png",
        },
        {
          text: "如果我还活着，他们会告诉你我在哪里...千万小心，那个组织...",
          image: "../img/conversation/卡尔/卡尔.png",
        },  
        {
          text: "（嘟嘟嘟嘟...留言结束了）",
          image: "../img/conversation/其他人物/phone.png",
        },
        {
          text: "有人告诉我，你能够帮我们逃离这个梦境！请救救我们！",
          image: "../img/conversation/其他人物/phone.png",
        },
        {
          text: "（惊）又是这句话！那个组织真的存在！这个梦境！",
          image: "../img/conversation/莱拉/莱拉.png",
        },            
        {
          text: "难，蜀道难，也不过如此。去找青蛙王子吧，邪恶的巫术，他曾经多么俊朗......",
          image: "../img/conversation/其他人物/phone.png",
        },
        {
          text: "请找到在某个房间内的戴着帽子的低调青蛙王子。",
          image: "../img/conversation/精灵/精灵.png",
        },            
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 8 && this.dialogMirror===1 && this.dialogPhone===1 && this.dialogFrog===0) {
      const dialogues = [
        {
          text: "......（嘟嘟嘟嘟嘟嘟）",
          image: "../img/conversation/其他人物/phone.png",
        },
        {
          text: "请找到在某个房间内的戴着帽子的低调青蛙王子。",
          image: "../img/conversation/精灵/精灵.png",
        },            
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 9 && this.dialogPhone===1 && this.dialogFrog===0) {
      this.dialogFrog=1;
      const dialogues = [
        {
          text: "你好。买巫师帽吗？买附魔梭子吗？买隐形药水吗？",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "你是青蛙王子？电话先生让我来找你。卡尔！你知道卡尔对吧！",
          image: "../img/conversation/莱拉/莱拉.png",
        },
        {
          text: "（沉思）不要怕。你是莱拉。对，只有莱拉才能得到幽灵的答复。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "卡尔还没死。他在法阵里。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "你的处境很危险！小心！别被组织的陷阱抓住。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "哦对了，经过我右边的房间了吗，没经过的话，你可以去看看。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "请一定要救出卡尔。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "卡尔，我来救你了...",
          image: "../img/conversation/莱拉/莱拉.png",
        },  
        {
          text: "当前任务：找到法阵，见到卡尔",
          image: "../img/conversation/精灵/精灵.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 9 && this.dialogPhone===1 && this.dialogFrog===1) {
      const dialogues = [
        {
          text: "(神秘)经过我右边的房间了吗，没经过的话，你可以去看看。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "不过别逗留太久。",
          image: "../img/conversation/其他人物/frog.png",
        },
        {
          text: "另外，请一定要救出卡尔。他在法阵里。",
          image: "../img/conversation/其他人物/frog.png",
        },  
        {
          text: "当前任务：找到法阵，见到卡尔",
          image: "../img/conversation/精灵/精灵.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 13 && this.dialogFrog===1 && this.dialogFazhen===0) {
        const dialogues = [
          {
            text: "我在梦里梦到一个依稀记得的梦...前进就是唯一的退路。",
            image: "../img/conversation/其他人物/fazhen.png", // 另一张图片
          },
          {
            text: "请回答：为什么不要用现实中的事情来制造梦境？",
            image: "../img/conversation/其他人物/fazhen.png", // 另一张图片
            options: ["那会让你分不清梦境和现实->", "因为现实和梦境没有区别->"], // 添加选项
          },
        ]; 
        const choiceDialogues = {
          cooperate: [
            {
              text: "认证通过。法阵欢迎您。",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "对不起......我还是太虚弱了，我没有保护好卡尔...",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "什么？",
              image: "../img/conversation/莱拉/莱拉.png",
            },
            {
              text: "我是附在法阵上的魂灵。卡尔...被他们抓走了...",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "这层梦境原本是一片荒凉...卡尔为你，也为我们搭建了一个暂时的安全之地。",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "但是，依旧没逃过他们的搜查.....",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "我们这些被诅咒的人，只留下一些断断续续的记忆...",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "（低头）我该怎么办？",
              image: "../img/conversation/莱拉/莱拉.png",
            },
            {
              text: "我的力量是无穷的，我是个传送法阵...但被封印住了，又有什么用呢？",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "你一定要找到卡尔，他知道怎么解封我。",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "勇敢点，莱拉。拯救卡尔，拯救我们，也拯救你自己。",
              image: "../img/conversation/其他人物/fazhen.png",
            },  
            {
              text: "去我左边地上的刷怪笼吧。",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "那是一个暗道，卡尔被困在下一层梦境里。",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "记住，无论怎么样，不要放弃！",
              image: "../img/conversation/其他人物/fazhen.png",
            },
            {
              text: "请去法阵左侧的刷怪笼（按E进入暗道），迎接下一个挑战，拯救卡尔，拯救他们，拯救你自己",
              image: "../img/conversation/莱拉/莱拉.png",
            },  
              ],
          abandon: [
            {
              text: "你错了",
              image: "../img/conversation/其他人物/fazhen.png", // 另一张图片
            },
            {
              text: "你不是我要找的人",
              image: "../img/conversation/其他人物/fazhen.png", // 另一张图片
            },
            {
              text: "你是组织的人。这里不欢迎你。",
              image: "../img/conversation/其他人物/fazhen.png", // 另一张图片
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
          if (currentDialogue < dialogues.length) {
            dialogText.innerText = "";
            lailaImage.src = dialogues[currentDialogue].image;
            optionsContainer.innerHTML = ""; // 清空选项按钮
            typeDialogue();
          } else {
            document.body.removeChild(dialogBox);
            // self.showPasswordPrompt();
            // self.visit = 1;
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
          if (option === "那会让你分不清梦境和现实->") {
            self.dialogFazhen=1;
          }
          if (option === "那会让你分不清梦境和现实->") {
            dialogues.push(...choiceDialogues.cooperate);
            // this.dialogFazhen=1;
          } else if (option === "因为现实和梦境没有区别->") {
            dialogues.push(...choiceDialogues.abandon);
          }
          currentDialogue++;          
          showNextDialogue();
        }
        document.addEventListener("click", showNextDialogue);
        showNextDialogue();
            collisionMap[interactY][interactX] = 0;
      }
    if (collisionMap[interactY][interactX] === 13 && this.dialogFrog===1 && this.dialogFazhen===1) {
      const dialogues = [
        {
          text: "我在梦里梦到一个依稀记得的梦...前进就是唯一的退路。",
          image: "../img/conversation/其他人物/fazhen.png",
        },
        {
          text: "(喃喃自语)对不起......卡尔......",
          image: "../img/conversation/其他人物/fazhen.png",
        },
        {
          text: "请勇敢前往左侧的刷怪笼，在下一层梦境找到卡尔。按E进入。",
          image: "../img/conversation/精灵/精灵.png",
        },  
      ];
      createDialogueBox(dialogues);
      collisionMap[interactY][interactX] = 0;
    }
    if (collisionMap[interactY][interactX] === 10) {
        const dialogues = [
          {
            text: "你好！",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "（艾德里安？？？但是为什么看起来这么年轻？）",
            image: "../img/conversation/莱拉/莱拉.png",
          },
          {
            text: "需要帮忙吗？",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "...",
            image: "../img/conversation/莱拉/莱拉.png",
          },  
          {
            text: "那我先炼药了！",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },
          {
            text: "安得广厦千万间，大庇天下寒士俱欢颜......",
            image: "../img/conversation/艾德里安/艾德里安.png",
          }, 
          {
            text: "(原来，艾德里安曾经是这样有志气的巫师...只不过，现在的艾德里安，还是这样的吗？)",
            image: "../img/conversation/莱拉/莱拉.png",
          },
          {
            text: "（担忧）看来这里也是幻象了......",
            image: "../img/conversation/莱拉/莱拉.png",
          },    
          {
            text: "（传来小艾德里安的歌声）一颗小小的意念种子，也会生根成形，它可能成就你，也可能毁了你～",
            image: "../img/conversation/艾德里安/艾德里安.png",
          },              
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



// function createDialogueBox(dialogues) {
//   let currentDialogue = 0;
//   let charIndex = 0;
//   const typingSpeed = 50; // 每个字符的打印速度（毫秒）

//   // 添加CSS样式
//   if (!document.getElementById("dialogue-style")) {
//     const style = document.createElement("style");
//     style.id = "dialogue-style";
//     style.innerHTML = `
//       #dialogue {
//           background: rgba(0, 0, 0, 0.7);
//           padding: 20px;
//           border-radius: 10px;
//           width: 80%;
//           height: 100px;
//           text-align: center;
//           position: fixed;
//           bottom: 20px;
//           left: 50%;
//           transform: translateX(-50%);
//           color: white;
//           font-size: 24px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           box-sizing: border-box;
//       }
//       #dialogue img {
//           position: absolute;
//           top: -100px;
//           left: 10px;
//           width: 100px;
//           height: 100px;
//       }`;
//     document.head.appendChild(style);
//   }

//   // 创建对话框元素
//   const dialogBox = document.createElement("div");
//   dialogBox.id = "dialogue";

//   // 创建图片元素
//   const charImage = document.createElement("img");
//   charImage.alt = "Character Image";
//   dialogBox.appendChild(charImage);

//   // 创建对话文本元素
//   const dialogText = document.createElement("span");
//   dialogText.id = "dialogueText";
//   dialogBox.appendChild(dialogText);
//   document.body.appendChild(dialogBox);

//   function typeDialogue() {
//     if (charIndex < dialogues[currentDialogue].text.length) {
//       dialogText.innerText += dialogues[currentDialogue].text.charAt(charIndex);
//       charIndex++;
//       setTimeout(typeDialogue, typingSpeed);
//     } else {
//       currentDialogue++;
//       charIndex = 0;
//     }
//   }

//   function showNextDialogue() {
//     if (currentDialogue < dialogues.length) {
//       // 更新图片和文本内容
//       charImage.src = dialogues[currentDialogue].image;
//       dialogText.innerText = "";
//       typeDialogue();
//     } else {
//       document.body.removeChild(dialogBox);
//       document.getElementById("gameCanvas").style.display = "block";
//       requestAnimationFrame(mainLoop); // 继续游戏主循环
//     }
//   }

//   dialogBox.addEventListener("click", showNextDialogue);
//   showNextDialogue();
// }
function createDialogueBox(dialogues) {
  let currentDialogue = 0;

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
      dialogText.innerText = dialogues[currentDialogue].text; // 直接显示整个文本
      currentDialogue++;
    } else {
      document.body.removeChild(dialogBox);
      document.getElementById("gameCanvas").style.display = "block";
      requestAnimationFrame(mainLoop); // 继续游戏主循环
    }
  }

  dialogBox.addEventListener("click", showNextDialogue);
  showNextDialogue();
}
