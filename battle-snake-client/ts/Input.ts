module BattleSnake {
    export class Input {

        static game: Phaser.Game;

        static init(game: Phaser.Game) {
            this.game = game;
        }

        static registerInput(key: number, context: any) {
            this.game.input.keyboard.addKey(key).onDown.add(function() { context.recieveInput(key) });
        }
    }
}
