(function() {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var GameView = Bomberman.GameView = function (canvas) {
    this.game = new Bomberman.Game (canvas);
    this.ctx = canvas.getContext('2d');
  };

  GameView.MOVES = {
    "up": [ 0, -3],
    "left": [-3,  0],
    "down": [ 0,  3],
    "right": [ 3,  0],
  };

  // GameView.prototype.bindKeyHandlers = function () {
    // var bomber = this.game.bomber;
  //
  //   Object.keys(GameView.MOVES).forEach(function (k) {
  //     var move = GameView.MOVES[k];
  //     key(k, function () { bomber.power(move); });
  //   });
  //
  //   // key("space", function () { bomber.dropBomb() });
  // };

  GameView.prototype.start = function (canvas) {

    // this.bindKeyHandlers();


    // var ctx = canvas.getContext('2d');
    var gameView = this;
    // var ctx = this.ctx;

    requestAnimationFrame(this.animate.bind(this));
    // setInterval(function() {
    //   gameView.animate();
    //   gameView.game.step();
    // }, 200);
  };
  GameView.prototype.animate = function(){
    // var timeDelta = time - this.lastTime;
    //
    // this.handleInput();
    this.game.step();
    this.game.draw(this.ctx);
    // this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };





})();
