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