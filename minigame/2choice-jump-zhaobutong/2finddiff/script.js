let totalDifferences = 7; // 总的不同处
let foundDifferences = 0; // 已经找到的不同处
let timerDuration = 30; // 初始总时间
let timeRemaining = timerDuration; // 剩余时间
let timerBar = document.getElementById('timer-bar');
let countdownTimer = document.getElementById('countdown-timer');
let statusTimerBarInner = document.getElementById('status-timer-bar-inner');

// 定义已找到的不同点数组
let foundDifferenceList = [false, false, false, false, false, false, false]; // 对应每个不同点是否已找到

// 目标区域定义（以图片1左上角为起点）
const imageRight1 = document.getElementById('image-right1');
const targetRadius = 20; // 目标区域半径

// 目标点的中心位置（相对于图片的百分比位置）
const targetPoints = [
    { x: 0.4533 * imageRight1.clientWidth, y: 0.11773 * imageRight1.clientHeight }, 
    { x: 0.3173 * imageRight1.clientWidth, y: 0.23853 * imageRight1.clientHeight }, 
    { x: 0.6491 * imageRight1.clientWidth, y: 0.1651 * imageRight1.clientHeight }, 
    { x: 0.1831 * imageRight1.clientWidth, y: 0.85168 * imageRight1.clientHeight }, 
    { x: 0.45603 * imageRight1.clientWidth, y: 0.717125 * imageRight1.clientHeight }, 
    { x: 0.8667 * imageRight1.clientWidth, y: 0.472477 * imageRight1.clientHeight }, 
    { x: 0.928377 * imageRight1.clientWidth, y: 0.62385 * imageRight1.clientHeight }, 
];

let timer; // 声明全局计时器

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameOver(false);
        }
    }, 1000);
}

function updateTimerDisplay() {
    let percentage = (timeRemaining / timerDuration) * 100;
    timerBar.style.width = percentage + '%';
    statusTimerBarInner.style.width = percentage + '%';
    countdownTimer.textContent = timeRemaining;
}

// 监听图片1的点击事件
imageRight1.addEventListener('click', function (e) {
    const rect = imageRight1.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let foundAnyDifference = false;

    for (let i = 0; i < targetPoints.length; i++) {
        const distance = Math.sqrt(Math.pow(x - targetPoints[i].x, 2) + Math.pow(y - targetPoints[i].y, 2));

        // 如果在目标区域且这个不同点还没有被找到
        if (distance <= targetRadius && !foundDifferenceList[i]) {
            foundDifferenceList[i] = true; // 标记为已找到
            foundDifferences++;
            document.getElementById('found-differences').innerText = foundDifferences;
            timeRemaining += 5; // 增加5秒钟
            updateTimerDisplay(); // 更新倒计时显示
            foundAnyDifference = true;
            
            createHighlight(x, y, 'blue', 20, 3); // 创建蓝色的空心圆圈
            // alert("你找到了！");
            if (foundDifferences==7) {
                alert('恭喜你找到所有不同处！达成成就：前无古人，后无来者。按确认自动跳转。');
                gameOver(foundDifferences);
            }
            break; // 找到一个后退出循环
        }
    }

    if (!foundAnyDifference) {
        // 如果没有找到任何不同点，减少1秒钟
        timeRemaining = Math.max(0, timeRemaining - 1);
        updateTimerDisplay();

        createHighlight(x, y, 'red', 20, 3, 1000); // 创建红色的空心圆圈，1秒后消失
    }
});


function createHighlight(x, y, color, radius, thickness, duration) {
    const highlight = document.createElement('div');
    highlight.style.position = 'absolute';
    highlight.style.left = `${x - radius}px`;
    highlight.style.top = `${y - radius}px`;
    highlight.style.width = `${2 * radius}px`;
    highlight.style.height = `${2 * radius}px`;
    highlight.style.border = `${thickness}px solid ${color}`;
    highlight.style.borderRadius = '50%';
    highlight.style.pointerEvents = 'none'; // 确保不会阻挡其他事件

    imageRight1.parentElement.appendChild(highlight);

    // 如果指定了持续时间，则在时间结束后删除高亮元素
    if (duration) {
        setTimeout(() => {
            highlight.remove();
        }, duration);
    }
}

