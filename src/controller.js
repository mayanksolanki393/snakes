var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
  };

class Controller {
    constructor(snake) {
        //this.board = board;
        this.snake = snake;
        this.input = { left: false, right: false, up: false, down: false, }
    }

    init(controller) {
        document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
        document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);
        
        function onkey(ev, key, pressed) {
            switch(key) {
                case KEY.A:  controller.snake.left(); ev.preventDefault(); break;
                case KEY.D: controller.snake.right(); ev.preventDefault(); break;
                case KEY.W:  controller.snake.up(); ev.preventDefault(); break;
                case KEY.S: controller.snake.down(); ev.preventDefault(); break;
                case KEY.SPACE: controller.snake.grow(); ev.preventDefault(); break;
            }
        }
    }
}

class BFSController {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.moves = [];
    }

    getNeighbours(cell) {
        var posy = cell[0];
        var posx = cell[1];

        var toReturn = [];
        if (posx+1 < this.cols) toReturn.push([posy, posx+1]);
        if (posy+1 < this.rows) toReturn.push([posy+1, posx]);

        if (posx-1 >= 0) toReturn.push([posy, posx-1]);
        if (posy-1 >= 0) toReturn.push([posy-1, posx]);

        return toReturn;
    }

    getIndex(cell) {
        var row = cell[0];
        var col = cell[1];
        return row * this.rows + col;
    }

    getNode(index) {
        var row = Math.floor(index / this.cols);
        var col = index % this.cols;
        return 
    }

    getMove(pos_src, pos_des) {
        var move = ""
        if (pos_src[0] + 1 == pos_des[0]) move = "down";
        else if (pos_src[0] - 1 == pos_des[0]) move = "up";
        else if (pos_src[1] + 1 == pos_des[1]) move = "right";
        else if (pos_src[1] - 1 == pos_des[1]) move = "left";
        else move = "";

        return move;
    }

    analyze(abstracted, snake_head, path) {
        var visited = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        var nearest = Array(this.rows * this.cols).fill(0);
        var queue = [snake_head];

        var applefound = false;
        while (queue.length) {
            var curr = queue.shift();

            //blocked cannot use it
            if (abstracted[curr[0]][curr[1]] == 1 || visited[curr[0]][curr[1]] != 0) {
                continue;
            }
            
            //reached destination
            if (abstracted[curr[0]][curr[1]] == 2) {
                visited[neigh[0]][neigh[1]] = 2;
                applefound = true;
                break;
            }

            var neigbours = this.getNeighbours(curr);

            for (var neigh of neigbours) {
                if (visited[neigh[0]][neigh[1]] == 0 && nearest[this.getIndex(neigh)] == 0) {
                    queue.push(neigh);
                    nearest[this.getIndex(neigh)] = curr;
                }
            }
            visited[curr[0]][curr[1]] = 1;
        }

        var moves = [];
        if (applefound) {
            while ((curr[0] != snake_head[0] || curr[1] != snake_head[1]) && moves.length < this.rows*this.cols) {
                var src = nearest[this.getIndex(curr)];
                moves.push(this.getMove(src, curr));
                curr = src;
            }
            moves.reverse();
        }
        else {
            var poy = snake_head[0];
            var pox = snake_head[1];

            if (abstracted[poy][pox+1] == 0) moves.push("right");
            else if (abstracted[poy][pox-1] == 0) moves.push("left");
            else if (abstracted[poy-1][pox] == 0) moves.push("up");
            else moves.push("down");
        }
        ``
        this.moves = [moves[0]];
    }

    getNextMove(abstracted, snake_head) {
        if (!this.moves.length) {
            this.analyze(abstracted, snake_head);
        }
        console.log(this.moves);
        return this.moves.shift();
    }
}