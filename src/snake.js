class Snake {
    SNAKE_BODY = {
        "LEFT_RIGHT" : 3,
        "RIGHT_LEFT" : 3,
        "BOTTOM_TOP" : 6,
        "TOP_BOTTOM" : 6,
        "TOP_LEFT" : 4,
        "LEFT_TOP" : 4,
        "TOP_RIGHT" : 5,
        "RIGHT_TOP" : 5,
        "BOTTOM_LEFT" : 1,
        "LEFT_BOTTOM" : 1,
        "BOTTOM_RIGHT" : 2,
        "RIGHT_BOTTOM" : 2,
    };

    SNAKE_HEAD = {
        "UP" : 10,
        "DOWN" : 7,
        "LEFT" : 8,
        "RIGHT" : 9
    };
    
    SNAKE_TAIL = {
        "BOTTOM" : 14,
        "TOP" : 11,
        "RIGHT" : 12,
        "LEFT" : 13
    };

    static DIRECTION = {
        "RIGHT" : [0, 1],
        "LEFT" : [0, -1],
        "UP" : [-1, 0],
        "DOWN" : [1, 0]
    };

    constructor(pos, dir) {
      this.pos = pos;
      this.dir = dir;
      this.body = [pos, this.addVec(this.pos, this.dir)]
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

    compareVec(vec1, vec2) {
        return vec1[0] == vec2[0] && vec1[1] == vec2[1];
    }

    direction(vec1, vec2) {
        var right = this.addVec(vec1, Snake.DIRECTION.RIGHT);
        var left = this.addVec(vec1, Snake.DIRECTION.LEFT);
        var up = this.addVec(vec1, Snake.DIRECTION.UP);
        var down = this.addVec(vec1, Snake.DIRECTION.DOWN);

        if (this.compareVec(vec2, right)) return "RIGHT";
        if (this.compareVec(vec2, left)) return "LEFT";
        if (this.compareVec(vec2, up)) return "TOP";
        if (this.compareVec(vec2, down)) return "BOTTOM";
    }
    
    updateLayer(layer) {
        // DRAW HEAD
        if (this.dir[0] == 0 && this.dir[1] == 1) {
            layer[this.pos[0]][this.pos[1]] = this.SNAKE_HEAD.RIGHT;
        }
        else if (this.dir[0] == 0 && this.dir[1] == -1) {
            layer[this.pos[0]][this.pos[1]] = this.SNAKE_HEAD.LEFT;
        }
        else if (this.dir[0] == -1 && this.dir[1] == 0) {
            layer[this.pos[0]][this.pos[1]] = this.SNAKE_HEAD.UP;
        }
        else {
            layer[this.pos[0]][this.pos[1]] = this.SNAKE_HEAD.DOWN;
        }

        // DRAW BODY
        for (var i=1; i<this.body.length-1; i++) {
            var prevDir = this.direction(this.body[i], this.body[i-1]); 
            var nextDir = this.direction(this.body[i], this.body[i+1]);
            
            var loc = this.body[i];
            layer[loc[0]][loc[1]] = this.SNAKE_BODY[prevDir + "_" + nextDir];
        }

        //DRAW TAIL
        var prevDir = this.direction(this.body[this.body.length-1], this.body[this.body.length-2]);
        var loc = this.body[this.body.length-1];
        layer[loc[0]][loc[1]] = this.SNAKE_TAIL[prevDir];
    }

    left(){
        this.dir = [0, -1];
    }

    right(){
        this.dir = [0, 1];
    }

    up(){
        this.dir = [-1, 0];
    }

    down(){
        this.dir = [1, 0];
    }
  }