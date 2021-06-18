import Ajax from "./ajax.js";
import snk from "./functions.js";
import { init, initCanvas, drawApple, drawSnakeBody } from "./draw.js";
import { placeAppleRandomly, moveSnake, checkDeath, checkApple, initSnake } from "./snake.js";



window.loop_rate;
window.grid_count = 15;
window.snake = [];
window.scoreboard = [];
window.running = false;
window.has_died = false;

var array_scores = [];

export const WIDTH = 300;
export const HEIGHT = WIDTH;

export var last_key_pressed = {x:0, y:0};

export var grid_size;





//SLIDERS
var slider1 = document.getElementById("board-size");
var output1 = document.getElementById("value1");
output1.innerHTML = slider1.value;
window.grid_count = slider1.value;

slider1.oninput = function() {
    output1.innerHTML = this.value;
};
slider1.addEventListener("input", function() {
    var x = slider1.value;
    const color = `linear-gradient(90deg, rgb(117,252,117) ${x}%, rgb(214,214,214) ${x}%)`;
    slider1.style.background = color;
});


var slider2 = document.getElementById("snake-speed");
var output2 = document.getElementById("value2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
    output2.innerHTML = this.value;
}
slider2.addEventListener("input", function() {
    var x = slider2.value;
    const color = `linear-gradient(90deg, rgb(117,252,117) ${5*x}%, rgb(214,214,214) ${5*x}%)`;
    slider2.style.background = color;
})


// Runs when START button is pressed
// Resets parameters for a new game
function startGame(){

    console.log("Starting Game...");
    window.running = true;
    window.has_died = false;

    grid_size = Math.floor(WIDTH / window.grid_count);
    console.log("Number of Cells : ", window.grid_count);
    console.log("Grid Pixel Size : ", grid_size);
    last_key_pressed = {x:0, y:0};


    initCanvas();
    initSnake();
    placeAppleRandomly();
    loop();
}


// MAIN GAME LOOP
// The speed of this loop determines the speed of the snake
// This is where all the functions are called (drawing canvas and snake)
function loop(){

    window.loop_rate = slider2.value;
    window.grid_count = slider1.value;

    initCanvas();
    moveSnake();
    drawApple();
    for (var i = 0; i<window.snake.length; i++){
        drawSnakeBody(window.snake[i]);
    }

    checkDeath();
    checkApple();

    document.getElementById("score").innerHTML = window.snake.length;

    if (window.running) setTimeout(loop, 1000 / window.loop_rate);
}



// SERVER SIDE function
// Handles the history of players
function submitHighScore(){
    var userName =  document.getElementById("player_name_form").value;

    Ajax.query({
        "type":"submit_highscore",
        "player": userName,
        "score": window.snake.length

    }).then(function (output) {
        window.scoreboard = output;

        var list_of_scores = window.scoreboard
        console.log(list_of_scores)

        for (var i = 0; i < list_of_scores.length; i++) {
            var newvar = `${ snk.alter(list_of_scores[i].player) } Score: ${ list_of_scores[i].score }`;
            array_scores.push(newvar);
        };

        var ul = document.getElementById("history_list");
        ul.textContent = "";

        array_scores.forEach(function (array_scores) {
            let li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML += array_scores;
        })

        if (array_scores.length > 20) {
            clearHistory()
        }
    });
}


// SERVER SIDE function
// Clears the history of players
// Pop-Up asks player if they want to clear the history
function clearHistory(){

    var r = confirm("Hissstory is full. Press OK to clear:");
    console.log("User Pressed OK to clear hisssst")

    if (r == true) {

        Ajax.query({
            "type":"empty_history",
        }).then( function (output) {
            array_scores = output;
            console.log("Array of scores has been emptied")

            var ul = document.getElementById("history_list");
            ul = document.getElementById("history_list");
            document.getElementById("history_list").innerHTML = "";
        })
    }

}


// KEYS to move the snake
// Only four arrow keys
// Defines snake rules such as impossible to reverse direction
onkeydown = function(e) {
    var key_id = e.key;
    switch(key_id){
        case "ArrowUp":
            if (last_key_pressed.y==1) break;
            last_key_pressed = {x:0, y:-1};
            break;
        case "ArrowDown":
            if (last_key_pressed.y==-1) break;
            last_key_pressed = {x:0, y:1};
            break;
        case "ArrowLeft":
            if (last_key_pressed.x==1) break;
            last_key_pressed = {x:-1, y:0};
            break;
        case "ArrowRight":
            if (last_key_pressed.x==-1) break;
            last_key_pressed = {x:1, y:0};
            break;
    }
};


// When page is loaded, calls init() which starts the game
// Initialises the buttons
window.onload = function(){
    document.getElementById("start_game_button").addEventListener("click", startGame);
    document.getElementById("submit_high_button").addEventListener("click", submitHighScore);
    init();
}








