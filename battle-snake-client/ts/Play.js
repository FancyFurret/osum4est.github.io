var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleSnake;
(function (BattleSnake) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.oppSnakes = {};
        }
        Play.prototype.create = function () {
            this.stage.backgroundColor = 0xF2F2F2;
            this.stage.disableVisibilityChange = true;
            this.rendering = new BattleSnake.Rendering();
            this.rendering.init(this.game);
            this.networking = BattleSnake.Networking.getInstance();
            this.networking.setMultiplayerCallbacks(this);
            this.gameObjects = new Array();
            var myself = this;
            this.networking.connect();
        };
        Play.prototype.startGame = function () {
            console.log("starting game");
            this.snake = new BattleSnake.ClientSnake(50, 5, 25, Number("0x" + (Math.random() * 0xFFFFFF << 0).toString(16)), 0xFF0000);
            this.registerGameObject(this.snake);
            this.gameObjects.forEach(function (go) {
                go.create();
            });
            this.makeBoard(Play.boardSize, Play.boardWidth, Play.boardHeight, 0x0000FF);
            this.networking.join(this.snake.getJSON());
        };
        Play.prototype.getGameInfo = function (json) {
            Play.boardSize = json['boardSize'];
            Play.boardWidth = json['boardWidth'];
            Play.boardHeight = json['boardHeight'];
            console.log("got game info " + json[0]);
            if (json == null) {
                console.log("game info is null");
            }
            this.startGame();
        };
        Play.prototype.oppJoined = function (json, id) {
            this.oppSnakes[id] = new BattleSnake.NetworkSnake(this.game, json);
            console.log("Snake with id: " + id + " has joined.");
            console.log("Size: " + this.oppSnakes[id].size);
        };
        Play.prototype.selfUpdate = function (json) {
            this.snake.loadJSON(json);
            this.snake.move();
        };
        Play.prototype.oppUpdate = function (json, id) {
            if (this.oppSnakes[id] != null) {
                this.oppSnakes[id].loadJSON(json);
                this.oppSnakes[id].move();
            }
        };
        Play.prototype.oppLeft = function (id) {
            delete this.oppSnakes[id];
        };
        Play.prototype.addGameObject = function (json, id) {
            this.gameObjects.push(new BattleSnake.NetworkObject(json, id));
        };
        Play.prototype.removeGameObject = function (id) {
            for (var i = 0; i < this.gameObjects.length; i++)
                if (this.gameObjects[i] instanceof BattleSnake.NetworkObject)
                    if (this.gameObjects[i].id == id)
                        delete this.gameObjects[i];
        };
        Play.prototype.update = function () {
            this.gameObjects.forEach(function (go) {
                go.update();
            });
        };
        Play.prototype.render = function () {
            var _this = this;
            this.rendering.clear();
            for (var key in this.oppSnakes) {
                this.oppSnakes[key].render(this.rendering);
            }
            this.gameObjects.forEach(function (go) {
                go.render(_this.rendering);
            });
        };
        Play.prototype.makeBoard = function (tileSize, width, height, color) {
            for (var i = 0; i < width; i++) {
                this.registerGameObject(new BattleSnake.ObjectWall(tileSize, color, i * tileSize, 0));
                this.registerGameObject(new BattleSnake.ObjectWall(tileSize, color, i * tileSize, (height - 1) * tileSize));
            }
            for (var i = 0; i < height; i++) {
                this.registerGameObject(new BattleSnake.ObjectWall(tileSize, color, 0, i * tileSize));
                this.registerGameObject(new BattleSnake.ObjectWall(tileSize, color, (width - 1) * tileSize, i * tileSize));
            }
        };
        Play.prototype.registerGameObject = function (gameObject) {
            this.gameObjects.push(gameObject);
        };
        return Play;
    }(Phaser.State));
    BattleSnake.Play = Play;
})(BattleSnake || (BattleSnake = {}));
