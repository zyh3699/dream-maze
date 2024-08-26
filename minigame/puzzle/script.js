document.addEventListener("DOMContentLoaded", () => {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const container = document.getElementById("puzzle-container");
  const message = document.getElementById("message");

  // 打乱拼图块
  shufflePieces();

  pieces.forEach((piece) => {
    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("drop", drop);

    // 添加触摸事件监听器
    piece.addEventListener("touchstart", touchStart);
    piece.addEventListener("touchmove", touchMove);
    piece.addEventListener("touchend", touchEnd);
  });

  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    if (dropzone.classList.contains("puzzle-piece") && dropzone !== draggableElement) {
      const temp = document.createElement("div");
      container.replaceChild(temp, draggableElement);
      container.replaceChild(draggableElement, dropzone);
      container.replaceChild(dropzone, temp);
    }

    checkWinCondition();
  }

  function touchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const piece = event.target;
    piece.style.position = "absolute";
    piece.style.zIndex = 1000;
    moveAt(touch.pageX, touch.pageY);

    function moveAt(pageX, pageY) {
      piece.style.left = pageX - piece.offsetWidth / 2 + "px";
      piece.style.top = pageY - piece.offsetHeight / 2 + "px";
    }

    function onTouchMove(event) {
      const touch = event.touches[0];
      moveAt(touch.pageX, touch.pageY);
    }

    document.addEventListener("touchmove", onTouchMove);

    piece.ontouchend = function (event) {
      document.removeEventListener("touchmove", onTouchMove);
      piece.style.position = "";
      piece.style.zIndex = "";
      piece.style.left = "";
      piece.style.top = "";
      const touch = event.changedTouches[0];
      const dropzone = document.elementFromPoint(touch.clientX, touch.clientY);
      if (dropzone && dropzone.classList.contains("puzzle-piece") && dropzone !== piece) {
        const temp = document.createElement("div");
        container.replaceChild(temp, piece);
        container.replaceChild(piece, dropzone);
        container.replaceChild(dropzone, temp);
      }
      checkWinCondition();
    };
  }

  function touchMove(event) {
    event.preventDefault();
  }

  function touchEnd(event) {
    event.preventDefault();
  }

  function checkWinCondition() {
    const pieces = document.querySelectorAll(".puzzle-piece");
    let isComplete = true;

    pieces.forEach((piece, index) => {
      const position = index + 1;
      if (piece.getAttribute("data-position") != position) {
        isComplete = false;
      }
    });

    const message = document.getElementById("message");
    if (isComplete) {
      message.textContent = "恭喜你，拼图完成了！";
      animatePuzzleCompletion();
      setTimeout(() => {
        window.location.href = "../../html/chapter1.html"; // 跳转到上级目录的上级目录中的chapter0.html
      }, 4000); // 等待4秒以完成动画效果
    }
  }

  function animatePuzzleCompletion() {
    const pieces = document.querySelectorAll(".puzzle-piece");
    const container = document.getElementById("puzzle-container");
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    pieces.forEach((piece) => {
      const pieceRect = piece.getBoundingClientRect();
      const offsetX = centerX - (pieceRect.left + pieceRect.width / 2);
      const offsetY = centerY - (pieceRect.top + pieceRect.height / 2);

      piece.style.transition = "transform 2s ease, opacity 2s ease";
      piece.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2)`;
      piece.style.opacity = "0";
    });

    // 在动画结束后显示完整图片
    setTimeout(() => {
      container.innerHTML = ""; // 清空容器内容
      // const img = document.createElement("img");
      // img.src = "test.png"; // 设置完整图片的路径
      // img.style.width = "330px"; // 设置图片宽度为拼图容器的宽度
      // img.style.height = "330px"; // 设置图片高度为拼图容器的高度
      // img.style.position = "absolute";
      // img.style.top = "50%";
      // img.style.left = "50%";
      // img.style.transform = "translate(-50%, -50%)"; // 将图片居中
      // img.style.opacity = "0";
      // img.style.transition = "opacity 2s ease";
      // container.appendChild(img);

      // 触发淡入效果
      setTimeout(() => {
        img.style.opacity = "1";
      }, 100);
    }, 2000); // 等待2秒以完成拼图移动和淡化动画
  }

function shufflePieces() {
    const pieces = document.querySelectorAll(".puzzle-piece");
    const container = document.getElementById("puzzle-container");
    const piecesArray = Array.from(pieces);
    for (let i = piecesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(piecesArray[j]);
    }
}

});
