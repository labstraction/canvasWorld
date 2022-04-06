const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');



let sprites = World.build(Levels.getLevel(0));


const controller = new Controller();


// logToUpperCase("Ciao Mondo");


// logPlus(false, "pippo", "Pluto", "PAPERINO")




setInterval(() => {

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const sprite of sprites) {

    if (sprite.win) {
      sprites = World.build(Levels.getLevel(1));
    }

    if (sprite.death) {
      sprites = World.build(Levels.getLevel(2));
    }

    CollisionDetector.checkCollisions(sprite, sprites);

    sprite.draw(context);

    sprite.update(canvas, controller);

  }


}, 30);


// function logToUpperCase(...args){
//   for (const arg of args) {
//     console.log(arg.toUpperCase())
//   }
// }

// function logPlus(isUpper,...args){
//   if (isUpper) {
//     for (const arg of args) {
//       console.log(arg.toUpperCase())
//     }
//   } else {
//     for (const arg of args) {
//       console.log(arg.toLowerCase())
//     }
//   }
// }

