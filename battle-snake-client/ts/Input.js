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
    }());
    BattleSnake.Input = Input;
})(BattleSnake || (BattleSnake = {}));
