class Sprite {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.exists = true;
    if (options.spriteImage) {
      this.image = new Image();
      this.image.src = options.spriteImage;
    } else if (options.color) {
      this.color = "black";
    }
  }
  draw() {
    if (this.exists) {
      if (this.image) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }
  destroy() {
    // console.log(this.constructor.name + " destroyed.");
    this.exists = false;
  }
}

class Background extends Sprite {
  constructor(options) {
    super(options);
    this.starCount = 100;
    this.starCoordinates = [];
    for (let i = 0; i < this.starCount; i++) {
      this.starCoordinates.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }
  }
  update() {
    this.draw();
    ctx.fillStyle = "white";

    this.starCoordinates.map(star => {
      ctx.fillRect(star.x, star.y, 3, 3);
      star.y += 1;
      if (star.y > window.innerHeight) star.y = 0;
    });
  }
}

class Alien extends Sprite {
  constructor(options) {
    super(options);
    this.moveDirection = 1;
    this.moveSpeed = 1;
  }
  update() {
    this.draw();
    this.y += 1;
    this.x += this.moveDirection * this.moveSpeed;
    if (this.x + this.width >= window.innerWidth || this.x <= 0) {
      this.moveDirection *= -1;
      this.y += window.innerHeight / 20;
    }
  }
}

class Bullet extends Sprite {
  constructor(options) {
    super(options);
    this.speed = 5;
  }
  update() {
    this.draw();
    this.y -= this.speed;
  }
  draw() {
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x + this.width,
      this.y
    );
    gradient.addColorStop(0, "rgba(0, 100, 100, 0.2)");
    // gradient.addColorStop(0.2, "rgba(0, 100, 100, 0.5 )");
    gradient.addColorStop(0.5, "rgba(0, 100, 100, 1 )");
    // gradient.addColorStop(0.8, "rgba(0, 100, 100, 0.5 )");
    gradient.addColorStop(1, "rgba(0, 100, 100, 0.2 )");
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Ship extends Sprite {
  constructor(options) {
    super(options);
    this.controls = {
      right: { pressed: false },
      left: { pressed: false },
      up: { pressed: false },
      down: { pressed: false },
      fire: { pressed: false },
    };
  }
  update() {
    if (this.exists) {
      this.draw();
      if (
        this.controls.right.pressed &&
        this.x + this.width <= window.innerWidth
      ) {
        this.x += 5;
      }
      if (this.controls.left.pressed && this.x >= 0) {
        this.x -= 5;
      }

      if (this.controls.up.pressed && this.y >= 0) {
        this.y -= 5;
      }

      if (
        this.controls.down.pressed &&
        this.y + this.height <= window.innerHeight
      ) {
        this.y += 5;
      }

      if (this.y > window.innerHeight - window.innerHeight / 8) --this.y;
    }
  }
}
