class RectSprite {
  constructor(x, y, width, height, speedX, speedY, color, tileset) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.tileset = tileset;
    console.log(this.tileset)
  }

  update(canvas) {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    if (this.x > canvas.width - this.width || this.x < 0) {
      this.speedX = this.speedX * -1;
    }
    if (this.y > canvas.height - this.height || this.y < 0) {
      this.speedY = this.speedY * -1;
    }
  }

  draw(context) {
    if (this.tileset) {
      context.drawImage(this.tileset, 0, 0, 50, 50, this.x, this.y, this.width, this.height)
    }
    // context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, this.width, this.height);
    
  }
}

class CircleSprite {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  update(canvas) {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    if (this.x > canvas.width - this.radius || this.x < this.radius) {
      this.speedX = this.speedX * -1;
    }
    if (this.y > canvas.height - this.radius || this.y < this.radius) {
      this.speedY = this.speedY * -1;
    }
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
}

class PlayerSprite extends RectSprite {
  constructor(x, y, width, height, speedX, speedY) {
    super(x, y, width, height, speedX, speedY, "magenta");
    this.isPlayer = true;
    this.isActive = true;
    this.isSolid = true;
    this.isJumping = false;
    this.win = false;
    this.death = false;
  }

  update(canvas, controller) {
    if (controller.isUpClicked) {
      if (this.isJumping === false) {
        this.speedY += -10;
        this.isJumping = true;
      }
    }
    // if (controller.isDownClicked) {
    //   this.speedY += 0.1;
    // }
    if (controller.isRightClicked) {
      this.speedX += 0.2;
    }
    if (controller.isLeftClicked) {
      this.speedX += -0.2;
    }
    

    const friction = Physic.getFriction();

    this.speedX *= friction;
    this.speedY *= friction

    const gravity = Physic.getGravity();

    this.speedX += gravity.x;
    this.speedY += gravity.y;
    

    super.update(canvas);
  }

  manageCollision(sprite, isHorizontal){
    if(sprite.isExit){
      this.win = true;
    }
    if (sprite.isEnemy) {
      this.death = true;
    }
    if(isHorizontal){
      this.isJumping = false;
    }
    
  }

}

class ExitSprite extends RectSprite {
  constructor(x, y, width, height, speedX, speedY) {
    super(x, y, width, height, speedX, speedY, "green");
    this.isExit = true;
  }
}

class EnemySprite extends RectSprite {
  constructor(x, y, width, height, isVertical = true) {

    let speedX;
    let speedY;
    let color;

    if (isVertical) {   
      speedX = 0;
      speedY = 2;
      color = 'blue'
    } else{
      speedX = 2;
      speedY = 0;
      color = 'greenyellow'
    }
    super(x, y, width, height, speedX, speedY, color);
    this.isActive = true;
    this.isEnemy = true;
  }

  manageCollision(sprite){
    this.speedX *= -1;
    this.speedY *= -1;

  }
}