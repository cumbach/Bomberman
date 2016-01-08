(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Enemy = Bomberman.Enemy = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Enemy.COLOR;
    this.length = Enemy.LENGTH;
    this.radius = 25;
    this.location = [0, 0];
    this.sprite = new Bomberman.Sprite({img: 'sprites/pinkenemy.png', loc: [this.location], size: [26,25]})
    this.startMoving();
    this.blocked = false;

    // Bomberman.StaticObject.call(this, attributes);
  };

  Enemy.COLOR = "pink";
  Enemy.LENGTH = 50;


  Enemy.prototype.draw = function (ctx) {
    this.sprite.draw(ctx, this.pos, this.location);
  };

  Enemy.prototype.startMoving = function (ctx) {
    // Couldnt define these above because the game hasnt created barriers yet
    // var barrierPositions = this.game.barriers.map(function(barrier){
    //   return barrier.pos.toString();
    // });
    // var blockPositions = this.game.blocks.map(function(block){
    //   return block.pos.toString();
    // })

    this.chooseDir();

    setInterval(function(){
      this.move();
    }.bind(this), 25)
  };
  Enemy.prototype.chooseDir = function (ctx) {
    var rand = Math.random();
    if (rand < .25) {
      this.vel = [1,0]
    } else if (rand < .5) {
      this.vel = [-1,0]
    } else if (rand < .75) {
      this.vel = [0,1]
    } else if (rand >= .75) {
      this.vel = [0,-1]
    }
  };
  Enemy.prototype.move = function (ctx) {
    // this.checkNotBlocked(this.vel);
    if(this.inBoard(this.vel) && this.notBlocked(this.vel)) {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    } else {
      this.chooseDir();
    }
  };
  Enemy.prototype.inBoard = function (vel) {
    if (0 <= this.pos[0] + vel[0] &&
        this.pos[0] + vel[0] + this.length < this.game.xDim &&
        0 <= this.pos[1] + vel[1] &&
        this.pos[1] + vel[1] + this.length < this.game.yDim) {
      return true;
    } else {
      // debugger;
      return false;
    }
  };
  Enemy.prototype.notBlocked = function (vel) {
    this.center = [this.pos[0] + 25, this.pos[1] +25]
    // console.log(this.center)

    this.bool = true;

    this.game.barriers.forEach(function(barrier){
      if (this.center[0] + this.radius + vel[0] > barrier.pos[0] &&
          this.center[0] - this.radius + vel[0] < barrier.pos[0] + barrier.length &&
          this.center[1] + this.radius + vel[1] > barrier.pos[1] &&
          this.center[1] - this.radius + vel[1] < barrier.pos[1] + barrier.length
        ) {
          this.bool = false;
      }
    }.bind(this))

    this.game.blocks.forEach(function(block){
      if (this.center[0] + this.radius + vel[0] > block.pos[0] &&
          this.center[0] - this.radius + vel[0] < block.pos[0] + block.length &&
          this.center[1] + this.radius + vel[1] > block.pos[1] &&
          this.center[1] - this.radius + vel[1] < block.pos[1] + block.length
        ) {
          this.bool = false;
      }
    }.bind(this))

    this.game.bomber.bombs.forEach(function(bomb){
      if (this.center[0] + this.radius + vel[0] > bomb.pos[0] - bomb.radius &&
          this.center[0] - this.radius + vel[0] < bomb.pos[0] + bomb.radius &&
          this.center[1] + this.radius + vel[1] > bomb.pos[1] - bomb.radius &&
          this.center[1] - this.radius + vel[1] < bomb.pos[1] + bomb.radius
        ) {
          this.bool = false;
      }
    }.bind(this))


    return this.bool;
  };







  // Enemy.prototype.destroyEnemy = function () {
  //   this.location = [303, 106];
  //
  //   setTimeout(function(){
  //     this.location = [327, 106];
  //   }.bind(this), 300);
  //
  //   setTimeout(function(){
  //     this.game.blocks.splice(this.game.blocks.indexOf(this),1)
  //   }.bind(this), 600);
  // };

  // Bomberman.Util.inherits(Bomberman.Enemy, Bomberman.StaticObject);

  //
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
