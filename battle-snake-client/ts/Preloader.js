var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.stage.backgroundColor = 0xF2F2F2;
            BattleSnake.Input.init(this.game);
        };
        Preloader.prototype.create = function () {
            var myself = this;
            myself.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    BattleSnake.Preloader = Preloader;
})(BattleSnake || (BattleSnake = {}));
