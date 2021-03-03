class Saibamen {
    constructor(x, y, width, height) {
        this.img = new Image();
        this.img.src = './Saibamen/Saibamen Left/Saibamen(1).png'
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawEnemy() {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    moveLeftForever() {
        setInterval(() => {
            this.x -= 5;
        }, 20);
    }
}