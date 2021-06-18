
import { WIDTH, HEIGHT, grid_size } from "./game.js";
import { apple } from "./snake.js";

var canvas;
var ctx;

const SNAKE_COLOUR = "green";
const SNAKE_HEAD_COLOUR = "#2ead1a";
const APPLE_COLOUR = "red";


export function init(){
    console.log("Initliazing Game...");

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    initCanvas();
}


export function initCanvas(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = "grey";
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
}


export function drawApple(){
    ctx.fillStyle = APPLE_COLOUR;
    let x_draw = apple.x*grid_size;
    let y_draw = apple.y*grid_size;
    ctx.fillRect(x_draw, y_draw, grid_size, grid_size);
}


export function drawSnakeBody(body){
    //body of snake
    ctx.fillStyle = SNAKE_COLOUR;
    let x_draw = body.x*grid_size;
    let y_draw = body.y*grid_size;
    ctx.fillRect(x_draw, y_draw, grid_size, grid_size);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x_draw, y_draw, grid_size, grid_size);

    //head of snake
    ctx.fillStyle = SNAKE_HEAD_COLOUR;
    x_draw = window.snake[0].x*grid_size;
    y_draw = window.snake[0].y*grid_size;
    ctx.fillRect(x_draw, y_draw, grid_size, grid_size);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(x_draw, y_draw, grid_size, grid_size);
}