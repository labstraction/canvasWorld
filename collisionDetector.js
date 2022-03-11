class CollisionDetector {
  static checkCollisions(sprite1, spriteArray) {
    if (sprite1.isActive) {
      for (const sprite2 of spriteArray) {
        if (sprite1 !== sprite2) {
          if (this.isColliding(sprite1, sprite2)) {
            if (sprite1.isSolid) {
              const isHorizontal = this.solidCollision(sprite1, sprite2);
              sprite1.manageCollision(sprite2, isHorizontal);
            } else {
              sprite1.manageCollision(sprite2);
            }
          }
        }
      }
    }
  }

  static isColliding(activeSprite, wall) {
    const collidingX =
      activeSprite.x < wall.x + wall.width &&
      activeSprite.x + activeSprite.width > wall.x;
    const collidingY =
      activeSprite.y < wall.y + wall.height &&
      activeSprite.y + activeSprite.height > wall.y;
    return collidingX && collidingY;
  }

  static solidCollision(activeSprite, entity) {
    const activeSpriteXmid = activeSprite.x + activeSprite.width / 2;
    const activeSpriteYmid = activeSprite.y + activeSprite.height / 2;
    const wallXmid = entity.x + entity.width / 2;
    const wallYmid = entity.y + entity.height / 2;

    const dx = wallXmid - activeSpriteXmid;
    const dy = wallYmid - activeSpriteYmid;

    const absDX = Math.abs(dx);
    const absDY = Math.abs(dy);

    if (absDX > absDY) {
      if (dx < 0) {
        activeSprite.x = entity.x + entity.width + 0.1;
      } else {
        activeSprite.x = entity.x - activeSprite.width - 0.1;
      }
      activeSprite.speedX = 0;

      return false;

    } else if (absDY > absDX) {

      if (dy < 0) {
        activeSprite.y = entity.y + entity.height + 0.1;
        activeSprite.speedY = 0;
        return false;
      } else {
        activeSprite.y = entity.y - activeSprite.height - 0.1;
        activeSprite.speedY = 0;
        return true;
      }
      

      
    }
  }
}
