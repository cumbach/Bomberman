(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Bomb = Bomberman.Bomb = function (attributes) {
    // debugger;
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Bomb.COLOR,
    this.radius = Bomb.RADIUS

    // Bomberman.StaticObject.call(this, attributes);
  };

  Bomb.COLOR = "black";
  Bomb.RADIUS = 23;

  Bomb.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();

  };

  // Bomberman.Util.inherits(Bomberman.Bomb, Bomberman.StaticObject);

})();
