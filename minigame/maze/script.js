// script.js
document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const fog = document.getElementById('fog');
    const mazeCanvas = document.getElementById('mazeCanvas');
    const mazeContext = mazeCanvas.getContext('2d');
    const step = 10;
    const radius = 30;
    const targetArea = {
        top: 94,  // 替换为你设定的目标区域顶部的 y 坐标
        left: 94, // 替换为你设定的目标区域左边的 x 坐标
        width: 50, // 替换为目标区域的宽度
        height: 50 // 替换为目标区域的高度
    };
    // 烟雾图片数组
    // const smokeImages = [
    //     'img/Smoke/0000.png',
    //     'img/Smoke/0001.png','img/Smoke/0002.png','img/Smoke/0003.png','img/Smoke/0004.png',
    //     'img/Smoke/0005.png','img/Smoke/0006.png','img/Smoke/0007.png','img/Smoke/0008.png',
    //     'img/Smoke/0009.png','img/Smoke/0010.png','img/Smoke/0011.png','img/Smoke/0012.png',
    //     'img/Smoke/0013.png','img/Smoke/0014.png','img/Smoke/0015.png','img/Smoke/0016.png',
    //     'img/Smoke/0017.png','img/Smoke/0018.png','img/Smoke/0019.png','img/Smoke/0020.png',
    //     'img/Smoke/0021.png','img/Smoke/0022.png','img/Smoke/0023.png','img/Smoke/0024.png',
    //     'img/Smoke/0025.png','img/Smoke/0026.png','img/Smoke/0027.png','img/Smoke/0028.png',
    //     'img/Smoke/0029.png','img/Smoke/0030.png','img/Smoke/0031.png','img/Smoke/0032.png',
    //     'img/Smoke/0033.png','img/Smoke/0034.png','img/Smoke/0035.png','img/Smoke/0036.png',
    //     'img/Smoke/0037.png','img/Smoke/0038.png','img/Smoke/0039.png','img/Smoke/0040.png',
    //     'img/Smoke/0041.png','img/Smoke/0042.png','img/Smoke/0043.png','img/Smoke/0044.png',
    //     'img/Smoke/0045.png','img/Smoke/0046.png','img/Smoke/0047.png','img/Smoke/0048.png',
    //     'img/Smoke/0049.png','img/Smoke/0050.png','img/Smoke/0051.png','img/Smoke/0052.png',
    //     'img/Smoke/0053.png','img/Smoke/0054.png','img/Smoke/0055.png','img/Smoke/0056.png',
    //     'img/Smoke/0057.png','img/Smoke/0058.png','img/Smoke/0059.png','img/Smoke/0060.png',
    //     'img/Smoke/0061.png','img/Smoke/0062.png','img/Smoke/0063.png','img/Smoke/0064.png',
    //     'img/Smoke/0065.png','img/Smoke/0066.png','img/Smoke/0067.png','img/Smoke/0068.png',
    //     'img/Smoke/0069.png','img/Smoke/0070.png','img/Smoke/0071.png','img/Smoke/0   072.png',
    //     'img/Smoke/0073.png','img/Smoke/0074.png','img/Smoke/0075.png','img/Smoke/0076.png',
    //     'img/Smoke/0077.png','img/Smoke/0078.png','img/Smoke/0079.png','img/Smoke/0080.png',
    //     'img/Smoke/0081.png','img/Smoke/0082.png','img/Smoke/0083.png','img/Smoke/0084.png',
    //     'img/Smoke/0085.png','img/Smoke/0086.png','img/Smoke/0087.png','img/Smoke/0088.png',
    //     'img/Smoke/0089.png','img/Smoke/0090.png'
        
    // ];

    // let currentImageIndex = 0;

    // // 切换烟雾图片的函数
    // function changeFogImage() {
    //     fog.style.backgroundImage = `url(${smokeImages[currentImageIndex]})`;
    //     currentImageIndex = (currentImageIndex + 1) % smokeImages.length;
    // }

    // // 设置每隔 3 秒切换一次背景图片
    // setInterval(changeFogImage, 200);
 // 将迷宫图片绘制到 canvas 上
 let timeLeft = 120; // 总时间，单位为秒
 let timeminus=1;
const totalTime = timeLeft; // 用于计算进度条的初始宽度

const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('time-bar-progress');

const countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft-=timeminus;
        timerElement.textContent = timeLeft;

        // 计算进度条的宽度
        const progressWidth = (timeLeft / totalTime) * 100;
        progressBar.style.width = `${progressWidth}%`;
    } else {
        clearInterval(countdownInterval);
        alert('Time is up! Game over!');
        alert("获得成就“梦境守卫者”");
        window.location.href = 'smoke2/demo.html';
        clearInterval(countdownInterval);

        var index = window.localStorage.userid;
        var array = JSON.parse(window.localStorage.userArr);
        array[index].achi3 = 1;
        console.log("index:", index); // 确认index的值
        console.log("array:", array); // 确认array是否被正确解析
        console.log("array[index]:", array[index]); // 确认 array[index] 是否有效
        console.log("array[index].achi3:", array[index].achi3);

        window.localStorage.userArr = JSON.stringify(array);
        // 你可以在这里添加更多逻辑来处理游戏结束
        window.location.href = "smoke2/demo.html"; // 跳转到首页
    }
}, 1000);

 const mazeImage = new Image();
 mazeImage.src = 'img/mazered.jpg'; // 替换为你的迷宫图片路径
 mazeImage.onload = () => {
     mazeContext.drawImage(mazeImage, 0, 0, mazeCanvas.width, mazeCanvas.height);
 };
  // 获取某个位置的像素颜色

function getPixelColor(x, y) {
    const pixel = mazeContext.getImageData(x, y, 1, 1).data;
    return pixel[0]; // 返回红色通道的值
}
function getPixelColor1(x, y) {
    const pixel = mazeContext.getImageData(x, y, 1, 1).data;
    return pixel[1]; // 返回红色通道的值
}
function getPixelColor2(x, y) {
    const pixel = mazeContext.getImageData(x, y, 1, 1).data;
    return pixel[2]; // 返回红色通道的值
}
    // 检查当前位置是否为障碍物（红色通道值大于230）
    function isCollision(x, y) {
        const redValue = getPixelColor(x, y);
        return redValue > 200; // 如果红色通道值大于230，则认为是障碍物
    }
document.addEventListener('keydown', (e) => {
    let newTop = player.offsetTop;
    let newLeft = player.offsetLeft;

    switch (e.key) {
        case 'ArrowUp': case 'w':case 'W':
            newTop -= step;
            player.style.backgroundImage = "url('img/player/laila up.png')";  // 显示向上的图标
            break;
        case 'ArrowDown':case 's':case 'S':
            newTop += step;
            player.style.backgroundImage = "url('img/player/laila down.png')";  // 显示向下的图标
            break;
        case 'ArrowLeft':case 'a':case 'A':
            newLeft -= step;
            player.style.backgroundImage = "url('img/player/laila left.png')";  // 显示向左的图标
            break;
        case 'ArrowRight':case 'd':case 'D':
            newLeft += step;
            player.style.backgroundImage = "url('img/player/laila right.png')";  // 显示向右的图标
            break;
    }

     if (newTop >= 0 && newTop <= fog.clientHeight - player.clientHeight &&
         newLeft >= 50 && newLeft <= 800) 
    {

        // 检查新位置的中心点是否是红色
        const centerX = newLeft+8 ;
        const centerY = newTop +30;
   
        if (!isCollision(centerX, centerY)) {
            player.style.top = `${newTop}px`;
            player.style.left = `${newLeft}px`;
            console.log(`Player Top: ${newTop}, Left: ${newLeft}`);
            console.log(`Target Top: ${targetArea.top}, Bottom: ${targetArea.top + targetArea.height}`);
            console.log(`Target Left: ${targetArea.left}, Right: ${targetArea.left + targetArea.width}`);
            const fogX = newLeft + player.clientWidth / 2;
            const fogY = newTop + player.clientHeight / 2;
            if (newTop >= targetArea.top && newTop <= targetArea.top + targetArea.height &&
                newLeft >= targetArea.left && newLeft <= targetArea.left + targetArea.width) {
             alert('获得成就“迷宫大师”');
                clearInterval(countdownInterval);
                    var index = window.localStorage.userid;
					var array = JSON.parse(window.localStorage.userArr);
                    array[index].achi2 = 1;
					console.log('index:', index);  // 确认index的值
console.log('array:', array);  // 确认array是否被正确解析
console.log('array[index]:', array[index]);  // 确认 array[index] 是否有效
              console.log('array[index].achi2:', array[index].achi2); 
              window.localStorage.userArr = JSON.stringify(array);
                window.location.href = "../../html/chapter2.html"; // 跳转到下一个页面
                }
                if(getPixelColor2(centerX, centerY) >= 249){
                    timeminus=2;
                   
                    const dialogues = [
                        {
                          text: "注意！注意！梦境守卫开始出现，前成员潜意识的防御机制启动，时空扭曲开启!",
                          image: "../../img/conversation/精灵/Dwarf.png", // 对应的图片路径
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
                if(getPixelColor(centerX, centerY) <=3 && getPixelColor1(centerX, centerY) >=175 ){
                    timeminus=4;
                   
                    const dialogues = [
                        {
                          text: "时空畸变加剧！请尽快离开！请尽快离开！",
                          image: "../../img/conversation/精灵/Dwarf.png", // 对应的图片路径
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
            // fog.style.clipPath = `circle(${radius}px at ${fogX}px ${fogY}px)`;
        }
    }
});
});
