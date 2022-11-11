
class Sprite {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        if (options.spriteImage) {
            this.image = new Image();
            this.image.src = options.spriteImage;
        } else if (options.color) {
            this.color = options.color;
        } 
    }    
    draw() {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Alien extends Sprite {
    constructor(options) {
    super(options);
    }
}


class Bullet extends Sprite {
    constructor(options) {
        super(options);
        this.speed = 20;
    }
    update() {
        this.draw()
        this.y -= this.speed;
    }
}

class Ship extends Sprite {
    constructor(options) {
        super(options);
        this.controls = {
            right: {pressed: false},
            left: {pressed: false},
            fire: {pressed: false}
        }
    }
    update() {
        this.draw()
        if (this.controls.right.pressed === true) {
            this.x += 5
        }
        if (this.controls.left.pressed === true) {
            this.x -= 5
        }
    }
}
