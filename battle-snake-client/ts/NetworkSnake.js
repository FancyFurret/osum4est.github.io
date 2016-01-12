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
        return NetworkSnake;
    }(BattleSnake.Snake));
    BattleSnake.NetworkSnake = NetworkSnake;
})(BattleSnake || (BattleSnake = {}));
