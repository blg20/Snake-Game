import last_key_pressed from "./game.js";

export var apple = {x:0, y:0};



export function placeAppleRandomly(){

    var apple_placed = false;

    while(!apple_placed){
        apple = {x: Math.floor(Math.random()*window.grid_count), y: Math.floor(Math.random()*window.grid_count)};
        apple_placed = true;
        if (isOnSnake(apple)){
            apple_placed = false;
        }
    }
    console.log("Apple Placed at : ", apple.x, apple.y);
}


export function moveSnake() {
    for(let i = window.snake.length - 2; i >= 0; i--) {
        window.snake[i + 1] = { ...window.snake[i] }
    }

    window.snake[0].x += last_key_pressed.x;
    window.snake[0].y += last_key_pressed.y;
}


export function checkDeath(){

    if (window.snake[0].x < 0 ||
        window.snake[0].x >= window.grid_count ||
        window.snake[0].y < 0 ||
        window.snake[0].y >= window.grid_count){

        console.log("SNAKE TOUCHED EDGE!!");
        window.running = false;
        window.has_died = true;
    }

    if (window.snake.length>1){
        for (var i = 1; i < window.snake.length; i++){
            if (window.snake[0].x == window.snake[i].x && window.snake[0].y == window.snake[i].y){
                console.log("SNAKE ATE ITSELF!!");
                window.has_died = true;
                window.running = false;
            }
        }
    }

    if (window.has_died === true) {
        document.getElementById("game_over").innerHTML = "GAME OVER";
    }

    if (window.has_died === false) {
        document.getElementById("game_over").innerHTML = "";
    }
}



export function checkApple(){
    if (isOnSnake(apple)){
        placeAppleRandomly();
        window.snake.push({ ...window.snake[0] })
    };
}


export function initSnake(){
    window.snake = [{x : Math.floor(window.grid_count/2), y : Math.floor(window.grid_count/2)}];
    console.log("Starting position", window.snake[0]);
}


function isOnSnake(position){
    for (var i = 0; i<window.snake.length; i++){
        if (window.snake[i].x == position.x && window.snake[i].y == position.y){
            return true;
        }
    }
    return false;
}


