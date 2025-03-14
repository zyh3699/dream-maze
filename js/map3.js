let map = {
  image: new Image(),
  startX: 0,
  startY: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  offsetX: -500,
  offsetY: -500,
  draw: function (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.image,
      this.startX,
      this.startY,
      this.width,
      this.height,
      0,
      0,
      this.width * 1.5,
      this.height * 1.5
    );
  },
  move: function (dx, dy) {
    this.startX += dx;
    this.startY += dy;
    this.offsetX += dx;
    this.offsetY += dy;
    // 限制移动范围，防止超出图片边界
  },
};

map.image.src = "../img/bgr/chapter3_background.png"; // 替换为你的图片路径
map.image.onload = function () {
  window.map = map;

  map.startX = -500 + (map.image.width - map.width / 1.5) / 2;
  map.startY = -500 + (map.image.height - map.height / 1.5) / 2;

  map.draw(ctx);
};
