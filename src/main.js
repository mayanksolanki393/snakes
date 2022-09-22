var c = document.getElementById("game");
var ctx = c.getContext("2d");

//var board = new Board(c.height, c.width, c.dataset.blksize);
var snake = new Snake([10,10], Snake.DIRECTION.RIGHT);

var controller = new Controller(snake);
controller.init(controller);

// function update() {
//     snake.update();
//     console.log(snake);
// }

class Block {
    constructor(src) {
        this.sprite = new Image();
        this.sprite.src = src;
    }
}

globals = {}
BLOCKS = [
    [
        new Block(""),
        new Block("assets/bg/light.png"),
        new Block("assets/bg/dark.png"),
        new Block("assets/bg/wall.png"),
    ],[
        new Block(""),
        new Block("assets/sprite/body_bottomleft.png"),  // 1
        new Block("assets/sprite/body_bottomright.png"), // 2
        new Block("assets/sprite/body_horizontal.png"),  // 3
        new Block("assets/sprite/body_topleft.png"),     // 4
        new Block("assets/sprite/body_topright.png"),    // 5
        new Block("assets/sprite/body_vertical.png"),    // 6
        new Block("assets/sprite/head_down.png"),        // 7
        new Block("assets/sprite/head_left.png"),        // 8
        new Block("assets/sprite/head_right.png"),       // 9
        new Block("assets/sprite/head_up.png"),          // 10
        new Block("assets/sprite/tail_down.png"),        // 11
        new Block("assets/sprite/tail_left.png"),        // 12
        new Block("assets/sprite/tail_right.png"),       // 13
        new Block("assets/sprite/tail_up.png"),          // 14
        new Block("assets/sprite/apple.png"),            // 15
    ]
];

function loadLevel() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        content = JSON.parse(this.responseText);
        var layers = [];
        for (var i=0; i<content.length; i++) {
            layers.push(new Layer(content[i]));
        }
        globals["layers"] = layers;
      }
    };
    xhttp.open("GET", "levels/level0.json", true);
    xhttp.send();
}

function init() {
    console.log("init-called");
    loadLevel();
    setInterval(loop, 150);
}

function D2Arrary(rows, cols) {
    return Array(rows).fill().map(() => Array(cols).fill(0))
}


function update() {
    snake.update();
    updateLayer = D2Arrary(globals["layers"][1].rows, globals["layers"][1].cols);
    snake.updateLayer(updateLayer);
    globals["layers"][1].map = updateLayer;

}

function draw() {
    // Draw the state of the world
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i=0; i<globals["layers"].length; i++) {
        globals["layers"][i].draw(ctx, BLOCKS[i]);
    }
}

function loop() {
    update();
    draw();
}

setTimeout(function(){
init();
},
1000
);