module BattleSnake {
    export abstract class GameObject {

        game: Phaser.Game;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        create() {};
        update() {};
        render(rendering: Rendering) {};
    }
}
