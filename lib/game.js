(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Game = Bomberman.Game = function (canvas) {
    this.ctx = canvas.getContext('2d');
    this.xDim = canvas.width;
    this.yDim = canvas.height;
    this.bomber = new Bomberman.Bomber({ vel: [0, 0], pos: [75, 75], game: this});
    this.addBarriers();
  };

  // Game.NUM_BARRIERS = 10;
  // Game.DIM_X = window.length;
  // Game.DIM_Y = window.width;
  // Game.prototype.addBomber = function () {
  //   bomber = new Bomberman.Bomber({
  //     pos: this.randomPosition(),
  //     game: this
  //   });
  // };
  Game.prototype.addBarriers = function() {
    this.barriers = [];
    var pos;
    var barrier;

    // barrier = new Bomberman.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

    var barrierLength = Bomberman.Barrier.LENGTH;

    for (var x = 0; x < this.xDim; x+=barrierLength) {
      for (var y = 0; y < this.yDim; y+=barrierLength) {
        if (x % (barrierLength * 2) === 0 && y % (barrierLength * 2) === 0) {
          // debugger;
          pos = [x, y];
          barrier = new Bomberman.Barrier({ pos: pos, game: this });
          this.barriers.push(barrier);
        }
      }
    }
    // this.barriers.forEach(function (barrier) {
    //   barrier.draw(this.ctx);
    // }.bind(this));
  };

  // Game.prototype.setup = function (ctx) {
  //   ctx.clearRect(0, 0, this.xDim, this.yDim);
  //
  //   this.barriers.forEach(function (barrier) {
  //     barrier.draw(ctx);
  //   });
  // };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);

    this.barriers.forEach(function (barrier) {
      barrier.draw(ctx);
    });

    this.bomber.draw(ctx);

  };
  //
  // Game.prototype.moveObjects = function () {
  //   this.asteroids.forEach(function (asteroid) {
  //     asteroid.move();
  //   });
  // };

  // Game.prototype.checkCollisions = function () {
  //   var that = this;
  //
  //   this.asteroids.forEach(function (asteroid1) {
  //     that.asteroids.forEach(function (asteroid2) {
  //       if (asteroid1 !== asteroid2) {
  //         if (asteroid1.isCollidedWith(asteroid2)) {
  //           console.log("COLLISION");
  //           asteroid1.collideWith(asteroid2);
  //         }
  //       }
  //     });
  //   });
  // };
  //
  Game.prototype.step = function () {
    this.handleInput();
    // this.moveObjects();
    // this.checkCollisions();
  };
  Game.prototype.handleInput = function (dt) {
    var bomber = this.bomber;

    // if (player.piping || player.dying || player.noInput) return; //don't accept input

    // if (input.isDown('JUMP')) {
    //   player.jump();
    // } else {
    //   //we need this to handle the timing for how long you hold it
    //   player.noJump();
    // }
    if (input.isDown('LEFT')) { // 'd' or left arrow
      bomber.move([-3,  0]);
    } else if (input.isDown('RIGHT')) { // 'k' or right arrow
      bomber.move([3,  0]);
    } else if (input.isDown('UP')) { // 'k' or right arrow
      bomber.move([0,  -3]);
    } else if (input.isDown('DOWN')) { // 'k' or right arrow
      bomber.move([0,  3]);
    } else {
      bomber.move([0,  0]);
    }
  }
  //
  // Game.prototype.remove = function (asteroid) {
  //   var index = this.asteroids.indexOf(asteroid);
  //   this.asteroids.splice(index, 1);
  // };

})();
