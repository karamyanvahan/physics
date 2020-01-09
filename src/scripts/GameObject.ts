import Game from './Game';

export class GameObject {
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    x:number = 0;
    y:number = 0;
    
    speedX:number = 0;
    speedY:number = 0;

    addToScene() {
        Game.scene.push(this);
    }

    render() {
        //gravity
        let gravity = Game.gravity;
        this.speedX += gravity.power * Math.cos(gravity.angle);
        this.speedY -= gravity.power * Math.sin(gravity.angle);

        //levitation
        let dest;
        if(Game.pointerX) {
            dest = Math.sqrt(Math.pow(this.x - Game.pointerX, 2) + Math.pow(this.y - Game.pointerY, 2));
            this.speedX += (Game.levitationPower / dest) * ((Game.pointerX - this.x) / dest);
            this.speedY -= (Game.levitationPower / dest) * ((this.y - Game.pointerY) / dest);
        }

        this.x += this.speedX;
        this.y += this.speedY;

        Game.ctx.beginPath();
    };
}

export class Ball extends GameObject {
    constructor(x:number, y:number, radius:number) {
        super(x, y);
        this.radius = radius;
    }

    radius:number;
    render() {
        super.render();
        if(this.y + this.radius > Game.canvas.height) {
            this.y = Game.canvas.height - this.radius;
            this.speedY *= -0.6;
        }

        if(this.y - this.radius < 0) {
            this.y = this.radius;
            this.speedY *= -0.6;
        }

        if(this.x - this.radius < 0) {
            this.x = this.radius;
            this.speedX *= -0.6;
        }

        if(this.x + this.radius > Game.canvas.width) {
            this.x = Game.canvas.height - this.radius;
            this.speedX *= -0.6;
        }

        Game.ctx.fillStyle = "#000";
        Game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        Game.ctx.fill();
    }
}