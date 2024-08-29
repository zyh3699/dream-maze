let map = {
  image: new Image(),
  startX: 0,
  startY: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  offsetX: 0,
  offsetY: 0,
  index:0,
  backgroundImages: [
    "../img/bgr/chapter4_background.png",
    "../img/bgr/chapter4_background_change.png",
    "../img/bgr/chapter4_background_change 1.png",
    "../img/bgr/chapter4_background_change2.png",
    "../img/bgr/chapter4_background_change3.png",
    "../img/bgr/chapter4_background_change4.png",
  ],
  currentBackgroundIndex: 0,
  draw: function (ctx, alpha = 1) {
    ctx.globalAlpha = alpha;
    ctx.drawImage(
      this.image,
      this.startX,
      this.startY,
      this.width,
      this.height,
      0,
      0,
      this.width * 3,
      this.height * 3
    );
    ctx.globalAlpha = 1; // 重置透明度
  },
  move: function (dx, dy) {
    this.startX += dx;
    this.startY += dy;
    this.offsetX += dx;
    this.offsetY += dy;
    // 限制移动范围，防止超出图片边界
  },
  fadeOut: function (ctx, callback) {
    let alpha = 1;
    const fade = () => {
      ctx.clearRect(0, 0, this.width * 3, this.height * 3);
      this.draw(ctx, alpha);
      alpha -= 0.05;
      if (alpha > 0) {
        requestAnimationFrame(fade);
      } else {
        callback();
      }
    };
    fade();
  },
  fadeIn: function (ctx) {
    let alpha = 0;
    const fade = () => {
      ctx.clearRect(0, 0, this.width * 3, this.height * 3);
      this.draw(ctx, alpha);
      alpha += 0.05;
      if (alpha < 1) {
        requestAnimationFrame(fade);
      }
    };
    fade();
  },
  changeBackground: function (ctx) {
    this.currentBackgroundIndex =
      (this.currentBackgroundIndex + 1) % this.backgroundImages.length;
    this.index = this.currentBackgroundIndex;
    const newImage = new Image();
    newImage.src = this.backgroundImages[this.currentBackgroundIndex];
    newImage.onload = () => {
      this.fadeOut(ctx, () => {
        this.image = newImage;
        this.startX = (this.image.width - this.width / 3) / 2 + this.offsetX;
        this.startY = (this.image.height - this.height / 3) / 2 + this.offsetY;
        this.fadeIn(ctx);
      });
    };
    newImage.onerror = () => {
      console.error("Failed to load background image:", newImage.src);
    };
  },
};

map.image.src = map.backgroundImages[map.currentBackgroundIndex]; // 初始背景图
map.image.onload = function () {
  window.map = map;

  map.startX = (map.image.width - map.width / 3) / 2;
  map.startY = (map.image.height - map.height / 3) / 2;

  map.draw(ctx);

  // 每5秒更换一次背景图
  setInterval(() => {
    map.changeBackground(ctx);
  }, 5000);
};

map.image.onerror = function () {
  console.error("Failed to load initial background image:", map.image.src);
};
