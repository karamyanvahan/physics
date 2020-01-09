import {GameObject, Ball} from './GameObject'
import Gravity from './Gravity'

export default class Game {
    static scene:GameObject[] = [];
    static canvas:HTMLCanvasElement;
    static ctx:CanvasRenderingContext2D;
    static pointerX:number;
    static pointerY:number;
    static levitationPower:number = 20;

    static gravity:Gravity = new Gravity();

    static start() {
        let player = new Ball(100, 100, 30);
        player.speedY = 1
        player.addToScene();

        Game.canvas.addEventListener('mousemove', function(e) {
            Game.pointerX = e.offsetX;
            Game.pointerY = e.offsetY;
        });

        Game.canvas.addEventListener('mouseleave', function() {
            Game.pointerX = undefined;
            Game.pointerY = undefined;
        });

        this.update()
    }

    static update() {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

        for(let gameObject of Game.scene) {
            gameObject.render();
        }
        requestAnimationFrame(Game.update);
    }
}