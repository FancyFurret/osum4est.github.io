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
            this.preloadBar = this.add.sprite(200, 400, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');
            BattleSnake.Input.init(this.game);
            BattleSnake.Networking.getInstance().connect();
        };
        Preloader.prototype.create = function () {
            var myself = this;
            BattleSnake.Networking.getInstance().socket.on('connect', function () {
                console.log("connected");
                myself.game.state.start('MainMenu', true, false);
            });
        };
        return Preloader;
    }(Phaser.State));
    BattleSnake.Preloader = Preloader;
})(BattleSnake || (BattleSnake = {}));
