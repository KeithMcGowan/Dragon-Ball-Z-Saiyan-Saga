class Goku {
  constructor(currentGame) {
    this.img = new Image();
    this.x = 370;
    this.y = 0;
    this.width = 60;
    this.height = 120;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.jumping = true;
    this.facingRight = true;
    this.attack = false;
    this.currentGame = currentGame;
  }

  drawGoku() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  safeFromEdges() {
    if (this.x <= 40 && currentGame.activeDirections.left) return false;

    if (this.x >= 700 && currentGame.activeDirections.right) return false;

    return true;
  }

  move = (currentGame) => {
    // Gravity
    this.yVelocity += 0.9;
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // Friction
    this.xVelocity *= 0.9;
    this.yVelocity *= 0.9;

    // Floor
    if (this.y > 500 - 40 - 120) {
      this.jumping = false;
      this.y = 500 - 40 - 120;
      this.yVelocity = 0;
    }

    if (this.safeFromEdges()) {
      // Idle
      if (!this.currentGame.activeDirections.right && !this.currentGame.activeDirections.left && !this.currentGame.activeDirections.up) {
        if (this.facingRight)
        this.img.src = "./Goku/Goku Right/Goku(0).png";
        else
        this.img.src = './Goku/Goku Left/Goku(0).png';
      }

      // Moving
      if (this.currentGame.activeDirections.right) {
        this.facingRight = true;
        this.img.src = "./Goku/Goku Right/Goku(1).png";
        this.xVelocity += 0.4;
      }

      if (this.currentGame.activeDirections.left) {
        this.facingRight = false;
        this.img.src = "./Goku/Goku Left/Goku(1).png";
        this.xVelocity -= 0.4;
      }

      // Jumping
      if (this.currentGame.activeDirections.up && this.jumping == false) {
        this.yVelocity -= 35;
        this.jumping = true;
      }

      if (this.currentGame.activeDirections.up) {
        if (this.facingRight)
        this.img.src = "./Goku/Goku Right/Goku(4).png";
        else
        this.img.src = './Goku/Goku Left/Goku(4).png';
      }

      // Ground Attack
      if (this.currentGame.activeDirections.attack) {
        if (this.facingRight) {
            this.img.src = "./Goku/Goku Right/Goku(2).png";
            this.attack = this.x + this.width - 20;
            setTimeout(() => {
                this.attack = false;
            }, 200);
        }
        else {
            this.img.src = './Goku/Goku Left/Goku(2).png';
            this.attack = this.x - this.width;
        }
      }

      // Jump Attack
      if (this.currentGame.activeDirections.up && this.currentGame.activeDirections.attack) {
        if (this.facingRight)
        this.img.src = "./Goku/Goku Right/Goku(3).png";
        else
        this.img.src = './Goku/Goku Left/Goku(3).png';
      }
    //   no image when up and left

      // Special Attack
      if (this.currentGame.activeDirections.special) {
        if (this.facingRight)
        this.img.src = "./Goku/Goku Right/Goku(5).png";
        else
        this.img.src = "./Goku/Goku Left/Goku(5).png";
      }
    }
  };
}
