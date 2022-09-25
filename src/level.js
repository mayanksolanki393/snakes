
function newBlock(src) {
    var sprite = new Image();
    sprite.src = src;
    return sprite;
}

BLOCKS = {
    "background" : [
        newBlock(""),
        newBlock("assets/bg/light.png"),
        newBlock("assets/bg/dark.png"),
        newBlock("assets/bg/wall.png"),
    ],
    "moveable" : [
        newBlock(""),
        newBlock("assets/sprite/body_bottomleft.png"),  // 1
        newBlock("assets/sprite/body_bottomright.png"), // 2
        newBlock("assets/sprite/body_horizontal.png"),  // 3
        newBlock("assets/sprite/body_topleft.png"),     // 4
        newBlock("assets/sprite/body_topright.png"),    // 5
        newBlock("assets/sprite/body_vertical.png"),    // 6
        newBlock("assets/sprite/head_down.png"),        // 7
        newBlock("assets/sprite/head_left.png"),        // 8
        newBlock("assets/sprite/head_right.png"),       // 9
        newBlock("assets/sprite/head_up.png"),          // 10
        newBlock("assets/sprite/tail_down.png"),        // 11
        newBlock("assets/sprite/tail_left.png"),        // 12
        newBlock("assets/sprite/tail_right.png"),       // 13
        newBlock("assets/sprite/tail_up.png"),          // 14
        newBlock("assets/sprite/apple.png"),            // 15
    ],
    "collision" : [
        newBlock(""),
        newBlock(""),
        //newBlock("assets/bg/collision.png"),  // 1
    ]
};

class Level {
    init(canvasHeight, canvasWidth) {
        var blkHeight = Math.floor(canvasHeight / level.rows);
        var blkWidth = Math.floor(canvasWidth / level.cols);
        this.blkSize = Math.min(blkHeight, blkWidth);
        this.layers.push("moveable");
        this.moveable = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    clearLayer(layer) {
        layer.forEach((row) => row.fill(0));
    }

    drawLevel(ctx) {
        for (var layer of this.layers) {
            for (var row=0; row<this.rows; row++) {
                for (var col=0; col<this.cols; col++) {
                    var pox = row * this.blkSize;
                    var poy = col * this.blkSize;
                    var blockIdx = this[layer][row][col];
                    if (BLOCKS[layer][blockIdx])
                        ctx.drawImage(BLOCKS[layer][blockIdx], poy, pox, this.blkSize, this.blkSize);
                }
            }
        }
    }
}