document.getElementById('image-right1').addEventListener('click', function (e) {
    createHighlight(e);
});

document.getElementById('image-right2').addEventListener('click', function (e) {
    createHighlight(e);
});

// 获取所有的图片容器
document.querySelectorAll('.image-container').forEach(container => {
    // 创建自定义光标元素
    let cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    container.appendChild(cursor);

    // 当鼠标在容器内移动时，更新光标位置并显示光标
    container.addEventListener('mousemove', function(e) {
        let rect = container.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.display = 'block'; // 显示光标
    });

    // 当鼠标离开容器时，隐藏光标
    container.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
    });

    // 当鼠标点击时，增加光标透明度
    container.addEventListener('mousedown', function() {
        cursor.style.opacity = '0.8';
    });

    // 当鼠标释放时，恢复光标透明度
    container.addEventListener('mouseup', function() {
        cursor.style.opacity = '0.4';
    });
});
// Adding references to the buttons
const restartButton = document.getElementById('restart-button');
const skipButton = document.getElementById('skip-button');
const revealButton = document.getElementById('reveal-button');

// Restart the game
restartButton.addEventListener('click', function () {
    location.reload(); // Refreshes the page, starting the game over
});

// Skip the game
skipButton.addEventListener('click', function () {
    window.location.href = '../../../html/chapter3.html'; // Redirects to index.html
});

// Reveal the correct points
revealButton.addEventListener('click', function () {
    // Loop through all target points and display them with blue hollow circles
    targetPoints.forEach(point => {
        createHighlight(point.x, point.y, 'blue', 20, 3);
    });
});

// Function to create a highlight circle
function createHighlight(x, y, color, radius, thickness, duration) {
    const highlight = document.createElement('div');
    highlight.style.position = 'absolute';
    highlight.style.left = `${x - radius}px`;
    highlight.style.top = `${y - radius}px`;
    highlight.style.width = `${2 * radius}px`;
    highlight.style.height = `${2 * radius}px`;
    highlight.style.border = `${thickness}px solid ${color}`;
    highlight.style.borderRadius = '50%';
    highlight.style.pointerEvents = 'none'; // Ensure it doesn't block other interactions

    imageRight1.parentElement.appendChild(highlight);

    // If a duration is specified, remove the highlight after the time elapses
    if (duration) {
        setTimeout(() => {
            highlight.remove();
        }, duration);
    }
}

// Timer and other game logic...

function gameOver(won) {
    // 实现游戏结束逻辑，比如显示结果、禁用进一步点击等
    clearInterval(timer); // 停止计时器
    if (won) {
        // alert("获得成就“虚假现实的觉醒”");
        showAchievement();
        var index = window.localStorage.userid;
        var array = JSON.parse(window.localStorage.userArr);
        array[index].achi4 = 1;
        console.log("index:", index); // 确认index的值
        console.log("array:", array); // 确认array是否被正确解析
        console.log("array[index]:", array[index]); // 确认 array[index] 是否有效
        console.log("array[index].achi4:", array[index].achi4);

        window.localStorage.userArr = JSON.stringify(array);
        // alert('恭喜你找到所有不同处！按确认自动跳转。');
        // window.location.href = '../../../html/chapter3.html';
    } else {
        alert('游戏结束，你没有找到所有不同处。你迷失在梦境之中。');
        // alert("获得成就“迷失的现实”");
        showAchievement2();
        var index = window.localStorage.userid;
        var array = JSON.parse(window.localStorage.userArr);
        array[index].achi5 = 1;
        console.log("index:", index); // 确认index的值
        console.log("array:", array); // 确认array是否被正确解析
        console.log("array[index]:", array[index]); // 确认 array[index] 是否有效
        console.log("array[index].achi5:", array[index].achi5);

        window.localStorage.userArr = JSON.stringify(array);
        // window.location.href = "../../../html/chapter2_branch1.html";
    }
}

startTimer();

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
            // Redirect to index.html after the fade-out transition
            window.location.href = '../../../html/chapter3.html';
        }, 1000);
    }, 3500);
}		  
// ../../html/chapter2.html
function showAchievement2() {
    const achievementBox = document.getElementById('achievement2');
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
            // Redirect to index.html after the fade-out transition
            window.location.href = '../../../html/chapter2_branch1.html';
        }, 1000);
    }, 3500);
}		  
