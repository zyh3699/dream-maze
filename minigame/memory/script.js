const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    remainingTime: 60, // 设置倒计时初始时间
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')  

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.remainingTime--

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.remainingTime} sec`

        if (state.remainingTime === 0) {
          clearInterval(state.loop);
          selectors.boardContainer.classList.add("flipped");
          selectors.win.innerHTML = `
                <span class="win-text">
                    You lose!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves
                </span>
            `;
            clearInterval(state.loop);
            alert("获得成就“虚无的囚徒”");

            var index = window.localStorage.userid;
            var array = JSON.parse(window.localStorage.userArr);
            array[index].achi9 = 1;
            console.log("index:", index); // 确认index的值
            console.log("array:", array); // 确认array是否被正确解析
            console.log("array[index]:", array[index]); // 确认 array[index] 是否有效
            console.log("array[index].achi9:", array[index].achi9);

            window.localStorage.userArr = JSON.stringify(array);
          setTimeout(() => {
            window.location.href = "../../html/chapter4_branch1.html"; // 将 'main.js' 替换为你想跳转的页面路径
          }, 4000); // 等待2秒后跳转
        }
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
          selectors.boardContainer.classList.add("flipped");
          selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.remainingTime}</span> seconds
                </span>
            `;
            clearInterval(state.loop);
            alert("获得成就“梦境修复者”");

            var index = window.localStorage.userid;
            var array = JSON.parse(window.localStorage.userArr);
            array[index].achi8 = 1;
            console.log("index:", index); // 确认index的值
            console.log("array:", array); // 确认array是否被正确解析
            console.log("array[index]:", array[index]); // 确认 array[index] 是否有效
            console.log("array[index].achi8:", array[index].achi8);

            window.localStorage.userArr = JSON.stringify(array);
          setTimeout(() => {
            window.location.href = "../../html/final.html"; // 将 'main.js' 替换为你想跳转的页面路径
          }, 4000); // 等待2秒后跳转
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()

