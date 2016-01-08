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
            this.loadJSON(json);
            _super.call(this, game, this.speed);
        }
        NetworkSnake.prototype.loadJSON = function (json) {
            if (json['direction'] != null)
                this.direction = json['direction'];
            if (json['speed'] != null)
                this.speed = json['speed'];
            if (json['size'] != null)
                this.size = json['size'];
            if (json['head'] != null)
                this.head = new BattleSnake.SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            if (json['body'] != null) {
                this.body = new Array();
                for (var i = 0; i < json['body'].length; i++) {
                    this.body.push(new BattleSnake.SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']));
                }
            }
        };
        return NetworkSnake;
    }(BattleSnake.Snake));
    BattleSnake.NetworkSnake = NetworkSnake;
})(BattleSnake || (BattleSnake = {}));
