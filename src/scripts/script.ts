import '../styles/style.sass'

import Game from './Game'

let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

Game.canvas = canvas;
Game.ctx = ctx;

Game.start();