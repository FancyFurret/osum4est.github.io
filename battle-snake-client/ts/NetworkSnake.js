var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var NetworkSnake = (function (_super) {
        __extends(NetworkSnake, _super);
        function NetworkSnake(game, json) {
            _super.call(this, game);
            console.log(json);
            this.loadJSON(json);
        }
        NetworkSnake.prototype.loadJSON = function (json) {
            this.speed = json['speed'];
            this.size = json['size'];
            this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            this.body = new Array();
            for (var i = 0; i < json['body'].length; i++) {
                this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']));
            }
        };
        NetworkSnake.prototype.render = function (rendering) {
            rendering.drawSquare(this.head.x, this.head.y, this.size, this.head.color);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x, this.body[i].y, this.size, this.body[i].color);
        };
        NetworkSnake.prototype.getJSON = function () {
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
        return NetworkSnake;
    }(BattleSnake.GameObject));
    BattleSnake.NetworkSnake = NetworkSnake;
    var SnakePart = (function () {
        function SnakePart(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
        return SnakePart;
    }());
})(BattleSnake || (BattleSnake = {}));
