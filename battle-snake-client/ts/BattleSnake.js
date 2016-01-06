var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake_1) {
    var BattleSnake = (function (_super) {
        __extends(BattleSnake, _super);
        function BattleSnake() {
            _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
            this.state.add('Boot', BattleSnake_1.Boot, false);
            this.state.add('Preloader', BattleSnake_1.Preloader, false);
            this.state.add('MainMenu', BattleSnake_1.MainMenu, false);
            this.state.add('Play', BattleSnake_1.Play, false);
            this.state.start('Boot');
        }
        return BattleSnake;
    }(Phaser.Game));
    BattleSnake_1.BattleSnake = BattleSnake;
})(BattleSnake || (BattleSnake = {}));
