var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.stage.backgroundColor = 0xF2F2F2;
            this.uiDiv = document.getElementById("ui");
            this.uiDiv.innerHTML += '<input id="nick" name="nick" type="text" placeholder="Nickname..." />';
            this.tbNick = document.getElementById("nick");
            this.tbNick.style.height = "30px";
            this.tbNick.style.width = "150px";
            this.tbNick.style.fontSize = "1.25em";
            this.tbNick.style.position = "absolute";
            this.tbNick.style.top = String((window.innerHeight / 2) - (30 / 2)) + "px";
            this.tbNick.style.left = String((window.innerWidth / 2) - (150 / 2)) + "px";
            this.uiDiv.innerHTML += '<button id="btnPlay" type="button">Play!</button>';
            this.btnPlay = document.getElementById("btnPlay");
            this.btnPlay.style.height = "30px";
            this.btnPlay.style.width = "150px";
            this.btnPlay.style.fontSize = "1.25em";
            this.btnPlay.style.position = "absolute";
            this.btnPlay.style.top = String((window.innerHeight / 2) - (30 / 2) + 40) + "px";
            this.btnPlay.style.left = String((window.innerWidth / 2) - (150 / 2)) + "px";
            var myself = this;
            this.btnPlay.onclick = function () {
                myself.game.state.start('Play');
                myself.uiDiv.style.display = "none";
            };
        };
        return MainMenu;
    }(Phaser.State));
    BattleSnake.MainMenu = MainMenu;
})(BattleSnake || (BattleSnake = {}));
