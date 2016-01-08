var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this.game.time.events.loop(speed, this.move, this);
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
        ClientSnake.prototype.move = function () {
            _super.prototype.move.call(this);
            BattleSnake.Networking.getInstance().update(this.getDirectionJSON());
        };
        return ClientSnake;
    }(BattleSnake.Snake));
    BattleSnake.ClientSnake = ClientSnake;
})(BattleSnake || (BattleSnake = {}));
