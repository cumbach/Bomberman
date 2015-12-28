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
    this.handleInput();
    this.game.step();
    this.game.draw(this.ctx);
    // this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };
  GameView.prototype.handleInput = function (dt) {
    var bomber = this.game.bomber;

    // if (player.piping || player.dying || player.noInput) return; //don't accept input

    // if (input.isDown('RUN')){
    //   player.run();
    // } else {
    //   player.noRun();
    // }
    // if (input.isDown('JUMP')) {
    //   player.jump();
    // } else {
    //   //we need this to handle the timing for how long you hold it
    //   player.noJump();
    // }
    //
    // if (input.isDown('DOWN')) {
    //   player.crouch();
    // } else {
    //   player.noCrouch();
    // }
    GameView.MOVES = {
      "up": [ 0, -3],
      "left": [-3,  0],
      "down": [ 0,  3],
      "right": [ 3,  0],
    };


    if (input.isDown('LEFT')) { // 'd' or left arrow
      bomber.power([-3,  0]);
    } else if (input.isDown('RIGHT')) { // 'k' or right arrow
      bomber.power([3,  0]);
    } else if (input.isDown('UP')) { // 'k' or right arrow
      bomber.power([0,  -3]);
    } else if (input.isDown('DOWN')) { // 'k' or right arrow
      bomber.power([0,  3]);
    } else {
      bomber.power([0,  0]);
    }
  }




})();
