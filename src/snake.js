class Snake {
    constructor(pos, dir) {
      this.pos = pos;
      this.dir = dir;
      this.body = [pos]
      this.growing = false;
    }

    addVec(v1, v2){
        var result = [];
        for (var i in v1) {
            result.push(v1[i] + v2[i]);
        }
        return result;
    }

    grow(){
        this.growing = true;
    }

    update() {
        this.pos = this.addVec(this.pos, this.dir);
        
        if (this.growing) {
            this.growing = false;
        }
        else {
            this.body.pop();
        }
        this.body.unshift(this.pos);
    }
    
    draw(board){
        for (let pos of this.body) {
            board.content[pos[1]][pos[0]] = 1;
        } 
    }

    left(){
        this.dir = [-1, 0];
    }

    right(){
        this.dir = [1, 0];
    }

    up(){
        this.dir = [0, -1];
    }

    down(){
        this.dir = [0, 1];
    }
  }