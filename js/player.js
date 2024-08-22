class Player {
  constructor() {
    this.image = new Image();
    this.image.src = "../img/charactor/main_character.jpg"; // 替换为你的图片路径
    this.width = 41;
    this.height = 76;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    window.map.move(-dx, -dy); // 反向移动背景图
  }
}

const player = new Player();
window.player = player;
