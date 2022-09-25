var c = document.getElementById("game");
var ctx = c.getContext("2d");

//var board = new Board(c.height, c.width, c.dataset.blksize);
var snake = new Snake([10,10], Snake.DIRECTION.RIGHT);
var controller = new Controller(snake);
controller.init(controller);

var level = null;
var gameLoop = null;
function init() {
    console.log("init-called");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            level = JSON.parse(this.responseText);
            Object.setPrototypeOf(level, Level.prototype);
            level.init(c.height, c.width);
            gameLoop = setInterval(loop, 150)
        }
    };
    xhttp.open("GET", "levels/level0.json", true);
    xhttp.send();
}

function update() {
    var collision = snake.update(level.collision);
    if (collision) {
        alert("Game Over!");
        clearInterval(gameLoop);
    }
    updateLayer = level.getFreshLayer();
    snake.updateLayer(updateLayer);
    level.moveable = updateLayer;
}

function draw() {
    // Draw the state of the world
    ctx.clearRect(0, 0, c.width, c.height);
    level.drawLevel(ctx);
}

function loop() {
    update();
    draw();
}

init();