(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Bomber = Bomberman.Bomber = function(attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.radius = Bomber.RADIUS,
    this.color = Bomber.COLOR,
    this.bombs = []
  };

  Bomber.COLOR = "white";
  Bomber.RADIUS = 23;


  Bomber.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  Bomber.prototype.move = function(vel) {
    var inBarrier = false;

    // forces sliding when bumping into barriers
    this.game.barriers.forEach(function(barrier){
      if (this.pos[0] + this.radius + vel[0] > barrier.pos[0] &&
          this.pos[0] - this.radius + vel[0] < barrier.pos[0] + barrier.length &&
          this.pos[1] + this.radius + vel[1] > barrier.pos[1] &&
          this.pos[1] - this.radius + vel[1] < barrier.pos[1] + barrier.length
        ) {
          if (vel[0] > 0 || vel[0] < 0) {
            if (this.pos[1] < barrier.pos[1] + barrier.length/2) {
              vel = [0,-3];
            } else {
              vel = [0,3];
            }
          } else if (vel[1] > 0 || vel[1] < 0) {
            if (this.pos[0] < barrier.pos[0] + barrier.length/2) {
              vel = [-3,0];
            } else {
              vel = [3,0];
            }
          }
      }
    }.bind(this))

    if (this.inBoard(vel)) {
      this.pos[0] += vel[0];
      this.pos[1] += vel[1];
    }

  };
  Bomber.prototype.inBoard = function (vel) {
    if (0 + Bomber.RADIUS < this.pos[0] + vel[0] &&
        this.pos[0] + vel[0] + Bomber.RADIUS < this.game.xDim &&
        0 + Bomber.RADIUS < this.pos[1] + vel[1] &&
        this.pos[1] + vel[1] + Bomber.RADIUS < this.game.yDim) {
      return true;
    } else {
      return false;
    }
  };
  Bomber.prototype.addBomb = function (ctx) {
    var bomber = this;
    var isCollided = false;

    this.bombs.forEach(function(bomb){
      var distance = Bomberman.Util.distance(bomber, bomb);
      var radiusSum = bomber.radius + bomb.radius;
      if (radiusSum > distance) {
        isCollided = true;
      }
    })

    if (!isCollided) {
      this.bombs.push(new Bomberman.Bomb({pos: this.pos.slice(0), game: this.game}))
    }
  };

  // StaticObject.prototype.isCollidedWith = function (otherObject) {
  //   var distance = Bomberman.Util.distance(this, otherObject);
  //   var radiusSum = this.radius + otherObject.radius;
  //   return radiusSum > distance;
  // };
  //
  // StaticObject.prototype.collideWith = function (otherObject) {
  //   this.game.remove(this);
  //   otherObject.game.remove(otherObject);
  // };

})();
