let map = {
  image: new Image(),
  startX: 0,
  startY: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  offsetX: 0,
  offsetY: 0,
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
      this.width * 2,
      this.height * 2
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

map.image.src = "../img/bgr/chapter1_background.png"; // 替换为你的图片路径
map.image.onload = function () {
  window.map = map;

  map.startX = (map.image.width - map.width / 2) / 2;
  map.startY = (map.image.height - map.height / 2) / 2;

  map.draw(ctx);
};
