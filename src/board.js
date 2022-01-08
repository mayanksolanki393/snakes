class Board {
    constructor(height, width, block_size) {
        this.rows = height / block_size;
        this.cols = width / block_size;
        this.height = height;
        this.width = width;
        this.block_size = block_size;
        this.content = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    clear() {
        for (var i=0; i<this.rows; i++) {
            for (var j=0; j<this.cols; j++) {
                if (this.content[i][j] > 0)
                    this.content[i][j] = 0;
            }
        }
    }
    draw(ctx){
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = "grey";

        for (var i=0; i<=this.rows; i++) {
            //draw horizontal line
            ctx.beginPath();
            ctx.moveTo(0, i*this.block_size);       
            ctx.lineTo(this.width, i*this.block_size);
            ctx.stroke();
        }

        for (var j=0; j<=this.cols; j++) {
            //draw vertical line
            ctx.beginPath();
            ctx.moveTo(j*this.block_size, 0);       
            ctx.lineTo(j*this.block_size, this.height);
            ctx.stroke();
        }
    
        for (var i=0; i<this.rows; i++) {
            for (var j=0; j<this.cols; j++) {
                if (this.content[i][j] != 0)
                    ctx.fillRect(j*this.block_size, i*this.block_size, this.block_size, this.block_size);
            }
        }
    }
}