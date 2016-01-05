(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Bomber = Bomberman.Bomber = function(attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.radius = Bomber.RADIUS,
    this.color = Bomber.COLOR,
    this.bombs = [],
    this.ctx = attributes.game.ctx,
    this.location = [73, 125],
    this.sprite = new Bomberman.Sprite({img: 'sprites/sailor.png', loc: this.location, size: [40,40]})
  };

  Bomber.COLOR = "white";
  Bomber.RADIUS = 23;
  var locationHolder = 0;

  Bomber.prototype.draw = function (ctx) {
    // mario sprite
    // ctx.drawImage(resources.get(this.sprite.img), 80, 32, 16,16, this.pos[0]-23, this.pos[1]-23, 50, 50);
    newPos = this.pos.slice(0);
    newPos[0] -= 23;
    newPos[1] -= 23;
    // this.location[0] = [73 + (this.location[0] % 300)];
    // this.location = [113, 125];
    this.sprite.draw(ctx, newPos, this.location);
    // Bomber.LOCATION[0] += 25;
    // Bomber.LOCATION[1] += 25;


    // this is the code for the old circle bomber
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();

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

    // animate bomber
    if (vel[0] !== 0 || vel[1] !== 0) {
      this.moveAvatar();
    } else {
      this.location = [73, 125];
    }

    if (this.inBoard(vel)) {
      this.pos[0] += vel[0];
      this.pos[1] += vel[1];
    }

  };
  Bomber.prototype.moveAvatar = function () {
    locationHolder += 1;
    if (locationHolder % 20 ===  0) {
      this.location[0] += 40;
    }
    if (locationHolder === 40) {
      this.location[0] = 113;
      locationHolder = 0;
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
    var isTouching = false;

    // checks to make sure multiple bombs arent laid at same location
    this.bombs.forEach(function(bomb){
      var distance = Bomberman.Util.distance(bomber, bomb);
      var radiusSum = bomber.radius + bomb.radius;
      if (radiusSum > distance) {
        isTouching = true;
      }
    })

    // decouples from bomber position and places in correct slots
    var barrierLength = this.game.barriers[0].length
    var newPos = this.pos.slice(0);
    newPos[0] = Math.floor(newPos[0]/barrierLength) * barrierLength + barrierLength/2;
    newPos[1] = Math.floor(newPos[1]/barrierLength) * barrierLength + barrierLength/2;

    if (!isTouching) {
      var bomb = new Bomberman.Bomb({pos: newPos, game: this.game})
      this.bombs.push(bomb);
      this.sprite.something();

      setTimeout(function(){
        bomb.explode(this.ctx);
      }.bind(this), 2100);

      setTimeout(function(){
        this.bombs.shift();
      }.bind(this), 2700);


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
