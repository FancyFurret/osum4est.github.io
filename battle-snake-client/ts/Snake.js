var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    (function (Direction) {
        Direction[Direction["NONE"] = 0] = "NONE";
        Direction[Direction["LEFT"] = 1] = "LEFT";
        Direction[Direction["RIGHT"] = 2] = "RIGHT";
        Direction[Direction["UP"] = 3] = "UP";
        Direction[Direction["DOWN"] = 4] = "DOWN";
    })(BattleSnake.Direction || (BattleSnake.Direction = {}));
    var Direction = BattleSnake.Direction;
    var Snake = (function (_super) {
        __extends(Snake, _super);
        function Snake(game, speed, initLength, size, bodyColor, headColor) {
            _super.call(this, game);
            this.changedDirection = true;
            this.direction = Direction.RIGHT;
            this.speed = speed;
            this.size = size;
            this.bodyColor = bodyColor;
            this.headColor = headColor;
            this.head = new SnakePart(5 * size, 5 * size, headColor);
            this.body = new Array();
            for (var i = initLength; i >= 1; i--)
                this.body.push(new SnakePart(this.head.x - size * i, this.head.y, bodyColor));
            BattleSnake.Input.registerInput(Phaser.Keyboard.UP, this);
            BattleSnake.Input.registerInput(Phaser.Keyboard.DOWN, this);
            BattleSnake.Input.registerInput(Phaser.Keyboard.LEFT, this);
            BattleSnake.Input.registerInput(Phaser.Keyboard.RIGHT, this);
            this.game.time.events.loop(this.speed, this.move, this);
        }
        Snake.prototype.recieveInput = function (key) {
            switch (key) {
                case Phaser.Keyboard.UP:
                    this.changeDirection(Direction.UP);
                    break;
                case Phaser.Keyboard.DOWN:
                    this.changeDirection(Direction.DOWN);
                    break;
                case Phaser.Keyboard.LEFT:
                    this.changeDirection(Direction.LEFT);
                    break;
                case Phaser.Keyboard.RIGHT:
                    this.changeDirection(Direction.RIGHT);
                    break;
            }
        };
        Snake.prototype.changeDirection = function (direction) {
            if (!this.changedDirection && this.isDirectionValid(direction, this.direction) && (this.queuedDirection == null || this.queuedDirection == Direction.NONE)) {
                this.queuedDirection = direction;
                return;
            }
            else if (!this.changedDirection || !this.isDirectionValid(direction, this.direction))
                return;
            this.direction = direction;
            this.changedDirection = false;
        };
        Snake.prototype.isDirectionValid = function (direction1, direction2) {
            if (direction1 == Direction.UP && direction2 == Direction.DOWN ||
                direction1 == Direction.DOWN && direction2 == Direction.UP ||
                direction1 == Direction.LEFT && direction2 == Direction.RIGHT ||
                direction1 == Direction.RIGHT && direction2 == Direction.LEFT)
                return false;
            return true;
        };
        Snake.prototype.render = function (rendering) {
            rendering.drawSquare(this.head.x, this.head.y, this.size, this.headColor);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x, this.body[i].y, this.size, this.bodyColor);
        };
        Snake.prototype.move = function () {
            var moveX = 0;
            var moveY = 0;
            if (this.queuedDirection != null && this.queuedDirection != Direction.NONE && this.changedDirection) {
                this.direction = this.queuedDirection;
                this.queuedDirection = Direction.NONE;
            }
            switch (this.direction) {
                case Direction.LEFT:
                    moveX = -1;
                    break;
                case Direction.RIGHT:
                    moveX = 1;
                    break;
                case Direction.UP:
                    moveY = -1;
                    break;
                case Direction.DOWN:
                    moveY = 1;
                    break;
            }
            for (var i = 0; i < this.body.length - 1; i++) {
                this.body[i].x = this.body[i + 1].x;
                this.body[i].y = this.body[i + 1].y;
            }
            this.body[this.body.length - 1].x = this.head.x;
            this.body[this.body.length - 1].y = this.head.y;
            this.head.x += moveX * this.size;
            this.head.y += moveY * this.size;
            this.changedDirection = true;
            BattleSnake.Networking.getInstance().move(this.getJSON());
        };
        Snake.prototype.getJSON = function () {
            var json = {
                speed: this.speed,
                size: this.size,
                head: {
                    x: this.head.x,
                    y: this.head.y,
                    color: this.head.color
                }
            };
            json['body'] = [];
            for (var i = 0; i < this.body.length; i++) {
                json['body'][i] = {};
                json['body'][i]['x'] = this.body[i].x;
                json['body'][i]['y'] = this.body[i].y;
                json['body'][i]['color'] = this.body[i].color;
            }
            ;
            return json;
        };
        return Snake;
    }(BattleSnake.GameObject));
    BattleSnake.Snake = Snake;
    var SnakePart = (function () {
        function SnakePart(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
        return SnakePart;
    }());
})(BattleSnake || (BattleSnake = {}));
