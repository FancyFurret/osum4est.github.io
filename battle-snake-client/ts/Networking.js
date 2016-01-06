var BattleSnake;
(function (BattleSnake) {
    var Networking = (function () {
        function Networking() {
            this.url = "localhost";
            this.port = "8000";
        }
        Networking.getInstance = function () {
            return Networking._instance;
        };
        Networking.prototype.connect = function () {
            this.socket = io.connect("https://multiplayertest-8bitforest.rhcloud.com");
            var myself = this;
            this.socket.on('opponentJoin', function (data) {
                console.log("Opponent joined! " + data['size']);
                myself.oppJoin.opponentJoin(data);
            }).on('opponentMove', function (data) {
                console.log("Opponent joined! " + data['size']);
                myself.oppJoin.opponentMove(data);
            });
        };
        Networking.prototype.move = function (json) {
            this.socket.emit('move', json);
        };
        Networking.prototype.setOpponentJoin = function (context) {
            this.oppJoin = context;
        };
        Networking.prototype.join = function (data) {
            this.socket.emit('join', data);
        };
        Networking._instance = new Networking();
        return Networking;
    }());
    BattleSnake.Networking = Networking;
})(BattleSnake || (BattleSnake = {}));
