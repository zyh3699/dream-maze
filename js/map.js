let map = {
  image: new Image(),
  startX: 0,
  startY: 0,
  width: window.innerWidth,
  height: window.innerHeight,
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
      this.width,
      this.height
    );
  },
  move: function (dx, dy) {
    this.startX += dx;
    this.startY += dy;
    // 限制移动范围，防止超出图片边界
    this.startX = Math.max(
      0,
      Math.min(this.startX, this.image.width - this.width)
    );
    this.startY = Math.max(
      0,
      Math.min(this.startY, this.image.height - this.height)
    );
  },
};

map.image.src = "../img/bgr/About.png"; // 替换为你的图片路径
map.image.onload = function () {
  window.map = map;
  // 初始化人物位置在画布中央
  map.startX = (map.image.width - map.width) / 2;
  map.startY = (map.image.height - map.height) / 2;
  map.draw(ctx);
};
