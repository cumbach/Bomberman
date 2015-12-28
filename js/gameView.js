(function() {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var GameView = Bomberman.GameView = function (canvas) {
    this.game = new Bomberman.Game (canvas);
    this.ctx = canvas.getContext('2d');
  };

  GameView.prototype.start = function (canvas) {
    requestAnimationFrame(this.animate.bind(this));
  };
  GameView.prototype.animate = function(){
    // var timeDelta = time - this.lastTime;

    this.game.step();
    if (resources.isReady()) {
      this.game.draw(this.ctx);
    }
    // this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };





})();
