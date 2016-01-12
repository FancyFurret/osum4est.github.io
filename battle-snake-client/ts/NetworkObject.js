var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var NetworkObject = (function (_super) {
        __extends(NetworkObject, _super);
        function NetworkObject(json, id) {
            _super.call(this, json['size'], json['color'], json['x'], json['y']);
            this.id = id;
        }
        NetworkObject.prototype.loadJSON = function (json) {
            this.size = json['size'];
            this.color = json['color'];
            this.x = json['x'];
            this.y = json['y'];
        };
        NetworkObject.prototype.getJSON = function () {
            return {
                size: this.size,
                color: this.size,
                x: this.x,
                y: this.y
            };
        };
        return NetworkObject;
    }(BattleSnake.BasicGameObject));
    BattleSnake.NetworkObject = NetworkObject;
})(BattleSnake || (BattleSnake = {}));
