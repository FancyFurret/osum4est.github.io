var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            this.stage.backgroundColor = 0xF2F2F2;
            this.game.state.start('Preloader', true, false);
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.refresh();
        };
        return Boot;
    }(Phaser.State));
    BattleSnake.Boot = Boot;
})(BattleSnake || (BattleSnake = {}));
