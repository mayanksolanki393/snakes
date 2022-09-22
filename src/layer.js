class Layer {
    constructor(map) {
        this.rows = map.length;
        this.cols = map[0].length;
        this.map = map;
    }

    draw(ctx, blocks, blkSize=20) {
        for (var row=0; row<this.rows; row++) {
            for (var col=0; col<this.cols; col++) {
                var pox = row * blkSize;
                var poy = col * blkSize;
                ctx.drawImage(blocks[this.map[row][col]].sprite,poy, pox, blkSize, blkSize);
            }
        }    
    }
}