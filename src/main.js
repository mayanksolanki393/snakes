var c = document.getElementById("game");
var ctx = c.getContext("2d");

var board = new Board(c.height, c.width, c.dataset.blksize);
var snake = new Snake([10,10],[1,0]);

var controller = new Controller(board, snake);
controller.init(controller);

function update() {
    snake.update();
    console.log(snake);
}

function draw() {
    // Draw the state of the world
    ctx.clearRect(0, 0, c.width, c.height);
    board.clear();
    snake.draw(board);
    board.draw(ctx);
}

function loop() {
    update();
    draw();
}

setInterval(loop, 100);