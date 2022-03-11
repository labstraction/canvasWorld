class World {


  static build(level) {

    const walls = document.createElement('img');
    walls.src = "./Terrain.png"

    const sprites = [];

    const columns = level[0].length;
    const rows = level.length;
    const side = Math.floor(canvas.width / columns);

    for (let i = 0; i < rows; i++) {
      const row = level[i];
      for (let j = 0; j < columns; j++) {

        const type = row[j];
        if (type !== 0) {
            const sprite = this.createSprite(type, i, j, side, walls);
            sprites.push(sprite);
        }
      }
    }
    return sprites
  }


  static createSprite(type, row, column, side, walls) {
      switch (type) {
          case 1: 
            return new RectSprite(side * column, side * row, side, side, 0, 0, "tomato", walls);
          case 2:
            return new RectSprite(side * column, side * row, side, side, 0, 0, "blue");
          case 4:
              return new ExitSprite(side * column, side * row, side, side, 0, 0);
          case 5:
              return new EnemySprite(side * column, side * row, side, side, true);
          case 6:
              return new EnemySprite(side * column, side * row, side, side, false);
          default:
            return new PlayerSprite(side * column, side * row, side, side, 0, 0);
      }
  }

}



