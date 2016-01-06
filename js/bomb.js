(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Bomb = Bomberman.Bomb = function (attributes) {
    // debugger;
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [558,1], size: [25,25]})
    this.color = Bomb.COLOR,
    this.radius = Bomb.RADIUS


    // Bomberman.StaticObject.call(this, attributes);
  };

  Bomb.COLOR = "black";
  Bomb.RADIUS = 23;

  Bomb.prototype.draw = function (ctx) {

    newPos = this.pos.slice(0);
    newPos[0] -= 23;
    newPos[1] -= 23;
    this.sprite.draw(ctx, newPos);

    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();

  };

  Bomb.prototype.explode = function (ctx) {
    // ctx.drawImage(resources.get(this.sprite.img), 80, 32, 16,16, this.pos[0]-23, this.pos[1]-23, 50, 50);
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [604,1], size: [25,25]})

    // this.color = 'red';

    //
    // ctx.fillStyle = 'red';
    //
    // ctx.fillRect(
    //   this.pos[0],
    //   this.pos[1],
    //   300,
    //   600
    // );
    // logic for making flames come out?
  };

  // Bomberman.Util.inherits(Bomberman.Bomb, Bomberman.StaticObject);

})();
