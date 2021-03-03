class Game {
  constructor() {
    this.activeDirections = {
      up: false,
      left: false,
      right: false,
      attack: false,
      special: false,
    };
    this.saibamenArrayLeft = [];
    this.gameID = null;
    this.goku = new Goku(this);
    this.level = new Level();
    this.saibamen = new Saibamen();
    this.collision = false;
    this.health = 1;
    this.saibamenKilled = 9;
    this.gameLoop();
  }

  generateSaibamenLeft() {
    const saibamenHeight = 80;
    const saibamenWidth = 60;
    const yValue = 500 - 40 - 80;
    const newSaibamen = new Saibamen(
      canvas.width,
      yValue,
      saibamenWidth,
      saibamenHeight
    );

    this.saibamenArrayLeft.push(newSaibamen);
    newSaibamen.moveLeftForever();
  }

  checkForDefeat() {
    if (this.health <= 0) {
      ctx.font = '60px Comic Sans MS';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 8;
      ctx.strokeText("Game Over!", (canvas.width/2 - 160), canvas.height/2);
      ctx.fillStyle = '#e65c00';
      ctx.fillText("Game Over!", (canvas.width/2 - 160), canvas.height/2);
      clearInterval(this.gameID());
    }
  }

  checkForVictory() {
    if (this.saibamenKilled >= 10) {
      ctx.font = '60px Comic Sans MS';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 8;
      ctx.strokeText("Earth is Saved!", (canvas.width/2 - 200), canvas.height/2);
      ctx.fillStyle = '#e65c00';
      ctx.fillText("Earth is Saved!", (canvas.width/2 - 200), canvas.height/2);
      clearInterval(this.gameID());
    }
  }

  detectCollisions(obj1, obj2) {
    return !(
      obj1.y > obj2.y + obj2.height ||
      obj1.x > obj2.x + obj2.width-20 ||
      obj1.y + obj1.height < obj2.y ||
      obj1.x + obj1.width-20 < obj2.x
    );
  }

  gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.level.drawLevel(this.level.background0);
    
    this.checkForVictory();

    this.saibamenArrayLeft.forEach((eachSaibamen, index) => {
      eachSaibamen.drawEnemy();
      if (!this.goku.recentlyHit && this.detectCollisions(this.goku, eachSaibamen)) {
        this.health -= 1;
        document.querySelector("#health span").innerHTML = this.health;
        console.log("collision");
        this.goku.recentlyHit = true;
        setTimeout(() => {
            this.goku.recentlyHit = false;
        }, 1000);
      }
      if (this.goku.attack !== false) {
          const hitbox = {x: this.goku.attack, y: this.goku.y, height: this.goku.height, width: this.goku.width}
          if (this.detectCollisions(hitbox, eachSaibamen)) {
            this.saibamenKilled += 1;
            document.querySelector('#killed span').innerHTML = this.saibamenKilled;
            console.log('hit')
            this.saibamenArrayLeft.splice(index, 1);
            this.goku.attack = false;
          }
        }
      });
      
      this.goku.drawGoku();
      
      this.goku.move(this);
      
      let randoLeft = Math.random();
      if (randoLeft > 0.998) this.generateSaibamenLeft();
      
    this.checkForDefeat();

    this.gameID = requestAnimationFrame(this.gameLoop);
  };
}
