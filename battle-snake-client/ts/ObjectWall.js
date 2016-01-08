var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var ObjectWall = (function (_super) {
        __extends(ObjectWall, _super);
        function ObjectWall() {
            _super.apply(this, arguments);
        }
        return ObjectWall;
    }(BattleSnake.BasicGameObject));
    BattleSnake.ObjectWall = ObjectWall;
})(BattleSnake || (BattleSnake = {}));
