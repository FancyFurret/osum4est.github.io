var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var BasicGameObject = (function (_super) {
        __extends(BasicGameObject, _super);
        function BasicGameObject(game, size, color, x, y) {
            _super.call(this, game);
            this.size = size;
            this.color = color;
            this.x = x;
            this.y = y;
        }
        BasicGameObject.prototype.render = function (rendering) {
            rendering.drawSquare(this.x, this.y, this.size, this.color);
        };
        return BasicGameObject;
    }(BattleSnake.GameObject));
    BattleSnake.BasicGameObject = BasicGameObject;
})(BattleSnake || (BattleSnake = {}));
