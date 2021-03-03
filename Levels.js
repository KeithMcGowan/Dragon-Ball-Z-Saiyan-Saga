class Level {
    constructor() {
        this.background0 = new Image();
        this.background0.src = './Backgrounds/Background(0).jpg';
        this.background1 = new Image();
        this.background1.src = './Backgrounds/Background(1).jpg';
        this.background2 = new Image();
        this.background2.src = './Backgrounds/Background(2).jpg';
    }

    drawLevel(background) {
    
        ctx.drawImage(
            background, 
            0, 
            0, 
            canvas.width, 
            canvas.height
        );
    }
}