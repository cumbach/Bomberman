(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Bomber = Bomberman.Bomber = function(attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    // this.vel = attributes.vel,
    this.radius = Bomber.RADIUS,
    this.color = Bomber.COLOR
  };

  Bomber.COLOR = "green";
  Bomber.RADIUS = 15;


  Bomber.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    // this.vel = [0,0];

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  Bomber.prototype.move = function(vel) {
    var inBarrier = false;

    this.game.barriers.forEach(function(barrier){
      // debugger;
      if (this.pos[0] + this.radius + vel[0] > barrier.pos[0] &&
          this.pos[0] - this.radius + vel[0] < barrier.pos[0] + barrier.length &&
          this.pos[1] + this.radius + vel[1] > barrier.pos[1] &&
          this.pos[1] - this.radius + vel[1] < barrier.pos[1] + barrier.length
        ) {

        inBarrier = true;
      }
    }.bind(this))

    if (!inBarrier &&
        0 + Bomber.RADIUS < this.pos[0] + vel[0] &&
        this.pos[0] + vel[0] + Bomber.RADIUS < this.game.xDim &&
        0 + Bomber.RADIUS < this.pos[1] + vel[1] &&
        this.pos[1] + vel[1] + Bomber.RADIUS < this.game.yDim) {

      this.pos[0] += vel[0];
      this.pos[1] += vel[1];
    }

  };

  Bomber.prototype.power = function (impulse) {
    this.vel[0] = impulse[0];
    this.vel[1] = impulse[1];
  };
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
