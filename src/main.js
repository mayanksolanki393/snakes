var c = document.getElementById("game");
var ctx = c.getContext("2d");

//var board = new Board(c.height, c.width, c.dataset.blksize);
//var snake = new Snake([10,10],[1,0]);

//var controller = new Controller(board, snake);
//controller.init(controller);

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
        new Block("assets/sprite/body_bottomleft.png"),
        new Block("assets/sprite/body_bottomright.png"),
        new Block("assets/sprite/body_horizontal.png"),
        new Block("assets/sprite/body_topleft.png"),
        new Block("assets/sprite/body_topright.png"),
        new Block("assets/sprite/body_vertical.png"),
        new Block("assets/sprite/head_down.png"),
        new Block("assets/sprite/head_left.png"),
        new Block("assets/sprite/head_right.png"),
        new Block("assets/sprite/head_up.png"),
        new Block("assets/sprite/tail_down.png"),
        new Block("assets/sprite/tail_left.png"),
        new Block("assets/sprite/tail_right.png"),
        new Block("assets/sprite/tail_up.png"),
        new Block("assets/sprite/apple.png"),
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
    setInterval(loop, 100);
}
function draw() {
    // Draw the state of the world
    ctx.clearRect(0, 0, c.width, c.height);
    // board.clear();
    // snake.draw(board);
    // board.draw(ctx);
    for (var i=0; i<globals["layers"].length; i++) {
        globals["layers"][i].draw(ctx, BLOCKS[i]);
    }
    

    
}

function loop() {
    //update();
    draw();
}

setTimeout(function(){
init();
},
1000
);