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
        function Snake(speed) {
            _super.call(this);
            this.speed = speed;
        }
        Snake.prototype.loadJSON = function (json) {
            if (json['direction'] != null)
                this.direction = json['direction'];
            if (json['speed'] != null)
                this.speed = json['speed'];
            if (json['size'] != null)
                this.size = json['size'];
            if (json['head'] != null)
                this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            if (json['body'] != null) {
                this.body = new Array();
                for (var i = 0; i < json['body'].length; i++) {
                    this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']));
                }
            }
        };
        Snake.prototype.render = function (rendering) {
            rendering.drawSquare(this.head.x, this.head.y, this.size, this.head.color);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x, this.body[i].y, this.size, this.body[i].color);
        };
        Snake.prototype.move = function () {
            var moveX = 0;
            var moveY = 0;
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
            if (this.head.x + moveX * this.size >= BattleSnake.Play.boardSize * (BattleSnake.Play.boardWidth - 1))
                this.head.x = BattleSnake.Play.boardSize;
            else if (this.head.x + moveX * this.size <= 0)
                this.head.x = BattleSnake.Play.boardSize * (BattleSnake.Play.boardWidth - 2);
            else if (this.head.y + moveY * this.size >= BattleSnake.Play.boardSize * (BattleSnake.Play.boardHeight - 1))
                this.head.y = BattleSnake.Play.boardSize;
            else if (this.head.y + moveY * this.size <= 0)
                this.head.y = BattleSnake.Play.boardSize * (BattleSnake.Play.boardHeight - 2);
            else {
                this.head.x += moveX * this.size;
                this.head.y += moveY * this.size;
            }
        };
        Snake.prototype.getJSON = function () {
            var json = {
                speed: this.speed,
                size: this.size,
                direction: this.direction,
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
        Snake.prototype.getDirectionJSON = function () {
            var json = {
                direction: this.direction
            };
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
    BattleSnake.SnakePart = SnakePart;
})(BattleSnake || (BattleSnake = {}));
