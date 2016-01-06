var BattleSnake;
(function (BattleSnake) {
    var Rendering = (function () {
        function Rendering() {
        }
        Rendering.prototype.init = function (game) {
            this.game = game;
            this.graphics = this.game.add.graphics(0, 0);
            this.game.window = this.graphics;
        };
        Rendering.prototype.clear = function () {
            this.graphics.clear();
        };
        Rendering.prototype.drawSquare = function (x, y, size, color) {
            this.graphics.beginFill(color);
            this.graphics.drawRect(x, y, size, size);
            this.graphics.endFill();
        };
        return Rendering;
    }());
    BattleSnake.Rendering = Rendering;
})(BattleSnake || (BattleSnake = {}));
