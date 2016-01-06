(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Block = Bomberman.Block = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Block.COLOR;
    this.length = Block.LENGTH;

    // Bomberman.StaticObject.call(this, attributes);
  };

  Block.COLOR = "pink";
  Block.LENGTH = 50;

  Block.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(
      this.pos[0],
      this.pos[1],
      this.length,
      this.length
    );

  };

  // Bomberman.Util.inherits(Bomberman.Block, Bomberman.StaticObject);

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
