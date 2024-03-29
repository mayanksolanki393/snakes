var c = document.getElementById("game");
var ctx = c.getContext("2d");

//var board = new Board(c.height, c.width, c.dataset.blksize);
var snake = new Snake([10,10], Snake.DIRECTION.RIGHT);
var apples = [new Apple(), new Apple(), new Apple(), new Apple(), new Apple()];
var controller = null;
var level = null;
var gameLoop = null;
var playing = true;
var manual = false;

function init() {
    console.log("init-called");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            level = JSON.parse(this.responseText);
            Object.setPrototypeOf(level, Level.prototype);
            var blkHeight = Math.floor(window.innerHeight / level.rows);
            var blkWidth = Math.floor(window.innerWidth / level.cols);
            var blkSize = Math.min(blkHeight, blkWidth);
            ctx.canvas.width = level.cols * blkSize;
            ctx.canvas.height = level.rows * blkSize;
            level.init(blkSize);

            if (manual) {
                controller = new Controller(snake);
                controller.init(controller);
            }
            else {
                controller = new BFSController(level.rows, level.cols);
            }

            gameLoop = setInterval(loop, 150)
        }
    };
    xhttp.open("GET", "levels/level0.json", true);
    xhttp.send();
}

function update() {
    var collision = snake.update(level.collision, level.moveable);
    if (collision) {
        alert("Game Over!");
        clearInterval(gameLoop);
        playing = false;
    }
    level.clearLayer(level.moveable);
    snake.updateLayer(level.moveable);

    for (var apple of apples) {
        apple.update(level.collision, level.moveable, snake.pos);
        apple.updateLayer(level.moveable);
    }
}

function draw() {
    // Draw the state of the world
    ctx.clearRect(0, 0, c.width, c.height);
    level.drawLevel(ctx);
}

function loop() {
    if (! manual) {
        var abstracted = level.getAbstracted();
        for (var apple of apples) {
            if (apple.isVisible){
                abstracted[apple.pos_y][apple.pos_x] = 2;
            }
        }
        abstracted[snake.pos[0]][snake.pos[1]] = 0;
        var nextMove = controller.getNextMove(abstracted, snake.pos);
        snake.move(nextMove);    
    }
    update();
    if (playing) draw();
}

init();