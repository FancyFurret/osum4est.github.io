window.onload = function () {
    var game = new BattleSnake.BattleSnake();
};
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
    })(Phaser.Game);
    BattleSnake_1.BattleSnake = BattleSnake;
})(BattleSnake || (BattleSnake = {}));
var BattleSnake;
(function (BattleSnake) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/load.png');
        };
        Boot.prototype.create = function () {
            this.stage.backgroundColor = 0xF2F2F2;
            this.game.state.start('Preloader', true, false);
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.refresh();
        };
        return Boot;
    })(Phaser.State);
    BattleSnake.Boot = Boot;
})(BattleSnake || (BattleSnake = {}));
var BattleSnake;
(function (BattleSnake) {
    var GameObject = (function () {
        function GameObject(game) {
            this.game = game;
        }
        GameObject.prototype.create = function () { };
        ;
        GameObject.prototype.update = function () { };
        ;
        GameObject.prototype.render = function (rendering) { };
        ;
        return GameObject;
    })();
    BattleSnake.GameObject = GameObject;
})(BattleSnake || (BattleSnake = {}));
var BattleSnake;
(function (BattleSnake) {
    (function (Direction) {
        Direction[Direction["NONE"] = 0] = "NONE";
        Direction[Direction["LEFT"] = 1] = "LEFT";
        Direction[Direction["RIGHT"] = 2] = "RIGHT";
        Direction[Direction["UP"] = 3] = "UP";
        Direction[Direction["DOWN"] = 4] = "DOWN";
    })(BattleSnake.Direction || (BattleSnake.Direction = {}));
    var Direction = BattleSnake.Direction;
    var Snake = (function (_super) {
        __extends(Snake, _super);
        function Snake(game, speed) {
            _super.call(this, game);
            this.changedDirection = true;
            this.game.time.events.loop(speed, this.move, this);
        }
        Snake.prototype.changeDirection = function (direction) {
            if (!this.changedDirection && this.isDirectionValid(direction, this.direction) && (this.queuedDirection == null || this.queuedDirection == Direction.NONE)) {
                this.queuedDirection = direction;
                return;
            }
            else if (!this.changedDirection || !this.isDirectionValid(direction, this.direction))
                return;
            this.direction = direction;
            this.changedDirection = false;
            BattleSnake.Networking.getInstance().update(this.getJSON());
        };
        Snake.prototype.isDirectionValid = function (direction1, direction2) {
            if (direction1 == Direction.UP && direction2 == Direction.DOWN ||
                direction1 == Direction.DOWN && direction2 == Direction.UP ||
                direction1 == Direction.LEFT && direction2 == Direction.RIGHT ||
                direction1 == Direction.RIGHT && direction2 == Direction.LEFT)
                return false;
            return true;
        };
        Snake.prototype.render = function (rendering) {
            rendering.drawSquare(this.head.x, this.head.y, this.size, this.head.color);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x, this.body[i].y, this.size, this.body[i].color);
        };
        Snake.prototype.move = function () {
            var moveX = 0;
            var moveY = 0;
            if (this.queuedDirection != null && this.queuedDirection != Direction.NONE && this.changedDirection) {
                this.direction = this.queuedDirection;
                this.queuedDirection = Direction.NONE;
            }
            switch (this.direction) {
                case Direction.LEFT:
                    moveX = -1;
                    break;
                case Direction.RIGHT:
                    moveX = 1;
                    break;
                case Direction.UP:
                    moveY = -1;
                    break;
                case Direction.DOWN:
                    moveY = 1;
                    break;
            }
            for (var i = 0; i < this.body.length - 1; i++) {
                this.body[i].x = this.body[i + 1].x;
                this.body[i].y = this.body[i + 1].y;
            }
            this.body[this.body.length - 1].x = this.head.x;
            this.body[this.body.length - 1].y = this.head.y;
            this.head.x += moveX * this.size;
            this.head.y += moveY * this.size;
            this.changedDirection = true;
        };
        Snake.prototype.getJSON = function () {
            var json = {
                speed: this.speed,
                size: this.size,
                direction: this.direction,
                head: {
                    x: this.head.x,
                    y: this.head.y,
                    color: this.head.color
                }
            };
            json['body'] = [];
            for (var i = 0; i < this.body.length; i++) {
                json['body'][i] = {};
                json['body'][i]['x'] = this.body[i].x;
                json['body'][i]['y'] = this.body[i].y;
                json['body'][i]['color'] = this.body[i].color;
            }
            ;
            return json;
        };
        return Snake;
    })(BattleSnake.GameObject);
    BattleSnake.Snake = Snake;
    var SnakePart = (function () {
        function SnakePart(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
        return SnakePart;
    })();
    BattleSnake.SnakePart = SnakePart;
})(BattleSnake || (BattleSnake = {}));
var BattleSnake;
(function (BattleSnake) {
    var ClientSnake = (function (_super) {
        __extends(ClientSnake, _super);
        function ClientSnake(game, speed, initLength, size, bodyColor, headColor) {
            _super.call(this, game, speed);
            this.changedDirection = true;
            this.direction = BattleSnake.Direction.RIGHT;
            this.speed = speed;
            this.size = size;
            this.head = new BattleSnake.SnakePart(5 * size, 5 * size, headColor);
            this.body = new Array();
            for (var i = initLength; i >= 1; i--)
                this.body.push(new BattleSnake.SnakePart(this.head.x - size * i, this.head.y, bodyColor));
            BattleSnake.Input.registerInput(Phaser.Keyboard.UP, this);
            BattleSnake.Input.registerInput(Phaser.Keyboard.DOWN, this);
            BattleSnake.Input.registerInput(Phaser.Keyboard.LEFT, this);
            BattleSnake.Input.registerInput(Phaser.Keyboard.RIGHT, this);
        }
        ClientSnake.prototype.recieveInput = function (key) {
            switch (key) {
                case Phaser.Keyboard.UP:
                    this.changeDirection(BattleSnake.Direction.UP);
                    break;
                case Phaser.Keyboard.DOWN:
                    this.changeDirection(BattleSnake.Direction.DOWN);
                    break;
                case Phaser.Keyboard.LEFT:
                    this.changeDirection(BattleSnake.Direction.LEFT);
                    break;
                case Phaser.Keyboard.RIGHT:
                    this.changeDirection(BattleSnake.Direction.RIGHT);
                    break;
            }
        };
        return ClientSnake;
    })(BattleSnake.Snake);
    BattleSnake.ClientSnake = ClientSnake;
})(BattleSnake || (BattleSnake = {}));
var BattleSnake;
(function (BattleSnake) {
    var Input = (function () {
        function Input() {
        }
        Input.init = function (game) {
            this.game = game;
        };
        Input.registerInput = function (key, context) {
            this.game.input.keyboard.addKey(key).onDown.add(function () { context.recieveInput(key); });
        };
        return Input;
    })();
    BattleSnake.Input = Input;
})(BattleSnake || (BattleSnake = {}));
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
    })(Phaser.State);
    BattleSnake.MainMenu = MainMenu;
})(BattleSnake || (BattleSnake = {}));
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
            console.log("Connected to: " + this.socket.io.uri);
            var myself = this;
            this.socket.on('oppJoined', function (data, id) {
                console.log("Opponent joined! " + data['size']);
                myself.callbacks.oppJoined(data, id);
            }).on('getOpps', function (data) {
                myself.callbacks.getOpps(data);
            }).on('oppUpdate', function (data, id) {
                myself.callbacks.oppUpdate(data, id);
            }).on('oppLeft', function (id) {
                myself.callbacks.oppLeft(id);
            });
        };
        Networking.prototype.update = function (json) {
            this.socket.emit('update', json);
        };
        Networking.prototype.join = function (data) {
            this.socket.emit('joined', data);
        };
        Networking.prototype.setMultiplayerCallbacks = function (callbacks) {
            this.callbacks = callbacks;
        };
        Networking._instance = new Networking();
        return Networking;
    })();
    BattleSnake.Networking = Networking;
})(BattleSnake || (BattleSnake = {}));
var BattleSnake;
(function (BattleSnake) {
    var NetworkSnake = (function (_super) {
        __extends(NetworkSnake, _super);
        function NetworkSnake(game, json) {
            this.loadJSON(json);
            _super.call(this, game, this.speed);
        }
        NetworkSnake.prototype.loadJSON = function (json) {
            this.direction = json['direction'];
            this.speed = json['speed'];
            this.size = json['size'];
            this.head = new BattleSnake.SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            this.body = new Array();
            for (var i = 0; i < json['body'].length; i++) {
                this.body.push(new BattleSnake.SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']));
            }
        };
        return NetworkSnake;
    })(BattleSnake.Snake);
    BattleSnake.NetworkSnake = NetworkSnake;
})(BattleSnake || (BattleSnake = {}));
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
            this.startGame();
        };
        Play.prototype.startGame = function () {
            this.snake = new BattleSnake.ClientSnake(this.game, 50, 5, 25, Number("0x" + (Math.random() * 0xFFFFFF << 0).toString(16)), 0xFF0000);
            this.gameObjects = new Array();
            this.gameObjects.push(this.snake);
            this.gameObjects.forEach(function (go) {
                go.create();
            });
            this.networking.join(this.snake.getJSON());
        };
        Play.prototype.oppJoined = function (json, id) {
            this.oppSnakes[id] = new BattleSnake.NetworkSnake(this.game, json);
            console.log("Snake with id: " + id + " has joined.");
            console.log("Size: " + this.oppSnakes[id].size);
        };
        Play.prototype.getOpps = function (json) {
        };
        Play.prototype.oppUpdate = function (json, id) {
            this.oppSnakes[id].loadJSON(json);
        };
        Play.prototype.oppLeft = function (id) {
            delete this.oppSnakes[id];
        };
        Play.prototype.update = function () {
            this.gameObjects.forEach(function (go) {
                go.update();
            });
        };
        Play.prototype.render = function () {
            var _this = this;
            this.rendering.clear();
            this.gameObjects.forEach(function (go) {
                go.render(_this.rendering);
            });
            for (var key in this.oppSnakes) {
                this.oppSnakes[key].render(this.rendering);
            }
        };
        return Play;
    })(Phaser.State);
    BattleSnake.Play = Play;
})(BattleSnake || (BattleSnake = {}));
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
    })(Phaser.State);
    BattleSnake.Preloader = Preloader;
})(BattleSnake || (BattleSnake = {}));
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
    })();
    BattleSnake.Rendering = Rendering;
})(BattleSnake || (BattleSnake = {}));
